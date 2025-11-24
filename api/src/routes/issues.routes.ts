import express from 'express';
const router = express.Router();

// verify the auth token
router.use(require('../middlewares/verifyAuthToken.middleware'));

// the routes we will create and import from controllers
// 1. get all issues
router.get('/', require('../controllers/issues/getAllIssues.controller'));

// 2. create a new issue
router.post('/create', require('../controllers/issues/createANewIssue.controller'));

// // 3. get a single issue
router.get('/view/:issueId', require('../controllers/issues/viewSpecificIssue.controller'));

// // 4. update an issue
router.put('/update/:issueId', require('../controllers/issues/updateSpecificIssue.controller'));

// // 5. delete an issue
router.delete('/delete/:issueId', require('../controllers/issues/deleteSpecificIssue.controller'));

module.exports = router;