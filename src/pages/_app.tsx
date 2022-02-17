import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

// redux
import { compose } from "redux";
import configureAxios from "../modules/common/config/axios.config";
import { reduxWrapper } from "../modules/redux/store";
import { connect, useDispatch } from "react-redux";

// authentication
import AuthGuard from "../modules/auth/components/AuthGuard.component";
import { isUserLoggedin } from "../modules/auth/redux/auth.action";

// react query
import { QueryClientProvider, QueryClient, Hydrate } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { useRouter } from "next/router";

declare interface ISimpleTodoOwnProps extends AppProps {
    Component: AppProps["Component"] & { isProtected?: boolean };
}

declare interface ISimpleTodoDispatchProps {
    isUserLoggedin: () => void;
}

declare type ISimpleTodoProps = ISimpleTodoOwnProps & ISimpleTodoDispatchProps;

function SimpleTodo({ Component, pageProps, ...props }: ISimpleTodoProps) {
    const [queryClient] = useState(() => new QueryClient());
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
        <QueryClientProvider client={queryClient}>
            <ChakraProvider>
                <AuthGuard isProtected={isProtected}>
                    <Hydrate state={pageProps.dehydratedState}>
                        <Component {...pageProps} />
                    </Hydrate>
                </AuthGuard>
            </ChakraProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
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
