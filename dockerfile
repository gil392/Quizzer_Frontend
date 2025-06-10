FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY /dist /usr/share/nginx/html

# COPY certs/client-cert.pem /etc/ssl/certs/fullchain.pem
# COPY certs/client-key.pem /etc/ssl/private/privkey.pem

EXPOSE 80 443
