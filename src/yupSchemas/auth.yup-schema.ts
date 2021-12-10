import * as Yup from "yup";

export const registrationSchema = Yup.object().shape({
    username: Yup.string()
        .min(6, "Username must be at least 6 characters long")
        .required("Username is required")
        .matches(
            /^(?![_])(?!.*[_]{2})[a-zA-Z0-9_]+(?<![_])$/,
            "Username must be alphanumeric and not start or end with _"
        )
        .max(20, "Username must be less than 20 characters long"),
    password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long"),
    confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match"
    ),
});
