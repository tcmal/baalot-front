# baalot

A super fast and scalable voting website using google cloud functions and datastax astra. Built for def hacks 2020. This is the front end, it's served on an app engine container using Next.JS.

# Environment

You need a backend for this - set BASE_URL to be the base url for it. You should also set this is a runtime environment variable in google cloud.

# Development

```sh
npm run dev
```

# Deployment

```sh
npm run build
npm run deploy
```

# Acknowledgements

  - [Original boilerplate](https://github.com/bradrisse/nextjs-9-gae-demo)
