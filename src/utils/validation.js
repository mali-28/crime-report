import * as yup from 'yup';

export const fNameSchema = yup.object().shape({
    firstName: yup.string()
        .required("First Name is required"),


});

export const lNameSchema = yup.object().shape({

    lastName: yup.string()
        .required("Last Name is required"),



});

<<<<<<< HEAD
export const emailSchema = yup.object().shape({

    email: yup.string()
        .required("Email is required")
        .email("Required a valid email address")



});

export const cnicSchema = yup.object().shape({

    cnic: yup.string()
        .required("cnic is required")
        .matches(/^\d{5}-\d{7}-\d{1}$/, {
            message:'Cnic number must follow the xxxxx-xxxxxxx-x format',
            excludeEmptyString: true
        })

});

=======
>>>>>>> main

export const passwordSchema = yup.object().shape({

    password: yup.string()
        .required("Password is required")
        .min(6, "Password is too short - should be 6 chars minimum"),


});

<<<<<<< HEAD
export const desSchema = yup.object().shape({

    description: yup.string()
        .required("Description is required")
        .min(30, "Description is too short - should be 30 chars minimum"),


});

export const phoneSchema = yup.object().shape({

    phone: yup.string()
        .required("Phone Number is required")
        .min(3, "Description is too short - should be 3 chars minimum"),


});
=======
>>>>>>> main

