import { useState } from "react";
import {
    Stack,
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    InputGroup,
    InputRightElement,
    Button,
} from "@chakra-ui/react";
import { Formik, ErrorMessage, Form } from "formik";
import { connect } from "react-redux";
import { compose } from "redux";
import Link from "next/link";

// redux
import { registerUser } from "../modules/auth/redux/auth.action";
import { State } from "../modules/redux/store";
import { RegisterDto } from "../modules/auth/types/auth.dto";

// components
import SimplyNotesLogo from "../modules/common/components/Logo";

import { registrationSchema } from "../modules/auth/yup/auth.yup-schema";

import styles from "../../styles/auth-page.module.css";

declare interface IRegisterOwnProps {}

declare interface IRegisterStoreProps {
    authLoading: boolean;
}

declare interface IRegisterDispatchProps {
    registerUser: (props: RegisterDto) => void;
}

export declare type IRegisterProps = IRegisterOwnProps &
    IRegisterDispatchProps &
    IRegisterStoreProps;

const registerationField = {
    username: "username",
    password: "password",
    confirmPassword: "confirm-password",
} as const;

const Register = (props: IRegisterProps) => {
    const { registerUser } = props;

    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false,
    });

    const handleShowPassword = (field: "password" | "confirmPassword") => {
        setShowPassword((prevProps) => {
            return {
                ...prevProps,
                [field]: !prevProps[field],
            };
        });
    };

    return (
        <div className={styles["container"]}>
            <header className={styles["welcome-header"]}>
                <SimplyNotesLogo width={100} height={100} />
                <h1>
                    Welcome to{" "}
                    <strong className={styles["brand-name"]}>
                        Simply Notes
                    </strong>
                </h1>
            </header>
            <Formik
                validateOnChange
                validateOnBlur
                initialValues={{
                    username: "",
                    password: "",
                    confirmPassword: "",
                }}
                onSubmit={registerUser}
                validationSchema={registrationSchema}
            >
                {({ handleSubmit, handleChange, values, errors, touched }) => (
                    <Form onSubmit={handleSubmit}>
                        <Stack className={styles["auth-form"]} spacing="5">
                            <FormControl
                                id={registerationField.username}
                                isInvalid={Boolean(
                                    errors.username && touched.username
                                )}
                            >
                                <FormLabel>Username</FormLabel>
                                <Input
                                    type="text"
                                    name={registerationField.username}
                                    onChange={handleChange}
                                    value={values.username}
                                />

                                <FormErrorMessage>
                                    <ErrorMessage
                                        name={registerationField.username}
                                    />
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl
                                id={registerationField.password}
                                isInvalid={Boolean(
                                    errors.password && touched.password
                                )}
                            >
                                <FormLabel>Password</FormLabel>

                                <InputGroup size="md">
                                    <Input
                                        type={
                                            showPassword.password
                                                ? "text"
                                                : "password"
                                        }
                                        name={registerationField.password}
                                        onChange={handleChange}
                                        value={values.password}
                                    />

                                    <InputRightElement width="4.5rem">
                                        <Button
                                            variant="ghost"
                                            h="1.75rem"
                                            size="sm"
                                            onClick={() =>
                                                handleShowPassword("password")
                                            }
                                            value={values.password}
                                            onChange={handleChange}
                                        >
                                            {showPassword.password
                                                ? "Hide"
                                                : "Show"}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>

                                <FormErrorMessage>
                                    <ErrorMessage
                                        name={registerationField.password}
                                    />
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl
                                id={registerationField.confirmPassword}
                                isInvalid={Boolean(
                                    errors.confirmPassword &&
                                        touched.confirmPassword
                                )}
                            >
                                <FormLabel>Confirm password</FormLabel>

                                <InputGroup size="md">
                                    <Input
                                        type={
                                            showPassword.confirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        name={
                                            registerationField.confirmPassword
                                        }
                                        onChange={handleChange}
                                        value={values.confirmPassword}
                                    />
                                    <InputRightElement width="4.5rem">
                                        <Button
                                            variant="ghost"
                                            h="1.75rem"
                                            size="sm"
                                            onClick={() =>
                                                handleShowPassword(
                                                    "confirmPassword"
                                                )
                                            }
                                            value={values.password}
                                            onChange={handleChange}
                                        >
                                            {showPassword.confirmPassword
                                                ? "Hide"
                                                : "Show"}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>

                                <FormErrorMessage>
                                    <ErrorMessage
                                        name={
                                            registerationField.confirmPassword
                                        }
                                    />
                                </FormErrorMessage>
                            </FormControl>
                            <Button
                                isLoading={props.authLoading}
                                loadingText="Registering"
                                type="submit"
                            >
                                Register
                            </Button>
                            <p>
                                Already have an account?{" "}
                                <Link href={"/login"}>Log in</Link>
                            </p>
                        </Stack>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

const mapStateToProps = (state: State) => ({
    authLoading: state.auth.isLoading,
});

const mapDispatchToProps = {
    registerUser,
};

const enhance = compose(
    connect<
        IRegisterStoreProps,
        IRegisterDispatchProps,
        IRegisterOwnProps,
        State
    >(mapStateToProps, mapDispatchToProps)
);

export default enhance(Register);
