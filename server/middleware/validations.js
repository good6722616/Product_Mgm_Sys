import { body, validationResult, check } from "express-validator";

export const errorHandler = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors
        .array()
        .map(({ msg }) => msg)
        .join(", "),
    });
  }
};

export const userValidation = [
  check("email").isEmail().withMessage("Email Format is Invalid"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];
