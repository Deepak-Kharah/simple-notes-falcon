import React, { useEffect } from "react";
import { WarningTwoIcon } from "@chakra-ui/icons";

import AuthLoadingSpinner from "./AuthLoadingSpinner.component";
import styles from "./AuthLoader.module.css";

const WAITING_TIME_IN_MS = 20000;

function AuthLoader() {
    const [state, setState] = React.useState({
        isStuckForlongTime: false,
    });

    useEffect(() => {
        const timeout = setTimeout(() => {
            setState({
                isStuckForlongTime: true,
            });
        }, WAITING_TIME_IN_MS);

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    if (state.isStuckForlongTime) {
        return (
            <section className={styles["loader-container"]}>
                <WarningTwoIcon w={20} h={20} color="gray.300" />
                <div className={styles["loader-stuck-message"]}>
                    <h1>
                        It seems you are having trouble loading the page. Please
                        try again later.
                    </h1>
                    <p>
                        If the problem still persists, please contact me. I'd
                        love to fix it for you.
                    </p>
                </div>
            </section>
        );
    } else {
        return (
            <section className={styles["loader-container"]}>
                <AuthLoadingSpinner />
                <h1>Please hold on while we setup some stuff for you</h1>
            </section>
        );
    }
}

export default AuthLoader;
