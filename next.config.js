/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                source: "/js/script.js",
                destination: "https://plausible.io/js/script.outbound-link.js",
            },
            {
                source: "/api/event",
                destination: "https://plausible.io/api/event",
            },
        ];
    },
};
