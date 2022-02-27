import React from "react";

function SimplyNotesLogo(props: { width?: number; height?: number }) {
    const { width = 250, height = 250 } = props;
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            fill="none"
            viewBox="0 0 250 250"
        >
            <path
                fill="#373943"
                fillRule="evenodd"
                d="M125 0C55.964 0 0 55.964 0 125s55.964 125 125 125 125-55.964 125-125S194.036 0 125 0zM83.64 76.212c-1.12-1.604-3.64-.811-3.64 1.145V80h6.285l-2.645-3.788zM93.694 90.61H80v6.063h17.927l-4.233-6.063zM80 113.344v-6.063h25.336l4.233 6.063H80zm0 10.609v6.063h41.212l-4.234-6.063H80zm0 22.735v-6.063h48.62l4.234 6.063H80zm0 10.609v6.062h64.496l-4.233-6.062H80zm0 19.551v-2.879h71.905l1.211 1.734c.926 1.326-.023 3.145-1.64 3.145H82a2 2 0 01-2-2zM104.08 72c.651 0 1.262.318 1.637.851l52.446 74.764c1.123 1.6 3.637.806 3.637-1.148V74a2 2 0 012-2h4.207a2 2 0 012 2v99.491c0 1.956-2.519 2.749-3.639 1.145l-69.477-99.49c-.925-1.327.023-3.146 1.64-3.146h5.549zM191 163a8 8 0 100 16 8 8 0 000-16z"
                clipRule="evenodd"
            ></path>
        </svg>
    );
}

export default SimplyNotesLogo;
