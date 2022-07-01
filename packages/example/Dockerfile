##
# Install dependencies, generate Prisma client, transpile TypeScript to JavaScript,
# run unit tests, delete node_modules and source files
##

FROM jkomyno-pnpm AS builder
LABEL jkomyno/reproduce-issue-14043.name=example
LABEL jkomyno/reproduce-issue-14043.intermediate=true

WORKDIR /app/packages

# add test config
COPY ["./jest/", "./jest/"]

# add local dependency source
COPY ["./common-utils/", "./common-utils/"]

# add package itself
COPY ["./example/", "./example/"]

WORKDIR /app

# install
RUN --mount=type=cache,id=pnpm-store,target=/root/.pnpm-store \
  pnpm install --frozen-lockfile \
  | grep -v "cross-device link not permitted\|Falling back to copying packages from store"

RUN pnpm build
RUN pnpm --filter "example" test:unit
RUN rm -rf node_modules \
  && pnpm -r exec -- rm -rf node_modules src __tests__ jest

##
# Copy production dependencies and transpiled bundle, start application
##

FROM jkomyno-pnpm AS example
LABEL jkomyno/reproduce-issue-14043.name=example
LABEL jkomyno/reproduce-issue-14043.intermediate=false
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app .
RUN --mount=type=cache,id=pnpm-store,target=/root/.pnpm-store \
  pnpm install --frozen-lockfile --prod \
  | grep -v "cross-device link not permitted\|Falling back to copying packages from store"

WORKDIR /app/packages/example

# generate Prisma client
RUN pnpx prisma generate

ENTRYPOINT ["node", "lib"]
