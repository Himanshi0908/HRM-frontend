# Build stage
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Pass build-time environment variables
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# Production stage
FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html

# Replace default Nginx configuration to handle SPA routing if needed
# For now, using default. We can add custom nginx.conf if needed.

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
