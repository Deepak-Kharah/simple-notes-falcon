/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    publicRuntimeConfig: {
        authRoutes: [
            "/login",
            "/register",
            "/forgot-password",
            "/reset-password",
        ],
    },
};
