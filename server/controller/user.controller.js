import { ApiError } from "../utills/ApiError";
import { ApiResponse } from "../utills/ApiResponse";
import bcrypt from "bcrypt";
import { generateToken } from "../utills/generateTokens";
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (name || email || password) {
            throw new ApiError(400, "All fields are required");
        }
        const user = await User.findOne({ email });
        if (user) {
            throw new ApiError(400, "Email already exists");
        }
        const hashPassword = await bcrypt.hash(password, 10);
        await User.create({
            name,
            email,
            password: hashPassword,
        });
        throw new ApiError(201, "User created successfully");
    } catch (error) {
        throw new ApiError(500, "Account creation failed");
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new ApiError(400, "All fields are required");
        }
        const user = await User.findOne({ email });
        if (!user) {
            throw new ApiError(400, "Invalid credentials");
        }
        const isPasswordMatch = await bcrypt.compare(password, user.apssword);
        if (!isPasswordMatch) {
            throw new ApiError(400, "Invalid credentials");
        }
        generateToken(res, user, `Welcome back ${user.name}`);
        return ApiResponse(200, "User logged in successfully");
    } catch (error) {
        console.log(error);
        return ApiResponse(500, "Failed to login");
    }
};
