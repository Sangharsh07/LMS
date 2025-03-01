import jwt from "jsonwebtoken"

export const generateToken = (req, res, user, message) => {
    const token = jwt.sign({userId : user._id}, process.env.JWT_SECRET, {expiresIn: "1d"})

    return res
        .status(200)
        .cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000 // 24 hours 
        })
        .json({
            success: true,  
            message: message,
            user
        });
};