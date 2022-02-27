import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
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
import { theme } from "../modules/common/config/theme";
import UiAlertHOC from "../modules/ui-message/components/UiAlertHOC.components";

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
            <ChakraProvider theme={theme}>
                <AuthGuard isProtected={isProtected}>
                    <UiAlertHOC>
                        <Hydrate state={pageProps.dehydratedState}>
                            <Head>
                                <title>
                                    Simply Note • A project by Deepak Kharah
                                </title>
                                <link
                                    rel="apple-touch-icon"
                                    sizes="180x180"
                                    href="/apple-touch-icon.png"
                                />
                                <link
                                    rel="icon"
                                    type="image/png"
                                    sizes="32x32"
                                    href="/favicon-32x32.png"
                                />
                                <link
                                    rel="icon"
                                    type="image/png"
                                    sizes="16x16"
                                    href="/favicon-16x16.png"
                                />
                                <link rel="manifest" href="/site.webmanifest" />
                                <link
                                    rel="mask-icon"
                                    href="/safari-pinned-tab.svg"
                                    color="#373943"
                                />
                                <meta
                                    name="msapplication-TileColor"
                                    content="#373943"
                                />
                                <meta name="theme-color" content="#ffffff" />
                            </Head>
                            <Component {...pageProps} />
                        </Hydrate>
                    </UiAlertHOC>
                </AuthGuard>
            </ChakraProvider>
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
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
