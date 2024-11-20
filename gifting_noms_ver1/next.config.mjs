import path from 'path';
import sass from 'sass';

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
    webpack: (config, { isServer }) => {
        config.module.rules.push({
            test: /\.scss$/,
            use: [
                'style-loader',
                'css-loader',
                {
                    loader: 'sass-loader',
                    options: {
                        implementation: sass, // Use Dart Sass
                        sassOptions: {
                            includePaths: [
                                path.join(process.cwd(), './styles'),
                            ],
                            outputStyle: 'compressed',
                        },
                    },
                },
            ],
        });

        return config;
    },
};
// comments

export default nextConfig;
