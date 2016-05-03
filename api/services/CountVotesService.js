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
        var choices = [];
        var summed_array = [];

        // put all the votes in one array
        options.forEach(function(op) {
            choices.push(op.choices);
        });

        // aggregate the votes
        choices.forEach(function (vote) {
            var ret;
            if (_.isEmpty(summed_array))
                summed_array.push({"count":1, "ballot": vote});
            else {
                ret = false;
                summed_array.forEach(function(summed) {
                    if (!ret)
                        if (_.isEqual(vote, summed.ballot)) {
                            summed.count++;
                            ret = true;
                        }
                });
                if (!ret)
                    summed_array.push({"count":1, "ballot": vote});
            }
        });
        jsontruc = JSON.stringify(summed_array);
        sails.log(jsontruc);
        var options = {
            pythonPath: '/usr/bin/python2.7',
            scriptPath: '/home/naciri_t/Projects/PoliticallyCorrect/api/services',
            args: jsontruc
        };

        PythonShell.run('test_stv.py', options, function (err) {
            if (err) throw err;
            console.log('finished');
        });


        return choices;
    }
};