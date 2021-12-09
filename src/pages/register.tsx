import axios, { AxiosRequestConfig } from "axios";
import { Formik } from "formik";
import { connect } from "react-redux";
import { compose } from "redux";

import { registerUser } from "../redux/actions/auth.action";
import { RegisterDto } from "../types/auth/auth.dto";

declare interface IRegisterOwnProps {}

declare interface IRegisterStoreProps {}

declare interface IRegisterDispatchProps {
    registerUser: (props: RegisterDto) => void;
}

export declare type IRegisterProps = IRegisterOwnProps &
    IRegisterDispatchProps &
    IRegisterStoreProps;

const register = (props: IRegisterProps) => {
    const { registerUser } = props;
    return (
        <div>
            <h1>Reg page</h1>
            <Formik
                initialValues={{ username: "", password: "" }}
                onSubmit={registerUser}
            >
                {({ handleSubmit, handleChange, values }) => (
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="username"
                            onChange={handleChange}
                            value={values.username}
                        />
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            value={values.password}
                        />
                        <button type="submit">Submit</button>
                    </form>
                )}
            </Formik>
        </div>
    );
};

const mapDispatchToProps = {
    registerUser,
};

const enhance = compose(
    connect<IRegisterStoreProps, IRegisterDispatchProps, IRegisterOwnProps>(
        null,
        mapDispatchToProps
    )
);

export default enhance(register);
