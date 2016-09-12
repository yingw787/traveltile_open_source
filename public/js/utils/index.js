const _ = require('lodash');

const utils = {
    keywords(keywordNames) {
        return _.zipObject(keywordNames, keywordNames);
    },
    assert(testableCondition, errorMessage) {
        if(!testableCondition){
            throw new Error(errorMessage);
        }
    },
};

module.exports = utils;
