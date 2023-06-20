/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')

const nextConfig = {
    staticPageGenerationTimeout: 1000,
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ['oaidalleapiprodscus.blob.core.windows.net', 'my-storybook-private.s3.eu-west-3.amazonaws.com', 'my-storybook-public.s3.eu-west-3.amazonaws.com'],
    },
    webpack: (config) => {
        config.experiments = { ...config.experiments, ...{ topLevelAwait: true } };
        return config;
    },
    i18n,
};

module.exports = nextConfig;
