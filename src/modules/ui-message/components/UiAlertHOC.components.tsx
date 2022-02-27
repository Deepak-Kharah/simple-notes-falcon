import { useToast, UseToastOptions } from "@chakra-ui/react";
import React, { Fragment } from "react";
import useEffect from "use-deep-compare-effect";
import { connect } from "react-redux";
import { compose } from "redux";
import { State } from "../../redux/store";
import { removeUiAlert } from "../redux/ui-message.action";

declare interface IUiAlertHOCOwnProps {
    children: JSX.Element;
}
declare interface IUiAlertHOCStoreProps {
    alerts: UseToastOptions[];
}
declare interface IUiAlertHOCDispatchProps {
    removeUiAlert: (alertIds: string[]) => void;
}

declare type UiProps = IUiAlertHOCOwnProps &
    IUiAlertHOCDispatchProps &
    IUiAlertHOCStoreProps;

function UiAlertHOC(props: UiProps) {
    const { children, alerts, removeUiAlert } = props;

    const toast = useToast();

    useEffect(() => {
        if (alerts.length) {
            alerts.forEach((alert) => {
                if (alert.id && !toast.isActive(alert.id)) {
                    toast({
                        ...alert,
                    });
                }
            });

            removeUiAlert(alerts.map((alert) => alert.id) as string[]);
        }
    }, [alerts]);

    return <Fragment>{children}</Fragment>;
}

const mapStateToProps = (state: State): IUiAlertHOCStoreProps => ({
    alerts: state.uiAlert.alerts,
});

const mapDispatchToProps = {
    removeUiAlert,
};

const enhance = compose(
    connect<
        IUiAlertHOCStoreProps,
        IUiAlertHOCDispatchProps,
        IUiAlertHOCOwnProps,
        State
    >(mapStateToProps, mapDispatchToProps)
);

export default enhance(UiAlertHOC);
