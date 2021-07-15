Q2A.js is question/answer forum (like stackoverflow) made with latest technologies including :
- Next.js
- Material ui
- Node.js
- ORM (Sequelizer) 
- Graphql,Apollo,Express
- Passport.js 

# Demo : 

https://q2ajs.com

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

In api and frontend folder rename .sample.env to .env and fill it's fields

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
yarn frontend_run_dev
```
### Deploy with docker 

- From root folder rename .sample.env to .env and fill it's fields
- From api/ folder rename .sample.env to .env and fill it's fields,because of docker-composer networking  HOST field should be mysql
- Run :
```
yarn deploy_docker
```
- For rebuilding images (e.g after pull):
```
yarn docker_rebuild_frontend
yarn docker_rebuild_api
```
If there is no error you can access your site with followings:
- Your site :  server_ip 
- PhpMyAdmin : server_ip:8081
- API : server_ip:4000

#### Installing docker,yarn ,... on linux (Debian 10.x)

##### [Increase swap memory so you don't get out of memory error](https://serverfault.com/questions/218122/how-do-i-increase-swap-memory-in-debian)

```
dd if=/dev/zero of=/swap bs=512k count=8192
mkswap /swap
chmod 0600 /swap
swapon /swap
```

##### Install packages

- Git 

``` apt install git ```

- Docker  https://docs.docker.com/engine/install/debian/
``` 
apt-get update

apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian \
  $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

apt-get update

apt-get install docker-ce docker-ce-cli containerd.io

``` 

- Docker Compose https://docs.docker.com/compose/install/
``` 
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
docker-compose --version
```

-Yarn https://stackoverflow.com/questions/46013544/yarn-install-command-error-no-such-file-or-directory-install
```
sudo apt remove cmdtest 
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update
sudo apt-get install yarn -y
```

- Install nvm from this [link](https://github.com/nvm-sh/nvm)

##### Clone and run project : 
```
cd /var/www
git clone "https://github.com/uchar/Q2A.js.git"
nvm install 14.16.0
nvm use 14.16.0
yarn deploy_docker
```

##### Some commands to help you check if you have errors or not

- show docker images logs
```docker logs <id_image>```

- show docker images statues
```docker ps -a```

- [Go into docker image](https://stackoverflow.com/questions/30172605/how-do-i-get-into-a-docker-containers-shell)
```docker exec -it <id_image> sh```







