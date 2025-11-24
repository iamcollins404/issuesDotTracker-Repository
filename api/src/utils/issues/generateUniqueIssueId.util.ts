import { AppDataSource } from '../../configs/connectDb.config';
import { Issue } from '../../entities/Issue.entity';

const generateUniqueIssueId = async (): Promise<string> => {
    try {
        const issueRepository = AppDataSource.getRepository(Issue);

        // Get all tasks
        const issues = await issueRepository.find({
            order: { created_at: 'DESC' }
        });

        if (!issues || issues.length === 0) {
            // If no tasks exist, start with tasq1001
            return 'issue1001';
        }

        // Find the highest taskId number
        let maxNumber = 1000; // Start from 1000 so first task will be 1001
        for (const issue of issues) {
            if (issue.issueId) {
                const issueIdNumber = parseInt(issue.issueId.replace('issue', ''), 10);
                if (!isNaN(issueIdNumber) && issueIdNumber > maxNumber) {
                    maxNumber = issueIdNumber;
                }
            }
        }

        // Increment and generate new taskId
        const newIssueIdNumber = maxNumber + 1;
        return `issue${newIssueIdNumber}`;
    } catch (error) {
        console.error('Error generating unique issue ID:', error);
        // Fallback: return a timestamp-based ID if there's an error
        return `tasq${Date.now()}`;
    }
};

module.exports = generateUniqueIssueId;

