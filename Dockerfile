FROM node:latest AS builder

ENV NODE_ENV=production

# Cache dependencies
COPY package*.json yarn.lock ./
RUN npm install && mkdir /react-ui && mv ./node_modules ./react-ui

WORKDIR /react-ui

COPY . .
RUN npm run build

FROM nginx:alpine

COPY nginx/nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /react-ui/build /usr/share/nginx/html/mitgliederDB

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]