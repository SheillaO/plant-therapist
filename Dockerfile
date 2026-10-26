# --- Stage 1: Build Dependencies ---
FROM node:22-alpine AS builder

WORKDIR /app

# Install native dependencies required for compiling node modules on Alpine
RUN apk add --no-cache python3 make g++

COPY package*.json ./

# Clean installation including devDependencies to run formatting/linting if needed
RUN npm install

COPY . .

# --- Stage 2: Minimal Runtime Footprint ---
FROM node:22-alpine AS runner

WORKDIR /app

# Ensure we operate securely in a production state
ENV NODE_ENV=production

# Install Tini wrapper to safely manage zombie processes inside Alpine container hooks
RUN apk add --no-cache tini

COPY package*.json ./

# Install only production dependencies to maintain a small container footprint
RUN npm install --only=production

# Copy built code structure from the builder stage
COPY --from=builder /app/src ./src
COPY --from=builder /app/public ./public
COPY --from=builder /app/drizzle ./drizzle

EXPOSE 3000

# Use tini to pass system kernel signals cleanly to your Node process
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "src/server.js"]
