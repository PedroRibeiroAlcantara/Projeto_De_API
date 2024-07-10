const express = require('express');
const router = express.Router();
const osController = require('../controllers/osController');

// Define the CRUD routes and associate them with the controller methods
router.get('/operating-systems', osController.getAllOS);
router.get('/operating-systems/:id', osController.getOSById);
router.post('/operating-systems', osController.createOS);
router.put('/operating-systems/:id', osController.updateOS);
router.delete('/operating-systems/:id', osController.deleteOS);

// Define additional routes for specific functionalities
router.get('/operating-systems-newest-oldest', osController.getNewestAndOldestOS);
router.get('/operating-systems-gnu-gpl', osController.listGNU_GPL_OS);
router.get('/operating-systems-year-difference', osController.getYearDifference);
router.get('/operating-systems-developers', osController.listAllDevelopers);
router.get('/operating-systems-proprietaria', osController.listProprietaria);

module.exports = router;