// Snegle
const snails = [
  {
    id: 1,
    name: "Snail 1",
    image: "snegl1.png",
  },
  {
    id: 2,
    name: "Snail 2",
    image: "snegl2.png",
  },
  {
    id: 3,
    name: "Snail 3",
    image: "snegl3.png",
  },
  {
    id: 4,
    name: "Snail 4",
    image: "snegl4.png",
  },
];

window.onload = LoadRace;

let winner = "";
let finishLine = window.innerWidth;

// Integers
let snailMinSpeed = 1;
let snailMaxSpeed = 5;
let snailInterval = 0.2; // Interval mellem hver gang sneglen flytter sig.

// Funktioner

function LoadRace() {
  // Hent snegle
  let racetrack = document.getElementById("raceway");
  let snailList = "";

  // Vis snegle
  for (let i = 0; i < snails.length; i++) {
    snailList += `
      <div class="snail" id="snail${snails[i].id}" style="top:${i * 100}px;">
        <img src="../../Snegle/${snails[i].image}" alt="${snails[i].name}">
      </div>`;
  }

  racetrack.innerHTML = snailList;

  // Start Ræs
  StartRace();
}

function ConfigureRace() {
  // Reset snegle
  for (let i = 0; i < snails.length; i++) {
    document.getElementById(`snail${snails[i].id}`).style.left = "0px";
  }

  winner = "";
  finishLine = window.innerWidth;

  // Config
  snails.forEach((snail, i) => {
    snail.speed = Math.floor(Math.random() * snailMaxSpeed) + snailMinSpeed;
    snail.position = 0;
  });
}

// Samling af funktioner
function StartRace() {
  ConfigureRace();

  MoveSnail();
}

// Flyt snegle live.
function MoveSnail() {
  let snailElements = document.querySelectorAll(".snail");

  snailElements.forEach((snailElement) => {
    let position = 0;

    let interval = setInterval(() => {
      position +=
        Math.floor(Math.random() * (snailMaxSpeed - snailMinSpeed + 1)) +
        snailMinSpeed;
      snailElement.style.left = `${position}px`;

      if (position >= window.innerWidth) {
        clearInterval(interval);
      }
    }, snailInterval * 1000);
  });
}
