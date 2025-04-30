import express from 'express';
const router = express.Router();
import * as specialization_Controller from './specializationController.js';
router.route('/add_specializations')
  .post(specialization_Controller.createSpecialization);

  export default router;
