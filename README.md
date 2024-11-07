# aidxnFUN
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fihatenodejs%2FaidxnFUN.svg?type=shield&issueType=license)](https://app.fossa.com/projects/git%2Bgithub.com%2Fihatenodejs%2FaidxnFUN?ref=badge_shield&issueType=license)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fihatenodejs%2FaidxnFUN.svg?type=shield&issueType=security)](https://app.fossa.com/projects/git%2Bgithub.com%2Fihatenodejs%2FaidxnFUN?ref=badge_shield&issueType=security)

Built with Tailwind CSS, EJS, Express.js, and Node.js for a backend for it all.
This is a more modern version of design.
This project is released under the CC0-1.0 license. The code and content are in the public domain.

# Install and self-host
Have a weird obsession? Want a pre-built site you can use for free? Host aidxnFUN!
As the code is available under the CC0-1.0 license, which means you should feel free and encouraged to change content, design, whatever!
During this process, `node` (20.08.0), `npm`, and `netcat` will be installed on your computer.

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
   A server will now start on port :5566, and be accessible from your web browser at http://localhost:5566/. I highly suggest creating a NGINX reverse proxy for this, especially if you plan to point this to a domain.

## Windows
Windows support is still in the works, however it is possible to run aidxnFUN under Windows.

1. Install NodeJS and NPM for Windows from [nodejs.org](https://nodejs.org/)
2. Open a Node.js command prompt
3. Clone the repo
   ```bat
   git clone https://github.com/ihatenodejs/aidxnFUN
   cd aidxnFUN
   ```
4. Build the app
   ```bat
   npm run winbuild
   ```
5. Run the app on port 5566
   You may use the `PORT` variable to set a custom port. While Windows tends to default to 3000, we will use 5566, which is the default for aidxnFUN on Linux.
   ```bat
   set PORT=5566 && node app.js
   ```

# How it works
This website uses Node.js, Express.js for a server, EJS for templating, and Tailwind CSS for the frontend CSS.
The `manage` script uses all of those tools to manage the server for you executes the repetitive tasks for you automatically.
The views contain both regular page shards (full-ish pages) and generic shards (fragments of pages, widgets, etc.). I define a "shard" as an EJS template, which are pieced together into a pretty little website. The shards hold individual elements like music widgets, while a regular page shard is the page that contains the music widget, which the end user sees. This is helpful for understanding the code.

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

## `manage` usage
`./manage [command] [options]`

## `manage` commands
+ `./manage up` - Builds the project and starts the server.
+ `./manage down` - Stops the server.
+ `./manage restart` - Restarts the server.
+ `./manage status, -s, --status` - Checks if the server is running.
+ `./manage help, -h, --help` - Shows the help message.

# Troubleshooting
I highly suggest you take a peek at the `node.log` file's contents. It's in the same directory as the `manage` script. This file contains the NodeJS server logs, which can be very helpful for debugging and/or troubleshooting.

# To-Do
- [ ] Implement PGP message verification
- [X] Add menu link to tilde website
- [X] Update projects page to latest information

# License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fihatenodejs%2FaidxnFUN.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fihatenodejs%2FaidxnFUN?ref=badge_large)
