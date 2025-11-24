// Controller that returns dashboard statistics for the current user
import { Request, Response } from 'express';
import { AppDataSource } from '../../configs/connectDb.config';
import { Issue, IssueStatus } from '../../entities/Issue.entity';

interface AuthRequest extends Request {
    userId?: string;
}

const getStats = async (req: AuthRequest, res: Response): Promise<void> => {
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

        // Get total issues count
        const totalIssues = await issueRepository.count({
            where: { issueOwner: userId }
        });

        // Get count by status
        const pendingCount = await issueRepository.count({
            where: { 
                issueOwner: userId,
                status: IssueStatus.PENDING
            }
        });

        const inProgressCount = await issueRepository.count({
            where: { 
                issueOwner: userId,
                status: IssueStatus.IN_PROGRESS
            }
        });

        const completedCount = await issueRepository.count({
            where: { 
                issueOwner: userId,
                status: IssueStatus.COMPLETED
            }
        });

        // Get 5 most recent issues
        const recentIssues = await issueRepository.find({
            where: { issueOwner: userId },
            order: { created_at: 'DESC' },
            take: 5
        });

        res.status(200).json({
            success: true,
            message: 'Dashboard stats retrieved successfully',
            data: {
                totalIssues,
                pending: pendingCount,
                inProgress: inProgressCount,
                completed: completedCount,
                recentIssues
            }
        });
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

module.exports = getStats;

