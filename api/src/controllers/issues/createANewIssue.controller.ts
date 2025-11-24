// Controller that creates a fresh issue for the signed-in user
import { Request, Response } from 'express';
import { AppDataSource } from '../../configs/connectDb.config';
import { Issue, IssueStatus } from '../../entities/Issue.entity';

const generateUniqueIssueId = require('../../utils/issues/generateUniqueIssueId.util');

interface AuthRequest extends Request {
    userId?: string;
}

const createANewIssue = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { title, description, status } = req.body;
        const userId = req.userId;

        if (!userId) {
            res.status(401).json({
                success: false,
                message: 'User authentication required'
            });
            return;
        }

        // Validate required fields
        if (!title) {
            res.status(400).json({
                success: false,
                message: 'Title is required'
            });
            return;
        }

        // Validate status if provided
        if (status && !Object.values(IssueStatus).includes(status)) {
            res.status(400).json({
                success: false,
                message: `Status must be one of: ${Object.values(IssueStatus).join(', ')}`
            });
            return;
        }

        // Generate a unique issueId so every issue can be tracked
        const issueId = await generateUniqueIssueId();

        // Get the issue repository to talk to the database
        const issueRepository = AppDataSource.getRepository(Issue);

        // Create a new issue record with either provided values or defaults
        const newIssue = issueRepository.create({
            issueId,
            issueOwner: userId,
            title,
            description: description || null,
            status: status || IssueStatus.PENDING
        });

        // Save the issue to the database
        const savedIssue = await issueRepository.save(newIssue);

        res.status(201).json({
            success: true,
            message: 'Issue created successfully',
            data: savedIssue
        });
    } catch (error) {
        console.error('Error creating issue:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

module.exports = createANewIssue;
