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
            sails.log('Displaying %d poll:', _polls.length, _polls);
                return res.view('poll_display_single', {module: 'Poll', polls: _polls});
        });
    },

    find: function (req, res) {
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
        Poll.findOne({
                id:req.params['id']
            })
            .exec(function (err, poll){
                if (err) {
                    return res.negotiate(err);
                }
                if (!poll) {
                    return res.notFound('Could not find your poll, sorry.');
                }
                return res.view('poll_display_single', {module: 'Poll', poll:poll})
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
            max_date: req.param('maxDate')
        }, function pollCreated(err, newPoll) {
            if (err) {
                console.log("err: ", err);
                console.log("err.invalidAttributes: ", err.invalidAttributes)
                // Otherwise, send back something reasonable as our error response.
                return res.negotiate(err);
            }
            Candidate.create(req.param('candidate')).exec(function createCB(err, created){
                if (err) {
                    console.log("err: ", err);
                    console.log("err.invalidAttributes: ", err.invalidAttributes)
                    // Otherwise, send back something reasonable as our error response.
                    return res.negotiate(err);
                }

            // Send back the id of the new user
            return res.json({
                id: newPoll.id
            });
        });
    })
}}

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