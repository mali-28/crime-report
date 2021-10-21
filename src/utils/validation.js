import * as yup from 'yup';

export const fNameSchema = yup.object().shape({
    firstName: yup.string()
        .required("Firstname is required"),


});

export const lNameSchema = yup.object().shape({

    lastName: yup.string()
        .required("Lastname is required"),



});


export const passwordSchema = yup.object().shape({

    password: yup.string()
        .required("Password is required")
        .min(6, "Password is too short - should be 6 chars minimum"),


});


