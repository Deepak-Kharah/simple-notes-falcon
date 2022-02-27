import React, { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { useRouter } from "next/router";

import { useAppDispatch } from "../../redux/hooks/redux.hooks";
import { State } from "../../redux/store";
import { authDispatch } from "../redux/auth.dispatch-type";
import AuthLoader from "./AuthLoader.component";

declare interface IAuthGuardOwnProps {
    children: React.ReactNode;
    isProtected: boolean;
}

declare interface IAuthGuardStoreProps {
    isAuthLoading: boolean;
    isAuthenticated: boolean;
    hasAuthenticatedOnce: boolean;
}

declare interface IAuthGuardDispatchProps {}

declare type IAuthGuardProps = IAuthGuardOwnProps &
    IAuthGuardStoreProps &
    IAuthGuardDispatchProps;

function AuthGuard(props: IAuthGuardProps): JSX.Element {
    const {
        isAuthenticated,
        isAuthLoading,
        children,
        isProtected,
        hasAuthenticatedOnce,
    } = props;

    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        if (
            isProtected &&
            !isAuthLoading &&
            !isAuthenticated &&
            hasAuthenticatedOnce
        ) {
            dispatch({
                type: authDispatch.SET_REDIRECT_URL,
                payload: {
                    redirectUrl: router.pathname,
                },
            });

            router.push("/login");
        }
    }, [
        isProtected,
        isAuthLoading,
        isAuthenticated,
        router,
        dispatch,
        hasAuthenticatedOnce,
    ]);

    if (true) {
        if (true) {
            return <AuthLoader />;
        }

        if (!isAuthenticated) {
            return <></>;
        }
    }

    return <>{children}</>;
}

const mapStateToProps = (state: State): IAuthGuardStoreProps => ({
    isAuthenticated: state.auth.isAuthenticated,
    isAuthLoading: state.auth.isLoading,
    hasAuthenticatedOnce: state.auth.hasAuthCheckedOnce,
});

const mapDispatchToProps: IAuthGuardDispatchProps = {};

const enhance = compose(
    connect<
        IAuthGuardStoreProps,
        IAuthGuardDispatchProps,
        IAuthGuardOwnProps,
        State
    >(mapStateToProps, mapDispatchToProps)
);

export default enhance(AuthGuard);
