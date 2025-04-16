import express from 'express';
import * as doctorController from '../controller/doctorController.js';
import upload from '../../utils/uploadMiddleware.js';
import CatchAsync from '../../utils/CatchAsync.js';

const router = express.Router();

router.route('/register_doctor')
  .post(CatchAsync(doctorController.registerDoctorController));

router.route('/login_doctor')
  .post(CatchAsync(doctorController.loginDoctorController));

router.route('/upload-cv')
  .post(upload.single('cv'), CatchAsync(doctorController.uploadDoctorCVController));

router.route('/filter').get(CatchAsync(doctorController.FilterDoctors))

export default router;
