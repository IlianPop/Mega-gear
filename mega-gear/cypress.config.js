import { defineConfig } from 'cypress';
import codeCoverageTask from '@cypress/code-coverage/task.js';
import webpackConfig from './config/webpack.config.js';

export default defineConfig({
    e2e: {
        baseUrl: 'http://localhost:8080',
        setupNodeEvents(on, config) {
            codeCoverageTask(on, config);
            return config;
        },
    },
    component: {
        devServer: {
            framework: 'react',
            bundler: 'webpack',
            webpackConfig: webpackConfig,
        },
        setupNodeEvents(on, config) {
            codeCoverageTask(on, config);
            return config;
        },
    },
});
