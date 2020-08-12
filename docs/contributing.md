# Contributing to the Bay Community website

Created by the Bay Community team.

This code has been adapted from the [NC Covid Support repository](https://github.com/code-for-chapel-hill/NC-COVID-Support/), designed by [Code for Chapel Hill](http://www.codeforchapelhill.com/) part of [Code for America](https://www.codeforamerica.org/).

## Introduction

Thank you for your interest in contributing to the Bay Community website, we really appreciate any help we can get to improve the site for all those who use it.

The following is a set of guidelines, to help you contribute to this project. Use your best judgement, and feel free to propose changes to this document in a pull request.

We are a friendly group and are happy with whatever contributions you might be able to make.

## Code of conduct

This project and everyone participating in it, is governed by our [Code of Conduct](code_of_conduct.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [baycommunityresource@gmail.com](mailto:baycommunityresource@gmail.com).

## Table of contents

[Contributing code changes](#contributing-code-changes)

- [Guidelines for contributions we welcome](#guidelines-for-contributions-we-welcome)
- [New developers and good first issues](#new-developers-and-good-first-issues)
- [How to begin](#how-to-begin)
- [Pull requests](#pull-requests)

[Reviews](#reviews)

- [Our current PR process](#our-current-pr-process)
- [Making changes after the PR is open](#making-changes-after-the-pr-is-open)
- [Keeping your Bay Community website fork in sync with the main repository](#keeping-your-nc-covid-support-fork-in-sync-with-the-main-repository)
- [Style guidelines](#style-guidelines)

[How to get started with our code](#How-to-get-started-with-our-code)

- [Frontend packages used](#frontend-packages-used)
- [Development machine requirements](#development-machine-requirements)
- [Visual Studio Setup (Optional)](#visual-studio-setup-optional)
- [VS Code Setup (Optional)](#vs-code-setup-optional)
- [Prettier Code Style](#prettier-code-style)

[Getting started](#getting-started)

- [Download the source code](#download-the-source-code)
- [Build the client side project using the Development Mode](#build-the-client-side-project-using-the-development-mode)
- [Where do I put things](#where-do-i-put-things)

[Other ways to contribute](#other-ways-to-contribute)

## Contributing code changes

This document gives you a quick overview on how to get started.

### Guidelines for contributions we welcome

Not all changes are wanted, so on occasion we might close a PR without merging it. We will give you feedback why we can't accept your changes and we'll be nice about it, thanking you for spending your valuable time.

Make sure to talk to us before making large changes, so we can ensure that you don't put all your hard work into something we would not be able to merge.

If you want to be part of the team please email [baycommunityresource@gmail.com](mailto:baycommunityresource@gmail.com).

### How to begin

The short version goes like this:

- **Fork** - create a fork of [`mega-map-dev` on GitHub](https://github.com/dcl-covid-19/mega-map-dev)

  ![Fork the repository](/covid-19-support/src/images/Fork.png)

- **Clone** - when GitHub has created your fork, you can clone it in your favorite Git tool

- **Switch to the correct branch** - switch to the `master` branch

- **Build** - build your fork of the Bay Community website locally as described in [building from source code](BUILD.md)

- **Create a new branch** - it would help us if you can always name your branch after the issue you're fixing.

- **Change** - make your changes, fix a bug 🐛, add a feature 🆕, correct our spelling 🤦
, and don't be afraid to break something. We welcome all contributions and will [happily give feedback](#questions)

- **Commit** - done? Yay! 🎉 **Important:** Don't commit to the `master` branch, make sure you have created a new branch as mentioned above.

- **Push** - great, now you can push the changes up to your fork on GitHub

- **Create a pull request** - you're ready to send us your changes. GitHub will have picked up on the new branch you've just pushed and will offer to create a [Pull Request](#pull-requests). Click that green button and away you go.

![Create a pull request](/covid-19-support/src/images/createpullrequest.png)

    Note: If you just need some feedback to progress - you can make use of GitHub's draft pull request status, detailed [here](https://github.blog/2019-02-14-introducing-draft-pull-requests/))

### Pull requests

The most successful pull requests usually look like this:

- Fill in the required template (shown when starting a PR on GitHub), and link your pull request to an issue on our [issue tracker,](https://github.com/dcl-covid-19/mega-map-dev/issues) if applicable.
- Include screenshots and animated GIFs in your pull request whenever possible to highlight what you have changed.
- Ensure you have run [Prettier](#prettier-code-style) against your code

Again, these are guidelines, not strict requirements. However, the more information that you give to us, the more we have to work with when considering your contributions. Good documentation of a pull request can really speed up the time it takes to review and merge your work!

## Reviews

You've sent us your first contribution - congratulations! Now what?

We can now start reviewing your proposed changes and give you feedback on them. If it's not perfect, we'll either fix up what we need or we may request that you make some additional changes.

### Making changes after the PR is open

If you make changes to your PR, please push them to the same branch in your fork again, the pull request automatically updates with the additional commit(s) so we can review it again. If all is well, we'll merge the code :)

### Keeping your fork in sync with the main repository

We recommend you sync with our repository before you submit your pull request. That way, you can fix any potential merge conflicts and make our lives a little bit easier.

If you have submitted a pull request weeks ago and want to work on something new, make sure you have got the latest code to build against.

To sync your fork with the original one, you'll have to add the upstream url. You only have to do this once:

```
git remote add upstream https://github.com/dcl-covid-19/mega-map-dev/
```

Then when you want to get the changes from the main repository:

```
git fetch upstream
git rebase upstream/master
```

In this command we're syncing with the `master` branch, but you can of course choose another one if needed.

(More info on how this works: [http://robots.thoughtbot.com/post/5133345960/keeping-a-git-fork-updated](http://robots.thoughtbot.com/post/5133345960/keeping-a-git-fork-updated))

### Style guidelines

We are using [Prettier](https://prettier.io) to maintain a common code format between developers, you can find out more details in our [Prettier code style](#prettier-code-style) section below.

## How to get started with our code

This section details how to setup your local development environment and talks about the technologies we have used in the project.

### Frontend packages used

VueJS - The Progressive JavaScript Framework - https://vuejs.org/

Vue I18n - Internationalization Plugin - https://kazupon.github.io/vue-i18n/

Vue Leaflet - Mapping - ( Version of Leaflet that works with VueJS ) - https://vue2-leaflet.netlify.com/

BootstrapVue - Responsive Layout - ( Version of Bootstrap that works well with VueJS ) - https://bootstrap-vue.js.org/

### Development machine requirements

#### NodeJS

Make sure you have the latest stable version of NodeJS. It can be downloaded from here: https://nodejs.org/en/

#### NPM

You should also have NPM installed.

If you need to update the NPM version on Windows, use the accepted instructions found here:

[Stack Overflow - How can I update npm on windows](https://stackoverflow.com/questions/18412129/how-can-i-update-npm-on-windows)

Which for reference are:

Open a Powershell window with "Run as Administrator" then use the following three commands:

```
Set-ExecutionPolicy Unrestricted -Scope CurrentUser -Force
npm install -g npm-windows-upgrade
npm-windows-upgrade
```

### Prettier Code Style

We are using [Prettier](https://prettier.io) to maintain a common code format between developers, a check is run against the solution on every Pull request, please ensure your code passes the Prettier tests before submitting a PR.

A simple way to do this is to run the command line command:

`npm run format`

## Getting started

### Download the source code

Follow the instructions above for setting up your environment, forking and cloning the project, then from a command or terminal window, navigate to the 'src' folder and run **`npm install`** to download the dependencies.

### Build the client side project using the Development Mode

Once completed. you can run **`npm run serve'** to build the solution and for a development web server to start and automatically open the main Index.html page, if you make any changes to the client side files the website running in your browser should automatically update.

### Where do I put things

The `/covid-19-support` directory is where all the client side development files go:

```
/ dist -- The compiled files ready to deploy onto a web server
/ node_modules -- The Node JS package repository folder
/ public -- The source Index.html file and any non-compiled files like Robots.txt / Favicon.ico etc.
/ src
    / components -- ( This is where we put VueJS Single File Components )
    / locales -- The i18n Translation files
```

## Other ways to contribute

We welcome all kinds of contributions to our repository. If you don't feel you'd like to make code changes you can use your experience to improving this documentation, or you can join our [content editing team](content-editors.md) to help add more content to the [Bay Community](https://bayareacommunity.org) site.

We also encourage you to feel free to comment on others' pull requests and issues. If you see something on our [issue tracker](https://github.com/dcl-covid-19/mega-map-dev/issues) or [pull requests](https://github.com/dcl-covid-19/mega-map-dev/pulls) you feel you can add to, please don't be shy.
