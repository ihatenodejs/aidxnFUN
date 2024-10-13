# aidxnFUN
Built with Tailwind CSS, EJS, ExpressJS, and NodeJS for a backend for it all.
This is a more modern version of design.

This repo may be archived at times due to me not needing a new design or extra features.

# Install and self host
Have a weird obsession? Want a pre-built site you can use for free? Host aidxnFUN!
As the code is avaliable under the CC Zero license, which means you should feel free and encouraged to change content, design, whatever!
During this process, `screen`, `node` (20.08.0,

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
3. Start the server
   ```bash
   ./manage up
   ```
   A server will now start on port :3000, and be accessable from your web browser at http://localhost:3000/

## Windows
Windows is currently not supported by aidxnFUN yet. I suggest you use WSL, and follow the Linux instructions, or purchase a server.

# How it works
This website uses NodeJS, ExpressJS for a server, EJS for templating, and Tailwind CSS for the frontend CSS.
The `manage` script uses all of those tools to manage the server for you executes the repetitive tasks for you automatically.
The views contain both regular page shards (full HTML documents) and generic shards. I define a "shard" as an EJS template, and are put together into a pretty little website at the end.

Thus far, shards are included for a music widget, the header, and the footer of the pages.

Music (as featured on the home page) is fetched from an API (hosted on https://biancarosa.com.br), which I am in the process of setting up for myself. It works with a LastFM account (I linked this to my Spotify) and can track your live listening with amazing accuracy. The repo can be found at [biancarosa/lastfm-last-played](https://github.com/biancarosa/lastfm-last-played).

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

# Common `manage` commands
+ **Start Server:** `./manage up`
+ **Stop Server:** `./manage down`
+ **Restart Server:** `./manage restart`
+ **Help:** `./manage help`
