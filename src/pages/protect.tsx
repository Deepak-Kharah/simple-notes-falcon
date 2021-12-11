import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { State } from "../modules/redux/store";

const ProtectedPage = (props: { isAuthenticated: boolean }) => {
    return (
        <div>
            <h1>ProtectedPage</h1>
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
};

const mapStateToProps = (state: State) => {
    isAuthenticated: state.auth.isAuthenticated;
};

export default connect(mapStateToProps)(ProtectedPage);
