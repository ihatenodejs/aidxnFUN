# aidxnFUN

[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)
[![Latest Release](https://img.shields.io/badge/latest_version-v.1.40-purple)](https://github.com/ihatenodejs/aidxnFUN/releases)

<a href="https://512kb.club"><img src="https://512kb.club/assets/images/orange-team.svg" alt="a proud member of the orange team of 512KB club" /></a>

The full code of my website, under the CC0-1.0 license (public domain). Built with Tailwind CSS, EJS, Express.js, and Node.js

## Install and self-host

Have a weird obsession? Want a pre-built site you can use for free? Host aidxnFUN! As the code is available under the CC0-1.0 license, which means you should feel free and encouraged to change content, design, whatever!

During this process, `node` (20.08.0), `npm`, and `netcat` will be installed. If you use Windows, you must manually install Node.js.

**Please note:** The /status endpoint will be broken with default servers (ones I own) as CORS will block requests not made from aidxn.fun

### Debian/Ubuntu/Arch Linux

1. Clone the repo
   ```bash
   git clone https://github.com/ihatenodejs/aidxnFUN
   cd aidxnFUN
   ```

2. Setup `manage` (installs everything you need)

   ```bash
   ./manage setup
   ```

3. Start the server

   ```bash
   ./manage up
   ```

   A server will now start on port :5566, and be accessible from your web browser at http://localhost:5566/. I highly suggest creating a NGINX reverse proxy for this, especially if you plan to point this to a domain.

### Windows

Windows-based hosts are only partially supported. I have no plans to write a script for Windows as of now, though that may change in the future, based on demand. However, `package.json` have bundled scripts to allow hosting on Windows. If you plan to host this website, I **STRONGLY** recommend that you use Linux.

**Windows hosting has not been tested in a while, and may not work perfectly.**

1. Install Node.js and NPM (or Bun) for Windows from [Node.js.org](https://nodejs.org/) or [bun.sh](https://bun.sh/)

2. Open a Node.js command prompt

3. Clone the repo

   ```bat
   git clone https://github.com/ihatenodejs/aidxnFUN
   cd aidxnFUN
   ```
   
4. Build the app

   **Bun**

   ```bat
   bun run build:win:bun
   ```
   
   **NPM**
    
   ```bat
   npm run build:win:npm   
   ```

5. Run the app

   **Bun**

   ```bat
   set PORT=5566 && bun run start:win:bun
   ```
   
   **NPM**
   
   ```bat
   set PORT=5566 && npm run start:win:npm
   ```
   
   You may use the `PORT` variable to set a custom port. While Windows tends to default to 3000, we will use 5566, which is the default for aidxnFUN on Linux.

## How it works

### Stack/Technical Stuff

This website uses Node.js, Express.js, EJS for templating, and Tailwind CSS.

The `manage` script uses all of those tools to manage the server for you executes the repetitive tasks for you automatically.

The views contain both regular page shards (full-ish pages) and generic shards (fragments of pages, widgets, etc.). I define a "shard" as an EJS template, which are pieced together into a pretty little website. The shards hold individual elements like music widgets, while a regular page shard is the page that contains the music widget, which the end user sees. This is helpful for understanding the code.

Thus far, shards are included for a music widget, the header, and the footer of the pages.

### Music

Music (as featured on the home page) is fetched from an API (hosted on https://biancarosa.com.br), which I am in the process of setting up for myself. It works with a LastFM account (I linked this to my Spotify) and can track your live listening with amazing accuracy. The repo can be found at [biancarosa/lastfm-last-played](https://github.com/biancarosa/lastfm-last-played).

I'm in the process of migrating this project over to MusicBrainz.

## Using the `manage` script

You may have noticed you have a `manage` file after cloning. `manage` is a command-line tool to manage the server. It can automatically start, stop, and restart your instance. This script only supports Linux-based systems.

First, you must complete the setup with the following commands:
```bash
chmod +x manage
./manage setup
```

After doing that, you are now ready to use the script.

### `manage` usage
`./manage [command] [options]`

### `manage` commands
+ `./manage up` - Builds the project and starts the server
+ `./manage down` - Stops the server
+ `./manage restart` - Restarts the server
+ `./manage status, -s, --status` - Checks if the server is running
+ `./manage help, -h, --help` - Shows the help message

## Troubleshooting

I highly suggest you take a peek at the `node.log` file's contents. It's in the same directory as the `manage` script. This file contains the Node.js server logs, which can be very helpful for debugging and/or troubleshooting.

## To-Do

- [ ] Add instructions for setting up without `manage`
- [ ] Fix spacing issues with footer (not the same size across pages)
- [ ] Fix status tracking and add tracking for latest servers
- [X] Improve dropdown menu style
- [X] Restructure menu with dropdowns
- [X] Implement PGP message verification
- [X] Add menu link to tilde website
- [X] Update projects page to latest information
