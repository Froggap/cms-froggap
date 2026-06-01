import { tokenService } from '../../external/token.service.js';

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = tokenService.verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Token verification failed:', error);
        res.status(401).json({ success: false, message: 'Token inválido o expirado' });
    }
}