require('dotenv').config();

const key = process.env.ECOSYSTEM_SSH_KEY;
const user = process.env.ECOSYSTEM_USER;
const host = process.env.ECOSYSTEM_HOST;
const ref = process.env.ECOSYSTEM_REF;
const repo = process.env.ECOSYSTEM_REPO;
const path = process.env.ECOSYSTEM_PATH;
const script = process.env.ECOSYSTEM_SCRIPT;
const postDeploy = process.env.ECOSYSTEM_POST_DEPLOY;

module.exports = {
    apps: [
        {
            name: 'my-smartbook',
            script,
            watch: '.',
        },
    ],
    deploy: {
        production: {
            key,
            user,
            host,
            ref,
            repo,
            path,
            'pre-deploy-local': '',
            'post-deploy': postDeploy,
            'pre-setup': '',
        },
    },
};
