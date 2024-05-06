# Stage 2: Build the Next.js app
# Use the official Node.js 14 image as a base
FROM node:22-alpine AS base
# FROM node:latest AS base

FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
WORKDIR /app

COPY magic-first-website-next/package.json magic-first-website-next/yarn.lock* magic-first-website-next/package-lock.json* magic-first-website-next/pnpm-lock.yaml* ./
RUN npm install

FROM base AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
# COPY . .


EXPOSE 3000

ENV PORT 3000

CMD ["npm", "run", "dev"]
  
# ----old project 
# Copy package.json and package-lock.json to the working directory
# COPY package*.json ./

# # Install dependencies

# # Copy the rest of the application code to the working directory
# COPY . .
# RUN npm install

# # Expose the port that the Next.js app runs on
# EXPOSE 3000

# # Start the Next.js app in development mode
# CMD ["npm", "run", "dev"]


# docker build -t nextjs-docker . ; docker run -p 3000:3000 -p 3333:3333 -v $(pwd):/app nextjs-docker
# docker run -v "$(pwd)":/app/docker_v container1


# docker run -p 3000:3000 -v $(pwd):/app nextjs-docker
# docker run -p 3000:3000 -p 3333:3333 -v $(pwd):/app nextjs-docker