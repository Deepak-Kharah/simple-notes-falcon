import { useEffect } from "react";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import configureAxios from "../modules/common/config/axios.config";
import { reduxWrapper } from "../modules/redux/store";
import { connect, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import AuthGuard from "../modules/auth/components/AuthGuard.component";
import { isUserLoggedin } from "../modules/auth/redux/auth.action";
import { compose } from "redux";

declare interface ISimpleTodoOwnProps extends AppProps {
    Component: AppProps["Component"] & { isProtected?: boolean };
}

declare interface ISimpleTodoDispatchProps {
    isUserLoggedin: () => void;
}

declare type ISimpleTodoProps = ISimpleTodoOwnProps & ISimpleTodoDispatchProps;

function SimpleTodo({ Component, pageProps, ...props }: ISimpleTodoProps) {
    const dispatch = useDispatch();
    const router = useRouter();
    const { isUserLoggedin } = props;
    const { isProtected = false } = Component;

    // configurations
    useEffect(() => {
        configureAxios(dispatch, router);

        isUserLoggedin();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ChakraProvider>
            <AuthGuard isProtected={isProtected}>
                <Component {...pageProps} />
            </AuthGuard>
        </ChakraProvider>
    );
}

const mapDispatchToProps = {
    isUserLoggedin,
};

const enhance = compose(
    reduxWrapper.withRedux,
    connect(null, mapDispatchToProps)
);

export default enhance(SimpleTodo);
