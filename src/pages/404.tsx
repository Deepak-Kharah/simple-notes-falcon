import Link from "next/link";
import { Fragment } from "react";
import styles from "../../styles/404.module.css";
import SimplyNotesLogo from "../modules/common/components/Logo";

function Error404() {
    return (
        <Fragment>
            <div
                className={styles["error-container"]}
                style={{
                    display: "flex",
                    width: "100vw",
                    height: "100vh",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "2rem",
                }}
            >
                <SimplyNotesLogo width={80} height={80} />
                <div className={styles["separator"]}></div>
                <div>
                    <h1>Well… It seems you came to a dead-end.</h1>
                    <p>
                        Let&apos;s go back to your{" "}
                        <Link href={"/notes"}>notes</Link>.
                    </p>
                </div>
                <p className={styles["glitch"]} title="404">
                    404
                </p>
            </div>
        </Fragment>
    );
}

export default Error404;
