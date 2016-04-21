/**
 * PageController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    find: function(req, res) {
        Poll.findOne({'id': req.params['id']}, function(err, user) {
            res.view('poll');
        })
    },

    showNewPoll: function (req, res) {

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