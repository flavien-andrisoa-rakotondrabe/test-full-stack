# Étape 1 : build TS
FROM node:20-slim AS builder

WORKDIR /app

# Dependencies
COPY package*.json tsconfig.json ./
RUN npm install 

# COPY source code
COPY . .

# TypeScript compilation
RUN npm run build


# Étape 2 : minimal runtime
FROM node:20-slim AS runner

WORKDIR /app

# COPY compiled code
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 5000

# Start compiled
CMD ["node", "dist/index.js"]
