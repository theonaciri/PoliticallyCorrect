from pyvotecore.stv import STV
import sys
import json

class SetEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, set):
            return list(obj)
        return json.JSONEncoder.default(self, obj)

class TestSTV():

    # STV, example from Wikipedia
    # http://en.wikipedia.org/wiki/Single_transferable_vote#An_example
    def test_stv_wiki_example(self):
        # Generate data
        votes = json.loads(sys.argv[1])
        input = votes
        output = STV(input, required_winners=int(sys.argv[2])).as_dict()
 
        print json.dumps(output, cls=SetEncoder)
        sys.stdout.flush()
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
