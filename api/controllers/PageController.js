/**
 * PageController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    showHomePage: function (req, res) {
        // you can add as many as you like
        res.locals.scripts = [
            '/js/public/homepage/HomepageModule.js',
            '/js/public/homepage/HomepageController.js',
            '/js/tinycolor.js',
            '/js/dist/mdColorPicker.min.js'
        ];

        res.locals.css = [
            '/styles/dist/mdColorPicker.min.css',
            '/styles/importer.css',
            '/styles/mainapp.css'
        ];

        Poll.find({limit: 5, sort: 'id DESC'})
            .exec(function (err, _polls){
                if (err) {
                    return res.negotiate(err);
                }
                sails.log("polls", _polls)
                return res.view('homepage', {
                    module: 'Homepage',
                    polls: _polls,
                    me: {
                        /*               id: user.id,
                         name: user.name,
                         email: user.email,
                         title: user.title,
                         isAdmin: !!user.admin,
                         gravatarUrl: user.gravatarUrl*/
                        id: 1,
                        name: "Theo Naciri",
                        email: "theo.naciri@gmail.com",
                        title: "Genius",
                        isAdmin: true,
                        gravatarUrl: "localhost"
                    }});
            });
/*
        User.findOne(req.session.me, function (err, user){
            if (err) {
                return res.negotiate(err);
            }

            if (!user) {
                sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
                return res.view('homepage');
            }


            });*/
/*

            if (!req.session.me) {
                return res.view('homepage');
            }
*/


        /*});*/
    }

};
