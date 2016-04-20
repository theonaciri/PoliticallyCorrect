/**
 * PageController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    showHomePage: function (req, res) {

        // If not logged in, show the public view.
        if (!req.session.me) {
            return res.view('poll');
        }
        return res.view('poll');

    },

    newPoll: function (req, res) {
        User.create({
            name: req.param('name'),
            title: req.param('title'),
            email: req.param('email'),
            encryptedPassword: encryptedPassword,
            lastLoggedIn: new Date(),
            gravatarUrl: gravatarUrl
        }, function userCreated(err, newUser) {
            if (err) {

                console.log("err: ", err);
                console.log("err.invalidAttributes: ", err.invalidAttributes)

                // If this is a uniqueness error about the email attribute,
                // send back an easily parseable status code.
                if (err.invalidAttributes && err.invalidAttributes.email && err.invalidAttributes.email[0]
                    && err.invalidAttributes.email[0].rule === 'unique') {
                    return res.emailAddressInUse();
                }

                // Otherwise, send back something reasonable as our error response.
                return res.negotiate(err);
            }

            // Log user in
            req.session.me = newUser.id;

            // Send back the id of the new user
            return res.json({
                id: newUser.id
            });
        });
    }
};

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