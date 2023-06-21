const { addMsg, getAllMsg } = require('../controllers/messagesController');

const messagesRoutes = require('express').Router();

messagesRoutes.post('/addMsg', addMsg);
messagesRoutes.post('/getMsgs', getAllMsg);

module.exports = { messagesRoutes };
