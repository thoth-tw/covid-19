# covid-19

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
yarn start
```

## Deployment

Should be trival. Go figure out yourself :)

<img width="761" alt="Screen Shot 2020-03-20 at 6 26 23 PM" src="https://user-images.githubusercontent.com/3991678/77155348-4f0db500-6ad8-11ea-9206-b5b978c7d988.png">
