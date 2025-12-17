import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { ErrorResponse } from '../types/responses';

export class AppError extends Error {
    constructor(
        public statusCode: number,
        message: string
    ) {
        super(message);
        this.name = 'AppError';
    }
}

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            error: err.message,
        } as ErrorResponse);
    }

    if (err instanceof ZodError) {
        return res.status(400).json({
            error: 'Validation error',
            details: err.issues,
        } as ErrorResponse);
    }

    if ('code' in err && (err as { code: string }).code === 'P2025') {
        return res.status(404).json({
            error: 'Task not found',
        } as ErrorResponse);
    }

    console.error('Unexpected error:', err);
    res.status(500).json({
        error: 'Internal server error',
    } as ErrorResponse);
};

export const asyncHandler = (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
