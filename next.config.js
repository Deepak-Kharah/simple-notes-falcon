/** @type {import('next').NextConfig} */
module.exports = {
    async redirects() {
        return [
            {
                source: "/",
                destination: "/notes",
                permanent: true,
            },
        ];
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });

        return config;
    },
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
