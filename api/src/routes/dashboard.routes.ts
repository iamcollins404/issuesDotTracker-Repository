import express from 'express';
const router = express.Router();

// verify the auth token
router.use(require('../middlewares/verifyAuthToken.middleware'));

// the routes we will create and import from controllers
// 1. get dashboard stats
router.get('/stats', require('../controllers/dashboard/stats.controller'));

module.exports = router;

