export default function getBadges(project) {
  const badges = [];

  if (project.githubRepository) {
    badges.push({
      title: "Latest version",
      url: `https://github.com/${project.githubRepository}/releases`,
      src: `https://img.shields.io/github/release/${project.githubRepository}.svg?style=flat-square`,
    });

    badges.push({
      title: "License",
      src: `https://img.shields.io/github/license/${project.githubRepository}?style=flat-square`,
    });
  }

  if (project.githubRepository && project.githubWorkflow) {
    badges.push({
      title: "GitHub Workflow Status",
      src: `https://img.shields.io/github/actions/workflow/status/${project.githubRepository}/${project.githubWorkflow}?style=flat-square&logo=github`,
    });
  }

  if (project.sonarKey) {
    badges.push({
      title: "Sonar Coverage",
      url: `https://sonarcloud.io/dashboard?id=${project.sonarKey}`,
      src: `https://sonarcloud.io/api/project_badges/measure?project=${project.sonarKey}&metric=coverage`,
    });

    badges.push({
      title: "Sonar Quality Gate Status",
      url: `https://sonarcloud.io/dashboard?id=${project.sonarKey}`,
      src: `https://sonarcloud.io/api/project_badges/measure?project=${project.sonarKey}&metric=alert_status`,
    });
  }

  if (project.npmPackage) {
    badges.push({
      title: "NPM Downloads",
      url: `https://www.npmjs.com/package/${project.npmPackage}`,
      src: `https://img.shields.io/npm/dm/${project.npmPackage}?style=flat-square&logo=npm`,
    });
  }

  if (project.dockerImage) {
    badges.push({
      title: "Docker Pulls",
      url: `https://hub.docker.com/r/${project.dockerImage}`,
      src: `https://img.shields.io/docker/pulls/${project.dockerImage}?style=flat-square&logo=docker`,
    });
  }

  if (project.packagistPackage) {
    badges.push({
      title: "Packagist Downloads",
      url: `https://packagist.org/packages/${project.packagistPackage}`,
      src: `https://img.shields.io/packagist/dm/${project.packagistPackage}?style=flat-square&logo=packagist`,
    });
  }

  return badges;
}
