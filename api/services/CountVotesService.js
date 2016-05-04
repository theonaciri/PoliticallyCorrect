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
        // Oranges : 28
        // Pear : 29
        // Chocolate : 30
        // Strawberry : 31
        // put all the votes in one array
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
            jsontruc = JSON.stringify(summed_array);
            sails.log('\n\n', jsontruc, '\n\n');
            var options = {
                mode: 'json',
                pythonPath: '/usr/bin/python2.7',
                scriptPath: '/home/naciri_t/Projects/PoliticallyCorrect/api/services',
                pythonOptions: ['-u'],
                args: jsontruc
            };
            var res;
            PythonShell.run('test_stv.py', options, function (err, results) {
                if (err)
                    callback(new Error('error text'));
                // results is an array consisting of messages collected during execution
                sails.log('results: %j', results);
                res = results;
                callback(null, results);
            });
            return res;
        }
    }
};