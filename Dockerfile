# Build the Next.js app
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

ARG NEXT_PUBLIC_API_BASE_URL

ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL

RUN npm run build

# Command to run when the container starts
CMD ["npm", "run", "start"]

# Expose the port the app runs on
EXPOSE 3000 
