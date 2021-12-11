import axios from "axios";

const Home = () => {
    return (
        <div>
            Dashboard
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

export default Home;
