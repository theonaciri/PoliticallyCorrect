# Copyright (C) 2009, Brad Beattie
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.

from pyvotecore.stv import STV
import sys

class TestSTV():

    # STV, example from Wikipedia
    # http://en.wikipedia.org/wiki/Single_transferable_vote#An_example
    def test_stv_wiki_example(self):
        print 'Number of arguments:', len(sys.argv), 'arguments.'
        print 'Argument List:', str(sys.argv)
        # Generate data
        input = [
            {"count": 4, "ballot": ["orange"]},
            {"count": 2, "ballot": ["pear", "orange"]},
            {"count": 8, "ballot": ["chocolate", "strawberry"]},
            {"count": 4, "ballot": ["chocolate", "sweets"]},
            {"count": 1, "ballot": ["strawberry"]},
            {"count": 1, "ballot": ["sweets"]}
        ]
        # output = STV(input, required_winners=3).as_dict()

        # Run tests
        # self.assertEqual(output, {
        #     'candidates': set(['orange', 'pear', 'chocolate', 'strawberry', 'sweets']),
        #     'quota': 6,
        #     'rounds': [
        #         {'tallies': {'orange': 4.0, 'strawberry': 1.0, 'pear': 2.0, 'sweets': 1.0, 'chocolate': 12.0}, 'winners': set(['chocolate'])},
        #         {'tallies': {'orange': 4.0, 'strawberry': 5.0, 'pear': 2.0, 'sweets': 3.0}, 'loser': 'pear'},
        #         {'tallies': {'orange': 6.0, 'strawberry': 5.0, 'sweets': 3.0}, 'winners': set(['orange'])},
        #         {'tallies': {'strawberry': 5.0, 'sweets': 3.0}, 'loser': 'sweets'}
        #     ],
        #     'remaining_candidates': set(['strawberry']),
        #     'winners': set(['orange', 'strawberry', 'chocolate'])
        # })

stv_count = TestSTV()
stv_count.test_stv_wiki_example()
