import Task from '../models/task.model';
import { asyncWrapper } from '../middlewares/asyncWrapper';
import { createCustomAPIError } from '../errors/customErrorFactory';
import { NextFunction, Request, Response } from 'express';

export const getAllTasks = asyncWrapper(
  async (_req: Request, res: Response) => {
    const tasks = await Task.find({});
    res.json({ tasks });
  }
);

export const createTask = asyncWrapper(
  async (req: Request<{}, {}, Task>, res: Response) => {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  }
);

export const getTask = asyncWrapper(
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const taskId = req.params.id;
    const task = await Task.findOne({ _id: taskId });
    if (!task)
      return next(
        createCustomAPIError(`No task with id ${taskId} was found`, 404)
      );

    res.status(200).json({ task });
  }
);

export const updateTask = asyncWrapper(
  async (
    req: Request<{ id: string }, {}, Task>,
    res: Response,
    next: NextFunction
  ) => {
    const taskId = req.params.id;
    const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
      runValidators: true,
      new: true,
    });
    if (!task)
      return next(
        createCustomAPIError(`No task with id ${taskId} was found`, 404)
      );
    res.status(200).json({ task });
  }
);

export const deleteTask = asyncWrapper(
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const taskId = req.params.id;
    const task = await Task.findOneAndDelete({ _id: taskId });
    if (!task)
      return next(
        createCustomAPIError(`No task with id ${taskId} was found`, 404)
      );
    res.sendStatus(200);
  }
);
