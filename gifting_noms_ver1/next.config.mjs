/** @type {import('next').NextConfig} */

const nextConfig = {
    experimental: {
        turbo: {
            resolveAlias: {
                underscore: 'lodash',
                mocha: { browser: 'mocha/browser-entry.js' },
            },
        },
    },
};

export default nextConfig;
