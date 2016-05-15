/**
 * PageController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    displayAll: function(req, res) {
        res.locals.scripts = [
            '/js/public/poll/PollModule.js',
            '/js/public/poll/PollController.js',
            '/js/tinycolor.js',
            '/js/dist/mdColorPicker.min.js'
        ];

        res.locals.css = [
            '/styles/dist/mdColorPicker.min.css',
            '/styles/importer.css',
            '/styles/mainapp.css'
        ];


        Poll.find({limit: 10, sort: 'min_date DESC'})
            .exec(function (err, _polls){
                if (err) {
                    return res.negotiate(err);
                }
                return res.view('poll_display_single', {module: 'Poll', polls: _polls});
            });
    },

    find: function (req, res) {
        res.locals.scripts = [
            '/js/dist/dragular.min.js',
            '/js/public/graph/GraphModule.js',
            '/js/public/graph/GraphController.js',
            '/js/tinycolor.js',
            '/js/dist/mdColorPicker.min.js',
            '/js/d3.js',
            '/js/dependencies/bullets.js',
            '/js/underscore.js',
            '/js/angular-underscore-module.js'
        ];

        res.locals.css = [
            '/styles/dist/mdColorPicker.min.css',
            '/styles/importer.css',
            '/styles/mainapp.css',
            '/styles/graph.css',
            '/styles/dist/dragular.min.css'
        ];

        Poll.findOne({
            id:req.params['id']
        })
            .exec(function (err, poll){
                if (err)
                    return res.negotiate(err);
                if (!poll)
                    return res.notFound('Could not find your poll, sorry.');
                Candidate.find({
                    poll_id:req.params['id']
                })
                    .exec(function (err, _candidates) {
                        if (err)
                            return res.negotiate(err);
                        if (!_candidates)
                            return res.notFound('Could not find your candidates, sorry.');
                        var callingFunction = function(_votes) {
                            CountVotesService.countVotes(_votes, poll.req_winners, function(err, result) {
                                if (!err)
                                    return res.view('poll_display_single', {module: 'Graph', votes:JSON.stringify(result), poll:poll, sum_votes:_votes.length, candidates:JSON.stringify(_candidates)});
                                else {
                                    sails.log("error here :", err);
                                    return res.view('poll_display_single', {module: 'Graph', votes:null, poll:poll, sum_votes:0, candidates:JSON.stringify(_candidates)});
                                }})
                        };
                        Vote.find({
                            poll_id:req.params['id']
                        })
                            .exec(function(err, _votes) {
                                if (err) {
                                    sails.log("Error : ", err);
                                    return res.negotiate(err);
                                }
                                callingFunction(_votes);
                            })
                    });
            });
    },

    showNewPoll: function (req, res) {
        res.locals.scripts = [
            '/js/public/poll/PollModule.js',
            '/js/public/poll/PollController.js',
            '/js/tinycolor.js',
            '/js/dist/mdColorPicker.min.js'
        ];

        res.locals.css = [
            '/styles/dist/mdColorPicker.min.css',
            '/styles/importer.css',
            '/styles/mainapp.css'
        ];
        return res.view('shownewpoll', {
            module: 'Poll'
        });
    },

    create: function (req, res) {
        sails.log(req.param('minDate') + ' ' + req.param('maxDate'));
        Poll.create({
            title: req.param('name'),
            desc: req.param('desc'),
            min_date: req.param('minDate'),
            max_date: req.param('maxDate'),
            req_winners: req.param('req_winners')
        }, function pollCreated(err, newPoll) {
            if (err) {
                sails.log("err: ", err);
                sails.log("err.invalidAttributes: ", err.invalidAttributes)
                // Otherwise, send back something reasonable as our error response.
                return res.negotiate(err);
            }
            for (var i_can = 0, len = req.param('candidates').length; i_can < len; i_can++) {
                req.param('candidates')[i_can].poll_id = newPoll.id;
            }
            Candidate.create(req.param('candidates')).exec(function createCB(err, created){
                if (err) {
                    sails.log("err: ", err);
                    sails.log("err.invalidAttributes: ", err.invalidAttributes)
                    // Otherwise, send back something reasonable as our error response.
                    return res.negotiate(err);
                }

                // Send back the id of the new user
                return res.json({
                    id: newPoll.id
                });
            });
        })
    },
    vote: function (req, res) {
        sails.log('voting for ' + req.param('poll') + 'votes : ' + req.param('vote'));
        Vote.create({
            choices: req.param('vote'),
            poll_id: req.param('poll')
        }, function voteCreate(err, newVote) {
            if (err) {
                sails.log("err: ", err);
                sails.log("err.invalidAttributes: ", err.invalidAttributes)
                // Otherwise, send back something reasonable as our error response.
                return res.negotiate(err);
            }
            sails.log('vote created !')
            Vote.find({limit: 10, sort: 'min_date DESC'})
                .exec(function (err, _votes){
                    if (err) {
                        return res.negotiate(err);
                    }
                    sails.log('Displaying %d poll:', _votes.length, _votes);
                    return res.ok();
                });
        })
    }

}

//  unused below

// Otherwise, look up the logged-in user and show the logged-in view,
// bootstrapping basic user data in the HTML sent from the server
//   User.findOne(req.session.me, function (err, user){
//     if (err) {
//       return res.negotiate(err);
//     }

//     if (!user) {
//       sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
//       //return res.view('homepage');
//     }

//     return res.view('dashboard', {
//       me: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         title: user.title,
//         isAdmin: !!user.admin,
//         gravatarUrl: user.gravatarUrl
//       }
//     });

//   });