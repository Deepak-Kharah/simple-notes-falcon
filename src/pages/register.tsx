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
import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import { registerUser } from "../redux/actions/auth.action";
import { State } from "../redux/store";
import { RegisterDto } from "../types/auth/auth.dto";
import { registrationSchema } from "../yupSchemas/auth.yup-schema";

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

const register = (props: IRegisterProps) => {
    const { registerUser } = props;

    const [showPassword, setShowPassword] = React.useState({
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
        <div>
            <h1>Reg page</h1>
            <Formik
                validateOnChange
                validateOnBlur
                initialValues={{
                    username: "",
                    password: "",
                    confirmPassword: "",
                }}
                onSubmit={(value) => {
                    console.log(value);
                }}
                validationSchema={registrationSchema}
            >
                {({ handleSubmit, handleChange, values, errors, touched }) => (
                    <Form onSubmit={handleSubmit}>
                        <Stack maxWidth={"50rem"} margin="auto" spacing="5">
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
                                colorScheme="blue"
                                type="submit"
                            >
                                Register
                            </Button>
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

export default enhance(register);
