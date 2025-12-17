import { Router, Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import prisma from '../prisma';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { asyncHandler, AppError } from '../middleware/errorHandler';
import {
    createTaskSchema,
    updateTaskSchema,
    taskIdSchema,
    taskQuerySchema,
    CreateTaskInput,
    UpdateTaskInput,
} from '../validators/taskValidators';
import { TaskResponse, TaskListResponse } from '../types/responses';

const router = Router();

router.post(
    '/',
    asyncHandler(async (req: Request, res: Response) => {
        const validatedData: CreateTaskInput = createTaskSchema.parse(req.body);

        const task: TaskResponse = await prisma.task.create({
            data: {
                title: validatedData.title,
                assignee: validatedData.assignee || process.env.TODO_USERNAME,
                completed: validatedData.completed ?? false,
            },
        });

        res.status(201).json(task);
    })
);

router.get(
    '/',
    asyncHandler(async (req: Request, res: Response) => {
        const validatedQuery = taskQuerySchema.parse(req.query);

        const where =
            validatedQuery.completed !== undefined
                ? { completed: validatedQuery.completed === 'true' }
                : {};

        const tasks: TaskListResponse = await prisma.task.findMany({
            where,
            orderBy: { createdAt: 'desc' },
        });

        res.json(tasks);
    })
);

router.put(
    '/:id',
    asyncHandler(async (req: Request, res: Response) => {
        const { id } = taskIdSchema.parse(req.params);
        const validatedData: UpdateTaskInput = updateTaskSchema.parse(req.body);

        const taskId = parseInt(id, 10);

        const updateData: Prisma.TaskUpdateInput = { updatedAt: new Date() };
        if (validatedData.title !== undefined) updateData.title = validatedData.title;
        if (validatedData.assignee !== undefined) updateData.assignee = validatedData.assignee;
        if (validatedData.completed !== undefined) updateData.completed = validatedData.completed;

        const task: TaskResponse = await prisma.task.update({
            where: { id: taskId },
            data: updateData,
        });

        res.json(task);
    })
);

router.patch(
    '/:id/complete',
    asyncHandler(async (req: Request, res: Response) => {
        const { id } = taskIdSchema.parse(req.params);
        const taskId = parseInt(id, 10);

        const task: TaskResponse = await prisma.task.update({
            where: { id: taskId },
            data: {
                completed: true,
                updatedAt: new Date(),
            },
        });

        res.json(task);
    })
);

router.patch(
    '/:id/undo',
    asyncHandler(async (req: Request, res: Response) => {
        const { id } = taskIdSchema.parse(req.params);
        const taskId = parseInt(id, 10);

        const task: TaskResponse = await prisma.task.update({
            where: { id: taskId },
            data: {
                completed: false,
                updatedAt: new Date(),
            },
        });

        res.json(task);
    })
);

router.delete(
    '/:id',
    asyncHandler(async (req: Request, res: Response) => {
        const { id } = taskIdSchema.parse(req.params);
        const taskId = parseInt(id, 10);

        await prisma.task.delete({
            where: { id: taskId },
        });

        res.status(204).send();
    })
);

export default router;
