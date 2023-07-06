const payload = require("../../../utility/globalFunction");

const { check, body, query, oneOf, header, validationResult } = require('express-validator');

function validation(req, res, next) {
    var errorValidation = validationResult(req);
    if (errorValidation.errors.length > 0) {
        return payload.resPayloadMessage(400, true, errorValidation.errors[0].msg, res);
    }
    next()
}

const AddFeed = [
    body('type').exists().withMessage('type required').trim(),
    (req, res, next) => {
        validation(req, res, next);
    },
    body('content').exists().withMessage('content required').trim(),
    (req, res, next) => {
        validation(req, res, next);
    }
]

const AddFeedLike = [
    body('feedID').exists().withMessage('feedID required').trim(),
    (req, res, next) => {
        validation(req, res, next);
    },
    body('type').exists().withMessage('type required').trim(),
    (req, res, next) => {
        validation(req, res, next);
    }
]

const AddFeedComment = [
    body('feedID').exists().withMessage('feedID required').trim(),
    (req, res, next) => {
        validation(req, res, next);
    },
    body('content').exists().withMessage('content required').trim(),
    (req, res, next) => {
        validation(req, res, next);
    }
]

const deleteFeedComment = [
    body('feedID').exists().withMessage('feedID required').trim(),
    (req, res, next) => {
        validation(req, res, next);
    },
    body('commentID').exists().withMessage('commentID required').trim(),
    (req, res, next) => {
        validation(req, res, next);
    }
]

const deleteFeedLike = [
    body('feedID').exists().withMessage('feedID required').trim(),
    (req, res, next) => {
        validation(req, res, next);
    }
]

const deleteFeed = [
    body('feedID').exists().withMessage('feedID required').trim(),
    (req, res, next) => {
        validation(req, res, next);
    }
]

const getOneFeed = [
    query('feedID').exists().withMessage('feedID required').trim(),
    (req, res, next) => {
        validation(req, res, next);
    }
]

const getFeed = [
    query('limit').exists().withMessage('limit required').trim(),
    (req, res, next) => {
        validation(req, res, next);
    }, query('page').exists().withMessage('page required').trim(),
    (req, res, next) => {
        validation(req, res, next);
    }
]

const getOtherFeed = [
    query('user_id').exists().withMessage('user_id required').trim(),
    (req, res, next) => {
        validation(req, res, next);
    },query('limit').exists().withMessage('limit required').trim(),
    (req, res, next) => {
        validation(req, res, next);
    }, query('page').exists().withMessage('page required').trim(),
    (req, res, next) => {
        validation(req, res, next);
    }
]

module.exports = {
    AddFeed,
    AddFeedLike,
    AddFeedComment,
    getFeed,
    getOneFeed,
    getOtherFeed,
    deleteFeed,
    deleteFeedLike,
    deleteFeedComment
}