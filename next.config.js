const isGithubPages = !!process.env.CI;

const basePath = isGithubPages ? '/open-hybrid-raid' : '';
const assetPrefix = isGithubPages ? '/open-hybrid-raid/' : '/';

module.exports = {
    basePath,
    assetPrefix,
    publicRuntimeConfig: {
        basePath,
        assetPrefix,
    }
}