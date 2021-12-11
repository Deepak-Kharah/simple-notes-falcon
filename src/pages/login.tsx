import { useState } from "react";
import axios from "axios";
import { Form, Formik } from "formik";
import { connect } from "react-redux";
import { compose } from "redux";

import { loginUser } from "../modules/auth/redux/auth.action";
import { LoginDto } from "../modules/auth/types/auth.dto";
import React from "react";
import { State } from "../modules/redux/store";
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
} from "@chakra-ui/react";

declare interface ILoginOwnProps {
    username: string;
}

declare interface ILoginStoreProps {
    isAuthLoading: boolean;
    isAuthenticated: boolean;
}

declare interface ILoginDispatchProps {
    loginUser: (props: LoginDto) => void;
}

export declare type ILoginProps = ILoginOwnProps &
    ILoginDispatchProps &
    ILoginStoreProps;

const loginFields = {
    username: "username",
    password: "password",
} as const;

function Login(props: ILoginProps) {
    // const { loginUser } = props;

    const [showPassword, setShowPassword] = useState(false);
    function handleShowPassword() {
        setShowPassword((prevProps) => !prevProps);
    }

    if (props.isAuthenticated) {
    }

    return (
        <div>
            <h1>Login page</h1>
            <Formik
                initialValues={{
                    username: "",
                    password: "",
                }}
                onSubmit={(values, _) => {
                    console.log(values);
                }}
            >
                {({ handleSubmit, handleChange, values }) => (
                    <Form onSubmit={handleSubmit}>
                        <Stack maxWidth={"50rem"} margin="auto" spacing="5">
                            <FormControl id={loginFields.username}>
                                <FormLabel>Username</FormLabel>
                                <Input
                                    variant="outline"
                                    type="text"
                                    name={loginFields.username}
                                    onChange={handleChange}
                                    value={values.username}
                                />
                            </FormControl>

                            <FormControl id={loginFields.password}>
                                <FormLabel>Password</FormLabel>

                                <InputGroup size="md">
                                    <Input
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        name={loginFields.password}
                                        onChange={handleChange}
                                        value={values.password}
                                    />

                                    <InputRightElement width="4.5rem">
                                        <Button
                                            variant="ghost"
                                            h="1.75rem"
                                            size="sm"
                                            onClick={handleShowPassword}
                                            value={values.password}
                                            onChange={handleChange}
                                        >
                                            {showPassword ? "Hide" : "Show"}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>

                            <Button
                                colorScheme="teal"
                                isLoading={props.isAuthLoading}
                                loadingText={"Logging in"}
                                type="submit"
                            >
                                Log in
                            </Button>
                        </Stack>
                    </Form>
                )}
            </Formik>
            <button
                onClick={() => {
                    axios
                        .get("users/me")
                        .then((res) => console.log(res))
                        .catch((err) => console.error(err));
                }}
            >
                submit
            </button>
        </div>
    );
}

const mapStateToProps = (state: State): ILoginStoreProps => ({
    isAuthLoading: state.auth.isLoading,
    isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {
    loginUser: loginUser,
};

const enhance = compose(
    connect<ILoginStoreProps, ILoginDispatchProps, ILoginOwnProps, State>(
        mapStateToProps,
        mapDispatchToProps
    )
);

export default enhance(Login);
