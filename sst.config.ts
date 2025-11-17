/// <reference path="./.sst/platform/config.d.ts" />

const repoName = `app-${
  process.env.GITHUB_REPOSITORY?.split("/")[1] || "11ty-site"
}`;

export default $config({
  app() {
    return {
      name: repoName,
      removal: "retain",
      home: "aws",
    };
  },
  async run() {
    new sst.aws.StaticSite(`${repoName}-website`, {
      path: "_site",
      environment: {
        REPO_NAME: repoName,
      },
    });
  },
});
