import express from 'express';
import * as doctorController from '../controller/doctorController.js';
const router = express.Router()
import upload from '../../utils/uploadMiddleware.js';
//import authenticate from '../../utils/authMiddleware.js';


router.route('/register_doctor')
  .post(doctorController.registerDoctorController);

router.route('/login_doctor')
  .post(doctorController.loginDoctorController);

/*router.route('/update_doctor_profile')
  .put(authenticate, doctorController.updateDoctorProfileController);

router.route('/upload-cv')
 .post(authenticate, upload.single('cv'), doctorController.uploadDoctorCVController);
*/
 export default router;
