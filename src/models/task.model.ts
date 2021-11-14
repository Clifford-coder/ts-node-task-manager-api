import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema<Task>({
  name: {
    type: String,
    trim: true,
    required: [true, 'Please provide name of task'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Task = mongoose.model<Task>('Task', TaskSchema);

export default Task;
