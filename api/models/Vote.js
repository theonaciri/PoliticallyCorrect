/**
 * Created by naciri_t on 5/2/16.
 */

module.exports = {

    attributes: {
        choices: {
            type: 'json',
            required: true
        },
        user_id: {
            model: 'User'
        },
        poll: {
            model: 'Poll'
        },
        poll_id: {
            type: 'int'
        }
    }
};

