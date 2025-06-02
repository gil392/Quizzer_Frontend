# Stage 1: Build the Vite app
FROM node:18 AS builder

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

ENV NODE_ENV="production"
RUN npm prune

# Stage 2: Serve with Nginx
FROM nginx:stable-alpine

# Copy Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Replace default nginx index with Vite build output
COPY --from=builder /app/dist /usr/share/nginx/html

# SSL certificates (you should mount them in production instead)
# COPY certs/fullchain.pem /etc/ssl/certs/fullchain.pem
# COPY certs/privkey.pem /etc/ssl/private/privkey.pem

EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
