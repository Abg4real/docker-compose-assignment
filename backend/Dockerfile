FROM nginx
COPY . /app
COPY ./server.conf /etc/nginx/conf.d/
RUN apt update
RUN apt install nodejs npm -y
EXPOSE 3000
WORKDIR /app
RUN chmod 777 startup.sh
ENTRYPOINT [ "./startup.sh" ]