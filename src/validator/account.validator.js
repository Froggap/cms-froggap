import { body } from 'express-validator';

const accountValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  body('lastname').notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Email must be valid'),
  body('status').isIn(['doxeado', 'no doxeado']).withMessage('Invalid status'),
  body('riskLevel').isIn(['alto', 'medio', 'bajo']).withMessage('Invalid risk level'),
  body('dni').isNumeric().withMessage('DNI must be a string of digits'),
  body('phone').optional().matches(/^\+?\d{10,15}$/).withMessage('Phone number must be valid'),
  body('profileImage').optional().custom(value => value === null || typeof value === 'string').withMessage('Profile image must be null or a string'),
];

export default accountValidator;