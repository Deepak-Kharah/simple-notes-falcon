import { cx } from "@emotion/css";
import React from "react";
import EmptyIcon from "../media/Empty-amico.svg";
import styles from "./EmptyState.module.css";

declare interface IEmptyStateOwnProps {
    className?: string;
    style?: React.CSSProperties;
    iconStyle?: React.CSSProperties;
    iconClassName?: string;
    contentStyle?: React.CSSProperties;
    contentClassName?: string;
    Icon?: JSX.Element;
    heading: string;
    description?: string;
}
declare type IEmptyStateProps = IEmptyStateOwnProps;

function EmptyState(props: IEmptyStateProps): JSX.Element {
    const {
        className,
        contentClassName,
        contentStyle = {},
        iconClassName,
        iconStyle = {},
        style = {},
        Icon = EmptyIcon,
        heading,
        description,
    } = props;
    return (
        <div
            className={cx(styles["empty-state-container"], className)}
            style={style}
        >
            <div
                className={cx(styles["empty-state-icon"], iconClassName)}
                style={iconStyle}
            >
                <Icon />
            </div>
            <section
                className={cx(styles["empty-state-content"], contentClassName)}
                style={contentStyle}
            >
                <h3>{heading}</h3>
                {description && <p>{description}</p>}
            </section>
        </div>
    );
}

export default EmptyState;
