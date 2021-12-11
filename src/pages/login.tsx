import { useState } from "react";
import axios from "axios";
import { Formik } from "formik";
import { connect } from "react-redux";
import { compose } from "redux";
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";

import { loginUser } from "../redux/actions/auth.action";
import { LoginDto } from "../types/auth/auth.dto";
import React from "react";
import { State } from "../redux/store";

declare interface ILoginOwnProps {
    username: string;
}

declare interface ILoginStoreProps {
    isAuthLoading: boolean;
}

declare interface ILoginDispatchProps {
    loginUser: (props: LoginDto) => void;
}

export declare type ILoginProps = ILoginOwnProps &
    ILoginDispatchProps &
    ILoginStoreProps;

function Login(props: ILoginProps) {
    const { loginUser } = props;

    const [showPassword, setShowPassword] = useState(false);
    function handleShowPassword() {
        setShowPassword((prevProps) => !prevProps);
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
                    loginUser(values);
                }}
            >
                {({ handleSubmit, handleChange, values }) => (
                    <form onSubmit={handleSubmit}>
                        <Input
                            variant="outline"
                            type="text"
                            name="username"
                            onChange={handleChange}
                            value={values.username}
                        />
                        <InputGroup size="md">
                            <Input
                                pr="4.5rem"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter password"
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

                        <Button
                            colorScheme="teal"
                            isLoading={props.isAuthLoading}
                            loadingText={"Logging in"}
                            type="submit"
                        >
                            Log in
                        </Button>
                    </form>
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
