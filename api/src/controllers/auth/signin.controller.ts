// Controller that signs in an existing user and returns a JWT token
import { Request, Response } from 'express';
import { AppDataSource } from '../../configs/connectDb.config';
import { User } from '../../entities/User.entity';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const signin = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
            return;
        }

        // Get the user repository
        const userRepository = AppDataSource.getRepository(User);

        // Find user by email
        const user = await userRepository.findOne({
            where: { email }
        });

        if (!user) {
            res.status(401).json({
                success: false,
                message: 'Invalid email. No user found with this email'
            });
            return;
        }

        // Compare password with hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            res.status(401).json({
                success: false,
                message: 'Password is incorrect. Please try again.'
            });
            return;
        }

        // Generate JWT token so the client can stay authenticated
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error('JWT_SECRET is not configured');
        }

        const token = jwt.sign(
            {
                userId: user.userId,
                email: user.email
            },
            jwtSecret,
            {
                expiresIn: '7d' // Token expires in 7 days
            }
        );

        // Remove password from response before sending it back
        const { password: _, ...userWithoutPassword } = user;

        res.status(200).json({
            success: true,
            message: 'Sign in successful',
            data: {
                user: userWithoutPassword,
                authtoken: token
            }
        });
    } catch (error) {
        console.error('Error signing in:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

module.exports = signin;

