import * as yup from 'yup';

export const fNameSchema = yup.object().shape({
    firstName: yup.string()
        .required("First Name is required"),


});

export const lNameSchema = yup.object().shape({

    lastName: yup.string()
        .required("Last Name is required"),



});

export const emailSchema = yup.object().shape({

    email: yup.string()
        .required("Email is required")
        .email("Required a valid email address")



});


export const passwordSchema = yup.object().shape({

    password: yup.string()
        .required("Password is required")
        .min(6, "Password is too short - should be 6 chars minimum"),


});