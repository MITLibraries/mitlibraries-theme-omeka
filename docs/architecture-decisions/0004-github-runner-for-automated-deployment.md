# 4. USe Github Runner for automated deployment

Date: 2023-10-13

## Status

Accepted

## Context

We need a simple, automated, and secure way for theme updates to be deployed to the Omeka S staging server (for testing/verification) and to the production server. We want to reduce (or even eliminate) the need for any ssh connections to Omeka S host servers while allowing for EngX to deploy theme updates easily. InfraEng has already done this at least one other time (the [CloudConnector](https://github.com/MITLibraries/cloudconnector) service) so this is a known configuration and procedure.

## Decision

* We will configure each of the host servers as a GitHub Runner, linked only to this repository
  * This will include updates to the repository configuration
  * This will include the installation of the GitHub Runner application on the host servers
* We will create GitHub Action workflows to run the theme deployment commands on the servers.
  * The deployment to the staging server will be triggered by a merge to the `main` branch
  * The deployment to the production server will be triggered by a tagged release on the `main` branch

## Related Documentation

* [Adding Self-Hosted Runners](https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/adding-self-hosted-runners)
* [CloudConnector README](https://github.com/MITLibraries/cloudconnector/blob/main/README.md)

## Consequences

* One additional application to install/manage on the servers hosted by Digital Scholar (but based on our conversations with them, this shouldn't be an issue at all)
* Anyone with rights in GitHub to tag releases on this repository can trigger a redeploy of the theme
