import { Request, Response } from 'express';
import { AppDataSource } from '../../configs/connectDb.config';
import { Issue } from '../../entities/Issue.entity';

interface AuthRequest extends Request {
    userId?: string;
}

const getAllIssues = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.userId;

        if (!userId) {
            res.status(401).json({
                success: false,
                message: 'User authentication required'
            });
            return;
        }

        const issueRepository = AppDataSource.getRepository(Issue);
        const issues = await issueRepository.find({
            where: { issueOwner: userId },
            order: { created_at: 'DESC' }
        });

        res.status(200).json({
            success: true,
            message: 'Issues retrieved successfully',
            data: issues,
            count: issues.length
        });
    } catch (error) {
        console.error('Error fetching issues:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

module.exports = getAllIssues;
