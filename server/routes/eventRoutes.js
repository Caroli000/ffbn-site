const { Router } = require('express');
const EventController = require('../controllers/EventController');

const router = Router();
const controller = new EventController();

router.get('/', controller.getAll);

router.get('/upcoming', controller.getUpcoming);

router.get('/:id', controller.getById);

module.exports = router;
