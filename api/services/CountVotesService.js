/**
 * Created by naciri_t on 5/2/16.
 */
var Python = require('python-runner');
var PythonShell = require('python-shell');
/*
 var _ = require('underscore-min.js');
 */

module.exports = {

    countVotes: function(options, callback) {
        var _ = sails._;
        var choices = [];
        var summed_array = [];
        options.forEach(function(op) {
            if (typeof(op.choices) == "number") {
            op.choices = [op.choices];
        }
            choices.push(op.choices);
        });
        if (!_.isEmpty(choices)) {
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
                    if (!ret) {
                        if (typeof(vote) == "number") {
                            vote = [vote];
                        }
                    summed_array.push({"count":1, "ballot": vote});
                    }
                }
            });
            jsonvotes = JSON.stringify(summed_array);
            var options = {
                mode: 'json',
                pythonPath: '/usr/bin/python2.7',
                scriptPath: '/home/naciri_t/Projects/PoliticallyCorrect/api/services',
                args: [jsonvotes, '3']
            };
            PythonShell.run('test_stv.py', options, function (err, results) {
                if (err)
                    callback(new Error(err));
                callback(null, results);
            });
            return ;
        }
    }
};