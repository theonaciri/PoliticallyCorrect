/**
 * Created by naciri_t on 5/2/16.
 */
var PythonShell = require('python-shell');
var fs = require('fs');

var path = require('path');

module.exports = {

    countVotes: function(options) {
        /*        sails.log(options);*/
        var i = 0;
        var choices = [];
        while (options[i]) {
            choices.push(options[i].choices);
            i++;
        }
        sails.log(choices);
        fs.stat('foo.txt', function(err, stat) {
            if(err == null) {
                sails.log('File exists');
            } else if(err.code == 'ENOENT') {
                fs.writeFile('log.txt', 'Some log\n');
            } else {
                sails.log('Some other error: ', err.code);
            }
        });
/*        fs.exists('/home/naciri_t/Projects/PoliticallyCorrect/api/services/test_stv.py', (exists) => {
            console.log(exists ? 'it\'s there' : 'no passwd!');
    })*/
        PythonShell.run('echo_args.py', {scriptPath: '/home/naciri_t/Projects/PoliticallyCorrect/node_modules/python-shell/test/python/', pythonPath: '/usr/bin/python2.7'} , function (err) {
            if (err) throw err;
            console.log('finished');
        });
        return choices;
    }
};