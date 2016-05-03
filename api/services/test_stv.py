from pyvotecore.stv import STV
import sys
import json

class TestSTV():

    # STV, example from Wikipedia
    # http://en.wikipedia.org/wiki/Single_transferable_vote#An_example
    def test_stv_wiki_example(self):
        # print sys.argv[1]
        votes = json.loads(sys.argv[1])
        # Generate data
        print str(votes)
        input = votes
        # input = [
        #     {"count": 4, "ballot": ["orange"]},
        #     {"count": 2, "ballot": ["pear", "orange"]},
        #     {"count": 8, "ballot": ["chocolate", "strawberry"]},
        #     {"count": 4, "ballot": ["chocolate", "sweets"]},
        #     {"count": 1, "ballot": ["strawberry"]},
        #     {"count": 1, "ballot": ["sweets"]}
        # ]
        output = STV(input, required_winners=3).as_dict()
        print output
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


        # if one candidate Error: TypeError: 'int' object is not iterable
stv_count = TestSTV()
stv_count.test_stv_wiki_example()
