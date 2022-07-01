# pnpm-monorepo-example

[![Github Actions](https://github.com/jkomyno/reproduce-issue-14043/actions/workflows/ci.yaml/badge.svg?branch=master)](https://github.com/jkomyno/reproduce-issue-14043/actions/workflows/ci.yaml)

> Practical example of a `TypeScript` monorepo with [`pnpm`](https://pnpm.io), [`turborepo`](https://turborepo.org), and [`jest`](https://jestjs.io).

---------------------------------------------

## What's Included

- `pnpm` workspace, whose configuration is stored in [`pnpm-workspace.yaml`](/pnpm-workspace.yaml). Two example packages are included, [`common-utils`](packages/common-utils) and [`example`](packages/example), with the latter importing `common-utils` as a dependency, as well as `prisma`. All local packages are decorated with a `@jkomyno/*` scope (you may want to substitute these instances in the `name` entries of any `package.json` with yours or your company's name).
- `turborepo`, whose configuration is stored in [`turbo.json`](./turbo.json)
- an example [`Dockerfile`](./Dockerfile.pnpm) that can be built and used as a base image for your Node.js Docker containers.
- the `jest` test engine, whose configuration is stored in the [`packages/jest`](./packages/jest) folder.
- opinionated [`prettier`](https://prettier.io) and [`eslint`](https://eslint.org) setups.

## How to build, test, and run with Docker

Ensure you have `Docker 20.10.5` installed and running with `docker -v`.
Build the `jkomyno-example` Docker image, which wraps `Node.js 18.0.0` on Linux Alpine with `pnpm 6.32.2` and `git`:

```bash
docker build -f Dockerfile.pnpm . -t jkomyno-pnpm
```

Build and run unit tests of [`example`](packages/example) with:

```bash
docker build -f ./packages/example/Dockerfile ./packages -t jkomyno-example
```

Run [`example`](packages/example) with:

```bash
docker run --rm -it jkomyno-example
```

## Available Scripts

- `pnpm install`: install the dependencies needed for each package.
- `pnpm build`: transpile the local TypeScript packages to JavaScript.
- `pnpm eslint-check`: check that the code follows the `eslint` guidelines.
- `pnpm prettier-check`: check that the code follows the `prettier` guidelines.
- `pnpm prettier-write`: override the code to follow the `prettier` guidelines.
- `pnpm test:unit`: run unit tests.
- `pnpm test:integration`: run integration tests.

## 📝 License

Built with ❤️ by [Alberto Schiabel](https://github.com/jkomyno) at [Prisma](https://prisma.io). <br />
This project is [MIT](https://github.com/jkomyno/reproduce-issue-14043/blob/master/LICENSE) licensed.
