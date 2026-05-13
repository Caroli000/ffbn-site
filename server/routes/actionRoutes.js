const { Router } = require('express');
const ActionController = require('../controllers/ActionController');

const router = Router();
const controller = new ActionController();

router.get('/', controller.getAll);

module.exports = router;
