import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // ✅ decoded must include userId
    next();
  } catch (err) {
    console.error('JWT Verification Failed:', err.message);
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

export default authMiddleware;

