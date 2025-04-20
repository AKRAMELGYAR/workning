import express from 'express';
import * as doctorController from '../controller/doctorController.js';
import upload from '../../utils/uploadMiddleware.js';

const router = express.Router();

router.route('/register_doctor')
  .post(doctorController.registerDoctorController);

router.route('/login_doctor')
  .post(doctorController.loginDoctorController);

router.route('/upload-cv')
  .post(upload.single('cv'), doctorController.uploadDoctorCVController);

router.route('/filter').get(doctorController.FilterDoctors)
.post(doctorController.loginDoctorController);

router.route('/update_doctor_profile/:id')
  .patch(doctorController.updateDoctorProfileController);

router.route('/upload-cv/:id')
 .patch(upload.single('cvPath'), doctorController.uploadDoctorCVController);

 export default router;
