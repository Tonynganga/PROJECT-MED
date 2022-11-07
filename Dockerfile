FROM nikolaik/python-nodejs:python3.8-nodejs16-bullseye

COPY ./requirements.txt ./

RUN apt install -y curl 
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update
RUN apt install -y yarn
RUN apt-get install redis -y
RUN apt-get install systemctl -y
RUN apt-get install postgresql postgresql-contrib
RUN python3 -m pip install --upgrade pip
RUN python3 -m pip install -r requirements.txt

WORKDIR /app
 
COPY . .

EXPOSE 8000 3000

ENTRYPOINT ["systemctl","start","redis"]