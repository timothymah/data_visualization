function setup() {
  createCanvas(800, 600);
}

function draw() {
  let hr = hour();
  let min = minute();
  let nextHr = (hr + 1) % 24;

  background(225);
  drawFloors(hr, nextHr);
  drawStairs();
  drawStickman(min);
}

function drawFloors(currentHour, nextHour) {
  textSize(20); // Increased text size

  // Convert 24-hour format to 12-hour format and determine AM/PM
  let currentPeriod = currentHour >= 12 ? "PM" : "AM";
  currentHour = currentHour % 12;
  currentHour = currentHour === 0 ? 12 : currentHour; // Convert '0' to '12'

  // Display only the current hour
  text(currentHour + " " + currentPeriod, 50, 550); // Floor label for the current hour
}

function drawStairs() {
  let stairWidth = 100; // Width for each stair
  let stairHeight = 100; // Adjusted height of each stair

  let nextHr = (hour() + 1) % 24; // Calculate the next hour
  let nextPeriod = nextHr >= 12 ? "PM" : "AM";
  nextHr = nextHr % 12;
  nextHr = nextHr === 0 ? 12 : nextHr; // Convert '0' to '12' for display

  textSize(12); // Text size for minute markers

  for (let i = 0; i < 5; i++) {
    let x = 100 + i * stairWidth;
    let y = 550 - i * stairHeight;

    // Draw the stair step
    line(x, y, x + stairWidth, y);
    line(x + stairWidth, y, x + stairWidth, y - stairHeight);

    // Draw minute numbers and "min" label below each step
    if (i < 4) {
      for (let j = 1; j <= 3; j++) {
        let minutes = j * 5 + i * 15; // Minute marker
        text(minutes, x + j * (stairWidth / 4), y + 15); // Position minute number
        text("min", x + j * (stairWidth / 4), y + 30); // Position "min" text below the number
      }
    } else {
      // Label for the next hour's first step
      text(
        nextHr + " " + nextPeriod,
        x + stairWidth / 2 - 30,
        y - stairHeight / 2
      );
    }
  }
}

function drawStickman(minute) {
  let sec = second(); // Get the current seconds
  let stepNumber = floor(minute / 15);
  let stairWidth = 100; // Same width as used in drawStairs
  let stairHeight = 100; // Adjusted height as used in drawStairs

  // Calculate stickman's horizontal position based on the current minute
  let minuteProgress = minute % 15; // Progress in the current 15-min interval
  let progressRatio = minuteProgress / 15; // Ratio of progress within the interval

  // Adjust the stickman's position to move forward every minute, bounded to the stair width
  let x = 100 + stepNumber * stairWidth + progressRatio * (stairWidth - 40); // Adjust X position within the stair width
  let y = 550 - stepNumber * stairHeight - stairHeight / 2 - 20; // Adjust Y position to be above the steps

  // Stickman's body parts
  let headSize = 20;
  let bodyLength = 30;
  let armLength = 15;
  let legLength = 20;

  // Create a walking effect based on seconds
  let angle = (sin(frameCount * 0.1) * PI) / 4; // Arms and legs swing angle

  // Draw stickman
  ellipse(x, y, headSize, headSize); // Head
  line(x, y + headSize / 2, x, y + headSize / 2 + bodyLength); // Body

  // Arms
  line(
    x,
    y + headSize / 2 + 10,
    x + armLength * cos(angle),
    y + armLength * sin(angle) + 20
  );
  line(
    x,
    y + headSize / 2 + 10,
    x - armLength * cos(angle),
    y - armLength * sin(angle) + 20
  );

  // Legs
  line(
    x,
    y + headSize / 2 + bodyLength,
    x + legLength * cos(-angle),
    y + legLength * sin(-angle) + 50
  );
  line(
    x,
    y + headSize / 2 + bodyLength,
    x - legLength * cos(-angle),
    y - legLength * sin(-angle) + 50
  );

  // Seconds as text on the head
  textSize(10);
  text(sec, x - 5, y + 4);
}
