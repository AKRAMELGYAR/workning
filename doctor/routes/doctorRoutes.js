import express from 'express';
import * as doctorController from '../controller/doctorController.js';
import upload from '../../utils/uploadMiddleware.js';
<<<<<<< HEAD
import CatchAsync from '../../utils/CatchAsync.js';
=======
// import authenticate from '../../utils/authMiddleware.js';
>>>>>>> 2f7ad7be4138663179978ed92ac15f4bd3f8e5f8

const router = express.Router();

router.route('/register_doctor')
  .post(CatchAsync(doctorController.registerDoctorController));

router.route('/login_doctor')
<<<<<<< HEAD
  .post(CatchAsync(doctorController.loginDoctorController));

router.route('/upload-cv')
  .post(upload.single('cv'), CatchAsync(doctorController.uploadDoctorCVController));

router.route('/filter').get(CatchAsync(doctorController.FilterDoctors))

export default router;
=======
  .post(doctorController.loginDoctorController);

router.route('/update_doctor_profile/:id')
  .patch(doctorController.updateDoctorProfileController);

router.route('/upload-cv/:id')
 .patch(upload.single('cvPath'), doctorController.uploadDoctorCVController);

 export default router;
>>>>>>> 2f7ad7be4138663179978ed92ac15f4bd3f8e5f8
