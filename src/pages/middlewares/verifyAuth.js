import jwt from 'jsonwebtoken';

// Secret key used to sign and verify JWT
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Middleware function to verify JWT
export const verifyAuth = (handler) => {
  return async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const token = authHeader.split(' ')[1]; // Extract the token from 'Bearer <token>'

    try {
      // Verify the token
      const decoded = jwt.verify(token, JWT_SECRET);

      console.log(decoded.userRole);

      // Role check: only allow specific roles
      if (decoded.userRole !== "clublead" && decoded.userRole !== "admin" && decoded.userRole !== "department") {
        return res.status(403).json({ message: 'You are not authorized to access this resource' });
      }

      // Pass control to the handler (next handler)
      return handler(req, res);
    } catch (error) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
  };
};
