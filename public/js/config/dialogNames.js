const utils = require('../utils');
let dialogNames = ['FINANCES', 'ITINERARY', 'NOTES', 'NONE'];
dialogNames = utils.keywords(dialogNames);

module.exports = dialogNames;
