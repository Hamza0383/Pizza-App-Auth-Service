import { checkSchema } from "express-validator";

export default checkSchema({
    email: {
        errorMessage: "email is required!",
        notEmpty: true,
        trim: true,
        isEmail: true,
    },
    firstName: {
        errorMessage: "firstname is required!",
        notEmpty: true,
    },
    lastName: {
        errorMessage: "firstname is required!",
        notEmpty: true,
    },
    password: {
        errorMessage: "firstname is required!",
        notEmpty: true,
    },
});
