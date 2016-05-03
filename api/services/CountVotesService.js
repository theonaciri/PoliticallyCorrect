/**
 * Created by naciri_t on 5/2/16.
 */
var PythonShell = require('python-shell');
/*
 var _ = require('underscore-min.js');
 */

module.exports = {

    countVotes: function(options) {
        var _ = sails._;
        var i = 0;
        var choices = [];
        while (options[i]) {
            choices.push(options[i].choices);
            i++;
        }
        var summed_array = [];

        choices.forEach(function (vote) {
            var ret;
            if (_.isEmpty(summed_array))
                summed_array.push({"count":1, "ballot": vote});
            else {
                ret = false;
                summed_array.forEach(function(summed) {
                    if (!ret) {
                        if (_.isEqual(vote, summed.ballot)) {
                            summed.count++;
                            ret = true;
                        }
                    }
                });
                if (!ret)
                    summed_array.push({"count":1, "ballot": vote});
            }
        });
        console.log('summed array : \n', summed_array);

        /*        _.each(arr2, function(arr2obj) {
         var arr1obj = _.find(arr1, function(arr1obj) {
         return arr1obj[prop] === arr2obj[prop];
         })});
         */
        var options = {
            pythonPath: '/usr/bin/python2.7',
            scriptPath: '/home/naciri_t/Projects/PoliticallyCorrect/api/services',
            args: choices
        };

        /*        PythonShell.run('test_stv.py', options, function (err) {
         if (err) throw err;
         console.log('finished');
         });*/
        return choices;
    }
};

/*        fs.exists('/home/naciri_t/Projects/PoliticallyCorrect/api/services/test_stv.py', (exists) => {
 console.log(exists ? 'it\'s there' : 'no passwd!');
 })*/
