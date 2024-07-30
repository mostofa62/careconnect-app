FROM node:18-alpine AS base


FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --verbose

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build --verbose

FROM base AS runner
WORKDIR /app
COPY --from=builder /app/package.json .
COPY --from=builder /app/package-lock.json .
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 4000
ENV PORT 4000

ARG NEXT_PUBLIC_APP_NAME "CareConnect"
ENV NEXT_PUBLIC_APP_NAME=$NEXT_PUBLIC_APP_NAME
ARG NEXT_PUBLIC_API_URL http://45.90.220.243:5002/api/
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_PER_PAGE 5
ENV NEXT_PUBLIC_PER_PAGE=$NEXT_PUBLIC_PER_PAGE
ARG NEXT_PUBLIC_NUMBER_OF_PAGE 3
ENV NEXT_PUBLIC_NUMBER_OF_PAGE=$NEXT_PUBLIC_NUMBER_OF_PAGE
ARG NEXT_PUBLIC_PER_PAGE_LIST "5,20,50,100"
ENV NEXT_PUBLIC_PER_PAGE_LIST=$NEXT_PUBLIC_PER_PAGE_LIST

CMD ["node", "server.js"]