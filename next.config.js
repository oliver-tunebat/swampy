/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                source: "/js/script.js",
                destination: "https://plausible.io/js/script.outbound-links.js",
            },
            {
                source: "/api/event",
                destination: "https://plausible.io/api/event",
            },
        ];
    },
    webpack: function(config) {
        config.module.rules.push({
            test: /\.md$/,
            use: "raw-loader",
        });
        return config;
    },
    // domains from which Next images can be requested
    images: {
        remotePatterns: [
            // {
            //     protocol: "https",
            //     hostname: "example.com",
            //     port: "",
            //     pathname: "/account123/**",
            // },
        ],
    },
};
