import express from 'express'
const router = express.Router();
import * as adminController from '../controller/admincontroller'

router.route('/approveDoctor')
            .post(adminController.approveDoctor)

router.route('/rejectDoctor')
            .post(adminController.rejectDoctor)

router.route('/deleteDoctor/:doctorId')
            .delete(adminController.deleteDoctor)

router.route('/doctorCv/:doctorId')
            .get(adminController.getDoctorCV)

export default router