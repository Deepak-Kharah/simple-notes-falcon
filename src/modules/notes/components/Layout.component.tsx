import React from "react";
import Navbar from "../../common/components/Navbar.components";

declare interface ILayoutOwnProps {
    children: React.ReactNode;
}

declare interface ILayoutStoreProps {}

declare interface ILayoutDispatchProps {}

declare type ILayoutProps = ILayoutOwnProps &
    ILayoutStoreProps &
    ILayoutDispatchProps;

function Layout(props: ILayoutProps): JSX.Element {
    const { children } = props;

    return (
        <div>
            <Navbar />
            <br />
            <div>{children}</div>
        </div>
    );
}

export default Layout;
