FROM nginx:1.31.6-alpine

WORKDIR /usr/share/nginx/html

COPY dist/ /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx","-g","daemon off;"]
