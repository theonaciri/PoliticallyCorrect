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
                pythonPath: '/usr/bin/python2.7',
                scriptPath: '/home/naciri_t/Projects/PoliticallyCorrect/api/services',
                args: jsontruc
            };

            var pyshell = new PythonShell('test_stv.py', options);

// sends a message to the Python script via stdin
            //pyshell.send(jsontruc);

            pyshell.on('message', function (message) {
                // received a message sent from the Python script (a simple "print" statement)
                console.log(message);
            });

// end the input stream and allow the process to exit
            pyshell.end(function (err) {
                if (err) throw err;
                console.log('finished');
            });

            return choices;
        }

        return ;
    }
};