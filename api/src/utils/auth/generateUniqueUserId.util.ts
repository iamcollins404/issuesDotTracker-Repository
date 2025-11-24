import { AppDataSource } from '../../configs/connectDb.config';
import { User } from '../../entities/User.entity';

const generateUniqueUserId = async (): Promise<string> => {
    try {
        const userRepository = AppDataSource.getRepository(User);

        // Get all users
        const users = await userRepository.find({
            order: { created_at: 'DESC' }
        });

        if (!users || users.length === 0) {
            // If no users exist, start with user1001
            return 'user1001';
        }

        // Find the highest userId number
        let maxNumber = 1000; // Start from 1000 so first user will be 1001
        for (const user of users) {
            if (user.userId) {
                const userIdNumber = parseInt(user.userId.replace('user', ''), 10);
                if (!isNaN(userIdNumber) && userIdNumber > maxNumber) {
                    maxNumber = userIdNumber;
                }
            }
        }

        // Increment and generate new userId
        const newUserIdNumber = maxNumber + 1;
        return `user${newUserIdNumber}`;
    } catch (error) {
        console.error('Error generating unique user ID:', error);
        // Fallback: return a timestamp-based ID if there's an error
        return `user${Date.now()}`;
    }
};

module.exports = generateUniqueUserId;

