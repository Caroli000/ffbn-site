const { Router } = require('express');
const StatsController = require('../controllers/StatsController');

const router = Router();
const controller = new StatsController();

router.get('/', controller.getAll);

module.exports = router;
