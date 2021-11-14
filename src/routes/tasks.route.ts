import express from 'express';

import {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
} from '../controllers/tasks.controller';

const router = express.Router();

router.route('/').get(getAllTasks).post(createTask);
router.route('/:id').get(getTask).patch(updateTask);

export default router;
