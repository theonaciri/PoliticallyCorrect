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
//                mode: 'json',
                pythonPath: '/usr/bin/python2.7',
                scriptPath: '/home/naciri_t/Projects/PoliticallyCorrect/api/services',
                args: jsontruc
            };
            var res = 0;
            var test = 0;
            PythonShell.run('test_stv.py', options, function (err, results) {
                if (err) throw err;
                while (res == 0){
                    setTimeout(function doStuff(){}, 50);
                    res = results;
                    sails.log("inside: ", res);
                }
                test = 1;
            });
            var count = 0;
            setTimeout(function doStuff(){}, 5000);
            while (test) { count++;
                sails.log("after %d: ",count, res);}
            return res;
/*            var pyshell = new PythonShell('test_stv.py', options);

            var results;
// sends a message to the Python script via stdin
            //pyshell.send(jsontruc);
            pyshell.on('message', function (message) {
                // received a message sent from the Python script (a simple "print" statement)
                console.log(message);
                results = message;
            });
// end the input stream and allow the process to exit
            while (!result)
                wait(100);
            pyshell.end(function (err) {
                if (err) throw err;
                console.log("hey salut", results);
                console.log('finished');
                return results;
            });*/
        }
    }
};