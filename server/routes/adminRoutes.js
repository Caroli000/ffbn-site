const { Router } = require('express');
const AdminController = require('../controllers/AdminController');
const { checkAdmin } = require('../middlewares/authMiddleware');

const router = Router();
const controller = new AdminController();

router.post('/login', controller.login);
router.post('/logout', controller.logout);

router.use(checkAdmin);

router.get('/stats/list', controller.getStatsRaw);
router.post('/stats', controller.createStat);
router.put('/stats/:id', controller.updateStat);
router.delete('/stats/:id', controller.deleteStat);

router.get('/actions', controller.getActions);
router.post('/actions', controller.createAction);
router.put('/actions/:id', controller.updateAction);
router.delete('/actions/:id', controller.deleteAction);

router.get('/events', controller.getEvents);
router.post('/events', controller.createEvent);
router.put('/events/:id', controller.updateEvent);
router.delete('/events/:id', controller.deleteEvent);

router.get('/media/list', controller.getMediaList);

module.exports = router;
