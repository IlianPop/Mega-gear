import codeCoverage from '@cypress/code-coverage/task';

export default (on, config) => {
    codeCoverage(on, config);
    return config;
};
