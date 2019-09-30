before build this, you have to create .env at route folder(same folder as nuxt.config.js) 
.env file should contain these settings.

LOGMODE=DEV
API_KEY=xxxxxxxxx
AUTH_DOMAIN=xxxxxxxx
DATABASE_URL=xxxxxx
PROJECT_ID=xxxxxx
STORAGE_BUCKET=xxxxxx
MESSAGING_SENDER_ID=xxxxxx

LOGMODE: set DEV if you'd like to enable console functions(ex: console.log)
Others:  Indicated value by Firebase. See https://firebase.google.com/docs/web/setup .


# nuxt-vuetify-firebase

> test PJ using nuxt, vuetify and firebase

## Build Setup

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

