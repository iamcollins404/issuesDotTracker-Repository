// Controller that registers a brand new user account
import { Request, Response } from 'express';
import { AppDataSource } from '../../configs/connectDb.config';
import { User } from '../../entities/User.entity';
import bcrypt from 'bcryptjs';

const generateUniqueUserId = require('../../utils/auth/generateUniqueUserId.util');

const signup = async (req: Request, res: Response): Promise<void> => {
    try {
        const { fullname, email, password } = req.body;

        // Validate required fields
        if (!fullname || !email || !password) {
            res.status(400).json({
                success: false,
                message: 'Fullname, email, and password are required'
            });
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            res.status(400).json({
                success: false,
                message: 'Invalid email format'
            });
            return;
        }

        // Validate password length
        if (password.length < 6) {
            res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters long'
            });
            return;
        }

        // Get the user repository
        const userRepository = AppDataSource.getRepository(User);

        // Check if user with this email already exists
        const existingUser = await userRepository.findOne({
            where: { email }
        });

        if (existingUser) {
            res.status(409).json({
                success: false,
                message: 'User with this email already exists'
            });
            return;
        }

        // Generate unique userId
        const userId = await generateUniqueUserId();

        // Hash the password before saving it so it never lives in plain text
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user
        const newUser = userRepository.create({
            userId,
            fullname,
            email,
            password: hashedPassword
        });

        // Save the user to the database
        const savedUser = await userRepository.save(newUser);

        // Remove password from response before returning user data
        const { password: _, ...userWithoutPassword } = savedUser;

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: userWithoutPassword
        });
        
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

module.exports = signup;

