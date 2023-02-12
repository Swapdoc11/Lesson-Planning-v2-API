import express from 'express'
import { addInformation } from '../controller/information.js'
const router = express.Router()
router.post('/addInformation',addInformation)
export default router;