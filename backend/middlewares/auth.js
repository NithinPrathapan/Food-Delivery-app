import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.json({ success: false, message: "Not authorized, login again" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    return res.status(403).json({ success: false, message: "Error" });
  }
};

export default authMiddleware;
