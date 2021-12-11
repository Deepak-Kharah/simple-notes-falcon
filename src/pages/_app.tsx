import { useEffect } from "react";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import configureAxios from "../modules/common/config/axios.config";
import { reduxWrapper } from "../modules/redux/store";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
    const dispatch = useDispatch();
    const router = useRouter();

    // configurations
    useEffect(() => {
        configureAxios(dispatch, router);
    }, []);

    return (
        <ChakraProvider>
            <Component {...pageProps} />
        </ChakraProvider>
    );
}

export default reduxWrapper.withRedux(MyApp);
