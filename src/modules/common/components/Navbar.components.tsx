import {
    Box,
    Flex,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from "@chakra-ui/react";
import { MoonIcon } from "@chakra-ui/icons";
import { compose } from "redux";
import { connect } from "react-redux";

import styles from "./Navbar.module.css";
import { State } from "../../redux/store";
import { logoutUser } from "../../auth/redux/auth.action";
import { useMemo } from "react";
import { generateInitials } from "../utils/authUtils";
import { useLogoutUser } from "../../auth/hooks/auth.hooks";
import SimplyNotesLogo from "./Logo";

declare interface INavbarOwnProps {}

declare interface INavbarStoreProps {
    username: string;
}

declare interface INavbarDispatchProps {
    logoutUser: () => void;
}

declare type INavbarProps = INavbarOwnProps &
    INavbarStoreProps &
    INavbarDispatchProps;

function Navbar(props: INavbarProps) {
    const { logoutUser, username } = props;

    const logoutCallback = useLogoutUser(logoutUser);

    const initials = useMemo(() => generateInitials(username), []);
    return (
        <Box boxShadow="base" px={4} className={styles["nav"]}>
            <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
                <Box className={styles["brand"]}>
                    <SimplyNotesLogo width={30} height={30} />
                    <p>Simply Note</p>
                </Box>
                <Flex alignItems={"center"}>
                    <Menu>
                        <MenuButton
                            className={styles["avatar"]}
                            as={Button}
                            rounded={"full"}
                            variant={"link"}
                            cursor={"pointer"}
                        >
                            {initials}
                        </MenuButton>
                        <MenuList>
                            <MenuItem
                                onClick={logoutCallback}
                                className={styles["menu-logout-button"]}
                                icon={<MoonIcon />}
                            >
                                Logout
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </Flex>
        </Box>
    );
}

const mapStateToProps = (state: State): INavbarStoreProps => ({
    username: state.auth.userDetails.username,
});

const mapDispatchToProps: INavbarDispatchProps = {
    logoutUser,
};

const enhance = compose(
    connect<INavbarStoreProps, INavbarDispatchProps, INavbarOwnProps, State>(
        mapStateToProps,
        mapDispatchToProps
    )
);

export default enhance(Navbar);
