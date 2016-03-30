# About
Resources to create a Neopixel/WS281x Wordclock using a Raspberry Pi, Node.js and WS281x LED strips. I'm not convinced Node.js is the best tool for this and the use of the 'sleep' package to contort it into a more microcontroller like loop with a npm sleep package seems cheeky - but it currently works. 


# Setup

## Clock
You need to create your wordclock. Included is the stencil/baffle plate ready for laser cutting - it's on a P2 size canvas from www.razorlab.com and easily ordered. I had it cut on Plywood. 

The stencil has letters on a grid of 1.67cm - coincidentally the gap between WS281x/Neopixel strips at 60LEDs/m. 

## Raspberry Pi

You need to have Node/NPM installed.

1. Create your project folder.
2. Install rpi-ws281x-native and sleep
   ```npm install sleep```
   ```npm install rpi-ws281x-native```
3. You can then start the clock, though it needs root privileges to use the GPIO pins ```sudo node wordclock.js```
3. If you want to run it in the background, then use PM2:
  ```npm install pm2 -g```
4. Because we're interfacing with the GPIO pins the script needs to run with root privileges.
  ```sudo pm2 start wordclock.js```








