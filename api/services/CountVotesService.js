/**
 * Created by naciri_t on 5/2/16.
 */

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
        return choices;
    }
}; 