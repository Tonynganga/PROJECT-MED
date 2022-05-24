FROM nikolaik/python-nodejs:python3.8-nodejs16-bullseye

COPY ./requirements.txt ./

RUN apt-get update 
RUN apt-get install redis -y
RUN apt-get install systemctl -y
RUN python3 -m pip install --upgrade pip
RUN python3 -m pip install -r requirements.txt

WORKDIR /app

COPY . .

EXPOSE 8000 3000

ENTRYPOINT ["systemctl","start","redis"]