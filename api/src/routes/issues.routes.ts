import express from 'express';
const router = express.Router();

// the routes we will create and import from controllers
// 1. get all issues
router.get('/', require('../controllers/issues/getAllIssues.controller'));

// 2. create a new issue
router.post('/', require('../controllers/issues/createANewIssue.controller'));

// 3. get a single issue
router.get('/view/:id', require('../controllers/issues/viewSpecificIssue.controller'));

// 4. update an issue
router.put('/update/:id', require('../controllers/issues/updateSpecificIssue.controller'));

// 5. delete an issue
router.delete('/delete/:id', require('../controllers/issues/deleteSpecificIssue.controller'));

module.exports = router;