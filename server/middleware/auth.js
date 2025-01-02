import jwt from "jsonwebtoken";
import config from "config";

const jwt_secret = config.get("JWT_SECRET")

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"]
    console.log(authHeader);

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, jwt_secret)
        // req.user = decoded
        next()
    } catch (error) {
        console.error("Invalid token:", error);
    return res.status(401).json({ msg: "Invalid token" });
    }
}

export default authMiddleware