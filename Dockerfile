# Build stage
FROM node:20-slim AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Production stage
FROM node:20-slim

WORKDIR /app

# Install production dependencies only
COPY package*.json ./
RUN npm install --production

# Copy built assets and server code
COPY --from=build /app/dist ./dist
COPY --from=build /app/server.ts ./
COPY --from=build /app/tsconfig.json ./

# tsx and typescript are needed to run server.ts
RUN npm install tsx typescript

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

CMD ["npx", "tsx", "server.ts"]
