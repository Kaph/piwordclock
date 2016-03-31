var neopixels = require('rpi-ws281x-native')
// Variable setup
// Setting up which led numbers on the strip correspond with which words.
// Each word has a 'begin' and an 'end' led number
// The leds numbers start from 1 and go to 110, in order from left -> right & top -> bottom
var itIsLeds = [[1,2],  [4,5]]
var descLeds = [[43,44], [45,48], [105,110]] // to, past, o'clock
// Minutes in time order (five, ten, quarter, twenty, half). Twenty five can just be amalgamated from twenty and five.
var minutesLeds = [[29,32], [39,41], [14,20], [23,28], [34,37]]
// Hours in sequential time order.
var hoursLeds = [[56,58], [75,77], [62,66], [67,70], [71,74], [59,61], [89,93], [78,82], [52,55], [100,102], [83,88], [94,99]]

var NUM_LEDS = 110
var pixelData = new Uint32Array(110)

neopixels.init(NUM_LEDS)

// Main loop function
var loop = setInterval(function(){
  parseTime(getTime())
}, 10000)

function getTime() {
  // Get the current time.
  var currentTime = new Date()
  console.log(currentTime)
  var hour = currentTime.getHours()
  var minute = currentTime.getMinutes()

  //console.log("Time in hours: " + hour + ". Time in minutes: " + minute + ".")

  // Round to the nearest five minutes.
  var coeff = 1000 * 60 * 5; // Five minutes in ms
  var rounded = new Date(Math.round(currentTime.getTime() / coeff) * coeff) // Magic

  //console.log("Current hours: " + rounded.getHours() + ". Current minutes: " + rounded.getMinutes())

  return [rounded.getHours(), rounded.getMinutes()]

}


function parseTime(currentTime) {
  // Because we're calling currentTime and it returns an array of hour/minute - it is expected that parseTime will receive an array.
  // [hour, minute]
  var hour = currentTime[0]
  var minute = currentTime[1]

  var currentWords = []

  // Turn on 'IT IS'
  currentWords.push(itIsLeds[0], itIsLeds[1])

  // Find out if we need to display to the hour, past the hour, or O'Clock.
  if (minute == 0) {
    currentWords.push(descLeds[2])
  } else if (minute <= 30) { // Check if time is TO/PAST. May need minute parsed first to segment.
    currentWords.push(descLeds[1])
  } else if (minute > 30) {
    currentWords.push(descLeds[0])
    // We're now 'to' the hour, so increment the hour
    hour++
  }

  // Must be a better way to do this than persistent if-elses.
  // Correspond minute to appropriate word
  if (minute == 5 || minute == 55) {
    currentWords.push(minutesLeds[0])
  } else if (minute == 10 || minute == 50) {
    currentWords.push(minutesLeds[1])
  } else if (minute == 15 || minute == 45) {
    currentWords.push(minutesLeds[2])
  } else if (minute == 20 || minute == 40) {
    currentWords.push(minutesLeds[3])
  } else if (minute == 25 || minute == 35) {
    currentWords.push(minutesLeds[3], minutesLeds[0])
  } else if (minute == 30) {
    currentWords.push(minutesLeds[4])
  }

  // We need to parse the hour too. Tedious.
  if (hour == 0 || hour == 12) {
      currentWords.push(hoursLeds[11])
  } else if (hour == 1 || hour == 13) {
      currentWords.push(hoursLeds[0])
  } else if (hour == 2 || hour == 14) {
      currentWords.push(hoursLeds[1])
  } else if (hour == 3 || hour == 15) {
      currentWords.push(hoursLeds[2])
  } else if (hour == 4 || hour == 16) {
      currentWords.push(hoursLeds[3])
  } else if (hour == 5 || hour == 17) {
      currentWords.push(hoursLeds[4])
  } else if (hour == 6 || hour == 18) {
      currentWords.push(hoursLeds[5])
  } else if (hour == 7 || hour == 19) {
      currentWords.push(hoursLeds[6])
  } else if (hour == 8 || hour == 20) {
      currentWords.push(hoursLeds[7])
  } else if (hour == 9 || hour == 21) {
      currentWords.push(hoursLeds[8])
  } else if (hour == 10 || hour == 22) {
      currentWords.push(hoursLeds[9])
  } else if (hour == 11 || hour == 23) {
      currentWords.push(hoursLeds[10])
  }

  // Let's turn the leds on
  turnOnLeds(currentWords)
}


function turnOnLeds(words) {
  // When turnonLeds is called it will receive an array of all the
  // leds corresponding with words to be lit



  // Turn on all not-in-use LEDs as a 'background' - uncomment below to enable
  //for (var i=0; i<NUM_LEDS; i++) {
  //  pixelData[i] = rgb2Int(50, 50, 100)
  //}

  // Turn on the leds given in an array.
  var l = words.length
  for (var i=0; i<l; i++) {
    // For each word in the array
    var beginLed = words[i][0]
    var endLed = words[i][1]
    for (var q = beginLed; q <= endLed; q++) {
      // We've named the pixels as index-1, but we're using an array which is index-0 and so we need to adjust
      pixelData[q-1] = rgb2Int(230, 170, 80)
    }
  }

  // Render to the strip
  neopixels.render(pixelData)

  // Reset the array (so we don't just keep turning on all the LEDs)
  pixelData = new Uint32Array(110)
}

// This is taken from the rainbow.js example in rpi-ws281x-native
function rgb2Int(r, g, b) {
  return ((r & 0xff) << 16) + ((g & 0xff) << 8) + (b & 0xff);
}
