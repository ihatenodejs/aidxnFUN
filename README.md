# aidxnFUNbeta
The beta version of my website, before it's pushed into production.
Built with Tailwind CSS, EJS, ExpressJS, and NodeJS for a backend for it all.
This is a more modern version of design.

This repo may be archived at times due to me not needing a new design or extra features.

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