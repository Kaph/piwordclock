# About
Resources to create a Neopixel/WS281x Wordclock using a Raspberry Pi, Node.js and WS281x LED strips. This project can easily be extended to provide additional functuality such as a web configuration utility or use information from other APIs.

The basic premise is the same regardless of what 'words' you want to use - you could personalise it to include birthdays, reminders, chores, weather or anything else.


# Setup

### Clock
You need to create your wordclock. Included is the stencil/baffle plate ready for laser cutting - it's on a P2 size canvas from www.razorlab.com and easily ordered. I had it cut on Plywood. 

The stencil has letters on a grid of 1.67cm - coincidentally the gap between WS281x/Neopixel strips at 60LEDs/m. 

### Raspberry Pi

You need to have Node/NPM installed.

1. Create your project folder.
2. Install dependencies
   ```npm install```
3. You can then start the clock, though it needs root privileges to use the GPIO pins ```sudo node wordclock.js```
3. If you want to run it in the background, then use PM2:
  ```npm install pm2 -g```
4. Because we're interfacing with the GPIO pins the script needs to run with root privileges.
  ```sudo pm2 start wordclock.js```








