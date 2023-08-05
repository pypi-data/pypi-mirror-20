# MIT License

# Copyright (c) 2016 Diogo Dutra <dutradda@gmail.com>

# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:

# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.

# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.


from myreco.engines.cores.base import EngineCoreBase
from myreco.engines.exceptions import EngineError
from abc import abstractmethod
from swaggerit.json_builder import JsonBuilder
from numpy import argpartition


class EngineCoreRecommender(EngineCoreBase):

    def get_variables(self):
        return []

    async def get_recommendations(self, session, filters, max_recos, show_details, **variables):
        rec_vector = await self._build_rec_vector(session, **variables)

        if rec_vector is not None:
            for filter_, ids in filters.items():
                await filter_.filter(session, rec_vector, ids)

            return await self._build_rec_list(session, rec_vector, max_recos, show_details)

        return []

    @abstractmethod
    async def _build_rec_vector(self, session, **variables):
        pass

    async def _build_rec_list(self, session, rec_vector, max_recos, show_details):
        best_indices = self._get_best_indices(rec_vector, max_recos)
        best_items_keys = await self._items_indices_map.get_items(best_indices, session)

        if show_details and best_items_keys:
            return await self._items_model.get(session, best_items_keys)

        else:
            items_ids = []
            for key in best_items_keys:
                item = {}
                self._items_model.set_instance_ids(item, key)
                self._set_item_values(item)
                items_ids.append(item)

            return items_ids

    def _get_best_indices(self, rec_vector, max_recos):
        if max_recos > rec_vector.size:
            max_recos = rec_vector.size

        best_indices = argpartition(-rec_vector, max_recos-1)[:max_recos]
        best_values = rec_vector[best_indices]
        return [int(i) for i, v in
            sorted(zip(best_indices, best_values), key=lambda x: x[1], reverse=True) if v > 0.0]

    def _set_item_values(self, item):
        for k in item:
            schema = self.engine['item_type']['schema']['properties'].get(k)
            if schema is None:
                raise EngineError('Invalid Item {}'.format(item))

            item[k] = JsonBuilder.build(item[k], schema)
