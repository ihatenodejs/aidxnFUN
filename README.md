# aidxnFUN
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fihatenodejs%2FaidxnFUN.svg?type=shield&issueType=license)](https://app.fossa.com/projects/git%2Bgithub.com%2Fihatenodejs%2FaidxnFUN?ref=badge_shield&issueType=license)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fihatenodejs%2FaidxnFUN.svg?type=shield&issueType=security)](https://app.fossa.com/projects/git%2Bgithub.com%2Fihatenodejs%2FaidxnFUN?ref=badge_shield&issueType=security)

Built with Tailwind CSS, EJS, ExpressJS, and NodeJS for a backend for it all.
This is a more modern version of design.
This project is released under the CC0-1.0 license. The code and content are in the public domain.

This repo may be archived at times due to me not needing a new design or extra features.

# Install and self host
Have a weird obsession? Want a pre-built site you can use for free? Host aidxnFUN!
As the code is avaliable under the CC0-1.0 license, which means you should feel free and encouraged to change content, design, whatever!
During this process, `screen`, `node` (20.08.0), and `docker` will be installed on your computer.

Please note the /status endpoint will be broken with the original servers as CORS is blocked on sites not requesting from my personal domain.

## Debian/Ubuntu/Other Debian-based systems
1. Clone the repo
   ```bash
   git clone https://github.com/ihatenodejs/aidxnFUN
   cd aidxnFUN
   ```
2. Setup `manage`
   ```bash
   ./manage setup
   ```
3. Copy template files and edit them
   ```bash
   cp docker-compose.yml.example docker-compose.yml # Copy Docker Compose file
   cp .env.example .env # Copy env file
   
   nano docker-compose.yml # Edit Docker Compose (database server)
   nano .env # Edit env (database config)
   ```
   
   When editing .env, use server details from docker-compose.yml so they are linked together. Ensure you double-check the IP or hostname of the Docker container, and link that with the .env file. This is crucial, or your database will not be connected.

   Database features are only for analytics, at this time.
4. Start the server
   ```bash
   ./manage up
   ```
   A server will now start on port :3000, and be accessable from your web browser at http://localhost:3000/

## Windows
Windows is currently not supported by aidxnFUN yet. I suggest you use WSL, and follow the Linux instructions, or purchase a server.

# How it works
This website uses NodeJS, ExpressJS for a server, EJS for templating, and Tailwind CSS for the frontend CSS. It additionally uses Docker (w/ MariaDB and optionally PhpMyAdmin) for managing the database, which is used in the analytics system.
The `manage` script uses all of those tools to manage the server for you executes the repetitive tasks for you automatically.
The views contain both regular page shards (full-ish pages) and generic shards (fragments of pages, widgets, etc). I define a "shard" as an EJS template, which are pieced together into a pretty little website. The shards hold individual elements like music widgets, while a regular page shard is the page that contains the music widget, which the end user sees. This is helpful for understanding the code.

Thus far, shards are included for a music widget, the header, and the footer of the pages.

Music (as featured on the home page) is fetched from an API (hosted on https://biancarosa.com.br), which I am in the process of setting up for myself. It works with a LastFM account (I linked this to my Spotify) and can track your live listening with amazing accuracy. The repo can be found at [biancarosa/lastfm-last-played](https://github.com/biancarosa/lastfm-last-played).

# Sample docker-compose.yml - (suggested)
```dockerfile
services:
  aidxnfun-db:
    image: mariadb:latest
    networks:
      aidxnfun-n:
        ipv4_address: 10.5.0.5
    environment:
      MYSQL_ROOT_PASSWORD: iloveaidxnfun123
      MYSQL_DATABASE: aidxnfun
      MYSQL_USER: aidxnfun
      MYSQL_PASSWORD: iloveaidxnfun
    restart: unless-stopped
  phpmyadmin:
    image: phpmyadmin
    restart: always
    networks:
      aidxnfun-n:
        ipv4_address: 10.5.0.6
    ports:
      - 80:80
    environment:
      - PMA_ARBITRARY=1

networks:
  aidxnfun-n:
    external: true
    ipam:
      config:
        - subnet: 10.5.0.0/16
          gateway: 10.5.0.1
```

This can be used in conjunction with the example .env file compatible with this file:

```dotenv
DB_HOST="10.5.0.5"
DB_USER="root"
DB_PASSWORD="iloveaidxnfun123"
DB_NAME="aidxnfun"
```

This config will create a MariaDB instance, with a pre-created database, as long well as supplied user credentials. A PhpMyAdmin instance will additionally be spun up for easy management and inspection of the database. You may plug in `10.5.0.5` as the host on [your ip]:80 in your web browser (on the computer running Docker).

# Using the `manage` script
You may have noticed you have a `manage` file after cloning.
`manage` is a command-line tool to manage the server. It can automatically start, stop, and restart your instance.
This script only supports Linux-based systems.
First, you must complete the setup with the following commands:
```bash
chmod +x manage
./manage setup
```
After doing that, you are now ready to use the script.

Usage: `./manage [command] [options]`

## `manage` commands
+ `./manage up` - Builds the project and starts the server.
+ `./manage down` - Stops the server.
+ `./manage restart` - Restarts the server.
+ `./manage status, -s, --status` - Checks if the server is running.
+ `./manage help, -h, --help` - Shows the help message.

## `manage` options
+ `--db-alive` - Do not restart Docker services (database).

# To-Do
- [ ] Add database support
- [ ] Add view counter