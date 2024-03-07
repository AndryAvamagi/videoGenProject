FROM python:3.11.5

WORKDIR /

RUN apt-get update \
    && apt-get install -qq -y build-essential xvfb xdg-utils wget unzip ffmpeg libpq-dev vim libmagick++-dev fonts-liberation sox bc gsfonts --no-install-recommends\
    && apt-get clean

## ImageMagicK Installation 
RUN apt install -y imagemagick

COPY requirements.txt ./

RUN pip install -r requirements.txt


COPY . .



EXPOSE 5000


CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]
