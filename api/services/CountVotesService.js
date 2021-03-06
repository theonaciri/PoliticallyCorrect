/**
 * Created by naciri_t on 5/2/16.
 */
var Python = require('python-runner');
var PythonShell = require('python-shell');
/*
 var _ = require('underscore-min.js');
 */

module.exports = {

    countVotes: function(options, req_winners, callback) {

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
            console.log(_.isEmpty(req_winners) ? '3' : req_winners.toString());
            jsonvotes = JSON.stringify(summed_array);
            var options = {
                mode: 'json',
                pythonPath: 'c:\python27\bin\python.exe',
                scriptPath: '/home/naciri_t/Projects/PoliticallyCorrect/api/services',
                args: [jsonvotes, _.isEmpty(req_winners) ? '3' : req_winners.toString()]
            };
            PythonShell.run('test_stv.py', options, function (err, results) {
                    callback(err, results);
            });
            return ;
        }
        callback("No votes", null);
    }
};