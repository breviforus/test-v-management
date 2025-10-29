const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');

router.get('/', requestController.getAllRequests);
router.get('/user/:userId', requestController.getUserRequests);
router.post('/', requestController.createRequest);
router.put('/:id', requestController.updateRequestStatus);

module.exports = router;