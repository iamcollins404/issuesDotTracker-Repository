import { Request, Response } from 'express';
import { AppDataSource } from '../../configs/connectDb.config';
import { Issue } from '../../entities/Issue.entity';

interface AuthRequest extends Request {
    userId?: string;
}

const deleteSpecificIssue = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { issueId } = req.params;
        const userId = req.userId;

        // Validate issueId parameter
        if (!issueId) {
            res.status(400).json({
                success: false,
                message: 'Issue ID is required'
            });
            return;
        }

        if (!userId) {
            res.status(401).json({
                success: false,
                message: 'User authentication required'
            });
            return;
        }

        // Get the issue repository
        const issueRepository = AppDataSource.getRepository(Issue);

        // Find the issue by issueId and issueOwner (user can only delete their own issues)
        const issue = await issueRepository.findOne({
            where: { issueId, issueOwner: userId }
        });

        if (!issue) {
            res.status(404).json({
                success: false,
                message: `Issue with ID ${issueId} not found or you don't have permission to delete it`
            });
            return;
        }

        // Delete the issue
        await issueRepository.remove(issue);

        res.status(200).json({
            success: true,
            message: `Issue with ID ${issueId} deleted successfully`,
            data: {
                issueId: issue.issueId,
                title: issue.title
            }
        });
    } catch (error) {
        console.error('Error deleting issue:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

module.exports = deleteSpecificIssue;

