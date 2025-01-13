// src/config/jwtConfig.ts
export default {
    secret: process.env.JWT_SECRET || 'your-secret-key', // You can replace this with a strong secret or an environment variable
    expiresIn: '24h', // Set the expiration time (e.g., 1 hour)
};
