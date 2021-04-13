Q2A.js is question/answer forum (like stackoverflow) made with latest technologies including :
- Next.js
- Material ui
- Node.js
- ORM (Sequelizer) 
- Graphql,Apollo,Express
- Passport.js 

# Demo : 

http://136.243.118.63:3000

## Features :

- Fast And SEO Friendly
- Server Side Generation powered by Next.js
- Multi Language support
- Responsive ui
- Different SQL Database support 
- Light/Dark theme support
- Easy to set up with docker



## How to run :
### Preparation
Install nodejs 14.16.x (you can use [nvm](https://github.com/coreybutler/nvm-windows/releases))

Make a new Database.

In backend and front_end folder rename .sample.env to .env and fill it's fields

Install packages:

```
yarn install_packages
```

### Setup 

```
yarn api_setup
```

What it does : 

- Create empty database and add some initial data 

### Run :
#### backend
```
yarn api_run_dev
```

#### frontend :

```
yarn fronend_run_dev
```
### Deploy with docker 

- From root folder rename .sample.env to .env and fill it's fields
- Run :
```
yarn deploy_docker
```
- For rebuilding images (e.g after pull):
```
yarn docker_rebuild_frontend
yarn docker_rebuild_api
```

###### This project is work in progress and under  development feel free to create issue for discussion
