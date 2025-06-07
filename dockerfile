FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY /dist /usr/share/nginx/html

# COPY certs/fullchain.pem /etc/ssl/certs/fullchain.pem
# COPY certs/privkey.pem /etc/ssl/private/privkey.pem

EXPOSE 8080 443
