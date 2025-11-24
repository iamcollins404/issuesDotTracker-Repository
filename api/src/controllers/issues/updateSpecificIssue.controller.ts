// Controller that updates selected fields on a single issue
import { Request, Response } from 'express';
import { AppDataSource } from '../../configs/connectDb.config';
import { Issue, IssueStatus } from '../../entities/Issue.entity';

interface AuthRequest extends Request {
    userId?: string;
}

const updateSpecificIssue = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { issueId } = req.params;
        const { title, description, status } = req.body;
        const userId = req.userId;

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

        if (!title && description === undefined && !status) {
            res.status(400).json({
                success: false,
                message: 'At least one field (title, description, or status) must be provided for update'
            });
            return;
        }

        if (status && !Object.values(IssueStatus).includes(status)) {
            res.status(400).json({
                success: false,
                message: `Status must be one of: ${Object.values(IssueStatus).join(', ')}`
            });
            return;
        }

        // Look up the issue that belongs to this user
        const issueRepository = AppDataSource.getRepository(Issue);
        const issue = await issueRepository.findOne({
            where: { issueId, issueOwner: userId }
        });

        if (!issue) {
            res.status(404).json({
                success: false,
                message: `Issue with ID ${issueId} not found or you don't have permission to update it`
            });
            return;
        }

        if (title !== undefined) {
            issue.title = title;
        }
        if (description !== undefined) {
            issue.description = description || null;
        }
        if (status !== undefined) {
            issue.status = status;
        }

        // Persist the updated issue
        const updatedIssue = await issueRepository.save(issue);

        res.status(200).json({
            success: true,
            message: `Issue with ID ${issueId} updated successfully`,
            data: updatedIssue
        });
    } catch (error) {
        console.error('Error updating issue:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

module.exports = updateSpecificIssue;
