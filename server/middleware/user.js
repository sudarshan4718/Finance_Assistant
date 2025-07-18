import jwt from "jsonwebtoken";

export const userMiddleware = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized access" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.id) {
            req.userId = decoded.id; // ✅ Set userId on req, not on req.body
            next();
        } else {
            return res.status(401).json({ success: false, message: "Not authorized. Login again." });
        }
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
};
