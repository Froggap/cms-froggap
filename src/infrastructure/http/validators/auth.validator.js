import { body } from "express-validator";

const authValidatorLogin = [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
]

const authValidatorRegister = [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
    body("username").notEmpty().withMessage("Name is required"),
]

export default  authValidatorLogin;