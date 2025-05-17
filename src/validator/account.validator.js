import { body } from 'express-validator';

const accountValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  body('lastname').notEmpty().withMessage('Apellido is required'),
  body('email').isEmail().withMessage('Email must be valid'),
  body('status').isIn(['doxeado', 'no doxeado']).withMessage('Invalid status'),
  body('riskLevel').isIn(['alto', 'medio', 'bajo']).withMessage('Invalid risk level'),
  body('dni').isInt().withMessage('DNI must be an integer'),
  body('phone').optional().matches(/^\+?\d{10,15}$/).withMessage('Phone number must be valid'),
];

export default accountValidator;