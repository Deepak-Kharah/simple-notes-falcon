import axios from "axios";
import { Formik } from "formik";
import { connect } from "react-redux";
import { compose } from "redux";

import { loginUser } from "../redux/actions/auth.action";
import { LoginDto } from "../types/auth/auth.dto";

declare interface ILoginOwnProps {}

declare interface ILoginStoreProps {}

declare interface ILoginDispatchProps {
    loginUser: (props: LoginDto) => void;
}

export declare type ILoginProps = ILoginOwnProps &
    ILoginDispatchProps &
    ILoginStoreProps;

function Login(props: ILoginProps) {
    const { loginUser } = props;
    return (
        <div>
            <h1>Login page</h1>
            <Formik
                initialValues={{
                    username: "",
                    password: "",
                }}
                onSubmit={(values, _) => {
                    loginUser(values);
                }}
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
            <button
                onClick={() => {
                    axios
                        .get("users/me")
                        .then((res) => console.log(res))
                        .catch((err) => console.error(err));
                }}
            >
                submit
            </button>
        </div>
    );
}

const mapDispatchToProps = {
    loginUser: loginUser,
};

const enhance = compose(
    connect<ILoginStoreProps, ILoginDispatchProps, ILoginOwnProps>(
        null,
        mapDispatchToProps
    )
);

export default enhance(Login);
