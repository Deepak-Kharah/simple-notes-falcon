import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { connect } from "react-redux";
import { compose } from "redux";
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Link from "next/link";

//redux
import { loginUser } from "../modules/auth/redux/auth.action";
import { LoginDto } from "../modules/auth/types/auth.dto";
import { State } from "../modules/redux/store";
import { useAppDispatch } from "../modules/redux/hooks/redux.hooks";
import { authDispatch } from "../modules/auth/redux/auth.dispatch-type";

// components
import SimplyNotesLogo from "../modules/common/components/Logo";

import styles from "../../styles/auth-page.module.css";

declare interface ILoginOwnProps {}

declare interface ILoginStoreProps {
    isAuthLoading: boolean;
    isAuthenticated: boolean;
    redirectUrl: string;
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

declare module Login {
    export const login: typeof loginFields;
}

function Login(props: ILoginProps) {
    const { loginUser, isAuthLoading, isAuthenticated, redirectUrl } = props;

    const router = useRouter();
    const dispatch = useAppDispatch();

    const [showPassword, setShowPassword] = useState(false);
    function handleShowPassword() {
        setShowPassword((prevProps) => !prevProps);
    }

    useEffect(() => {
        if (isAuthenticated) {
            // redirect to redirect url
            router.push(redirectUrl);

            // reset redirect url
            dispatch({
                type: authDispatch.RESET_REDIRECT_URL,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    return (
        <div className={styles["container"]}>
            <header className={styles["welcome-header"]}>
                <SimplyNotesLogo width={100} height={100} />
                <h1>
                    Welcome back to{" "}
                    <strong className={styles["brand-name"]}>
                        Simply Notes
                    </strong>
                </h1>
            </header>
            <Formik
                initialValues={{
                    username: "",
                    password: "",
                }}
                onSubmit={loginUser}
            >
                {({ handleSubmit, handleChange, values }) => (
                    <Form onSubmit={handleSubmit}>
                        <Stack className={styles["auth-form"]} spacing="5">
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
                                isLoading={isAuthLoading}
                                loadingText={"Logging in"}
                                type="submit"
                            >
                                Log in
                            </Button>
                            <p>
                                Need an Account?{" "}
                                <Link href={"/register"}>Register</Link>
                            </p>
                        </Stack>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

const mapStateToProps = (state: State): ILoginStoreProps => ({
    isAuthLoading: state.auth.isLoading,
    isAuthenticated: state.auth.isAuthenticated,
    redirectUrl: state.auth.redirectUrl,
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
