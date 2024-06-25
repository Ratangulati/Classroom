import express from 'express' 
import { createEvent, deleteEvent, getAllEvents } from '../controllers/eventsController.js';

const router = express.Router();

router.get('/getall', getAllEvents)
router.post('/', createEvent)
router.delete('/:id', deleteEvent);


export default router;