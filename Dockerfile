# Stage 2: Build the Next.js app
# Use the official Node.js 14 image as a base
# Stage 2: Build the Next.js app
# Use the official Node.js 14 image as a base
FROM node:latest AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY magic-first-website-next/package*.json ./

# Install dependencies
# RUN npm install

# Copy the rest of the application code
COPY magic-first-website-next .

# Build the Next.js app
RUN npm install

# Expose the port the app will run on
EXPOSE 3000

# Start the Next.js application
# RUN npm run dev
CMD npm run dev

# Start the Next.js app in development mode
# CMD ["npm", "run", "dev"]


# docker build -t nextjs-docker . ; docker run -p 3000:3000 -p 3333:3333 -v $(pwd):/app nextjs-docker
# docker run -v "$(pwd)":/app/docker_v container1


# docker run -p 3000:3000 -v $(pwd):/app nextjs-docker
# docker run -p 3000:3000 -p 3333:3333 -v $(pwd):/app nextjs-docker