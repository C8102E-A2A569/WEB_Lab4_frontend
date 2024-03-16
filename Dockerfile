FROM node:18-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY .. .
RUN npm run build

# Stage 2: Serve the angular app with Nginx
FROM nginx:alpine
#WORKDIR /usr/share/nginx/html/frontend/browser
#RUN rm -rf ./*
#COPY --from=build-stage /app/dist/frontend/browser /usr/share/nginx/html/frontend/browser
#ENTRYPOINT ["nginx", "-g", "daemon off;"]
COPY --from=build-stage /app/dist/frontend/browser /usr/share/nginx/html/frontend/browser
COPY nginx.conf /etc/nginx/conf/nginx.conf
#RUN rm -rf /usr/share/nginx/html/frontend/browser

