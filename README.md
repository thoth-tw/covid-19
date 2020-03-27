# covid-19

![covid19](https://user-images.githubusercontent.com/3991678/77348323-37525d00-6d74-11ea-9f76-d07d2ce28392.jpg)


The data is crawled from [https://www.worldometers.info/coronavirus/](https://www.worldometers.info/coronavirus/), so it might not be stable.

## Installation
```
git clone https://github.com/huaying/covid-19

cd covid-19
yarn install
yarn --cwd api install
```

## Setup

Go to [https://newsapi.org/](https://newsapi.org/) and get your api key.
Create file `.env` and put your key here.

```
NEWS_API_KEY=YOUR_KEY_HERE
```

## Run locally

The server fequently fetch the latest stats data and news. It will serve your data at port 5001. To start your server, run:
```
yarn api:dev
```

UI is written in next.js. To start your ui, run:
```
yarn dev
```

## Deployment

Should be trival. Go figure out yourself :)
