FROM node:17-alpine
COPY '.' 'app'
WORKDIR /app/
RUN npm install
RUN npm run build
CMD ["pwd", "node build/index.js" ]