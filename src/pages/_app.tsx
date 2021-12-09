import { useEffect } from "react";
import type { AppProps } from "next/app";

import "../../styles/globals.css";
import configureAxios from "../configurations/axios";
import { reduxWrapper } from "../redux/store";
import { useDispatch } from "react-redux";

function MyApp({ Component, pageProps }: AppProps) {
    const dispatch = useDispatch();
    
    // configurations
    useEffect(() => {

        configureAxios(dispatch);
    }, []);

    return <Component {...pageProps} />;
}

export default reduxWrapper.withRedux(MyApp);
