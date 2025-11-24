import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend Request interface to include user info
interface AuthRequest extends Request {
    userId?: string;
    userEmail?: string;
}

const verifyAuthToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
    try {
        // Get token from authToken header (Express normalizes headers to lowercase)
        const token = req.headers.authtoken as string;

        if (!token) {
            res.status(401).json({
                success: false,
                message: 'authToken is required in headers'
            });
            return;
        }

        // Verify token
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            res.status(500).json({
                success: false,
                message: 'JWT_SECRET is not configured'
            });
            return;
        }

        const decoded = jwt.verify(token, jwtSecret) as { userId: string; email: string };

        // Attach user info to request object
        req.userId = decoded.userId;
        req.userEmail = decoded.email;

        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            res.status(401).json({
                success: false,
                message: 'Invalid or expired token'
            });
            return;
        }

        console.error('Error verifying token:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

module.exports = verifyAuthToken;

