import { cx } from "@emotion/css";
import React from "react";
import styles from "./AuthLoadingSpinner.module.css";

function AuthLoadingSpinner() {
    return (
        <div className={cx(styles.loader, styles.loader1)}>
            <div>
                <div>
                    <div>
                        <div>
                            <div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthLoadingSpinner;
