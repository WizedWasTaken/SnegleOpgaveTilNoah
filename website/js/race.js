import {
  snailMinSpeed,
  snailMaxSpeed,
  snailInterval,
  snails,
} from './settings.js';

// Load Ræs når siden er loadet
window.onload = LoadRace;

// HTML elementer
const startButton = document.querySelector('#startknap');
const htmlFinishLine = document.querySelector('.finish');

// Variabler
let winner = '';
let finishLine;
console.log(finishLine);

// Data Variabler
let globalAverageSpeed = 0; // Calculate average speed for all snails
let globalAverageTimeLeft = 0; // Calculate average time left for all snails based on speed and distance left

// Event Listeners
startButton.addEventListener('click', LoadRace);

// Funktioner

function LoadRace() {
  // Hent snegle
  let racetrack = document.querySelector('#raceway');
  let snailList = '';
  startButton.disabled = true;

  // Vis snegle
  for (let i = 0; i < snails.length; i++) {
    snailList += `
      <div class="snail" id="snail${snails[i].id}" style="top:${
      i * 100
    }px;" name="${snails[i].name}">
      <h3 class="snail-text">${snails[i].name}</h3>
        <img src="../../Snegle/${snails[i].image}" alt="${snails[i].name}">
      </div>`;
  }

  racetrack.innerHTML = snailList;

  // Start Ræs
  StartRace();
}

/*
* Konfigurer ræset
* Reset snegle, og sæt dem til start position
* Sæt variabler til start værdier

* @return void
*/
function ConfigureRace() {
  // Reset snegle
  for (let i = 0; i < snails.length; i++) {
    document.querySelector(`#snail${snails[i].id}`).style.left = '0px';
  }

  AddAttributesToSnail();

  winner = '';
  finishLine = htmlFinishLine.offsetLeft - 150; // -150 fordi snegle er 150px brede, og den når halvt over målstregen ellers

  // Config
  snails.forEach((snail, i) => {
    snail.speed = Math.floor(Math.random() * snailMaxSpeed) + snailMinSpeed;
    snail.position = 0;
  });
}

/*
 * Tilføj attributter til snegle
 * Tilføj attributter til snegle for at holde styr på deres position og hastighed.
 * @return void
 */
function AddAttributesToSnail() {
  snails.forEach((snail) => {
    snail.finished = false;
    snail.distance = 0;
    snail.averageSpeed = 0;
    snail.topSpeed = 0;
    snail.minSpeed = 0;
    console.log(snail);
  });
}

/*
 * Start ræset
 * Start ræset ved at flytte snegle
 * @return void
 */
function StartRace() {
  ConfigureRace();

  MoveSnail();
}

/*
 * Flyt snegle
 * Flyt snegle til højre, og stop når de når slutningen af skærmen
 * @return void
 */
function MoveSnail() {
  let snailElements = document.querySelectorAll('.snail');
  let snailFinished = false; // Boolean til at stoppe ræset hvis en snegl er færdig

  snailElements.forEach((snailElement) => {
    console.dir(snailElement);
    let position = 0;

    let interval = setInterval(() => {
      if (snailFinished) {
        // Hvis en snegl kom over målstregen, stop ræset
        clearInterval(interval);
        return;
      }
      position +=
        Math.floor(Math.random() * (snailMaxSpeed - snailMinSpeed + 1)) +
        snailMinSpeed;
      snailElement.style.left = `${position}px`;

      if (position >= finishLine) {
        // Hvis sneglen er færdig, stop ræset
        clearInterval(interval);
        snailFinished = true;
        snailElement.addEventListener('transitionend', () => {
          DeclareWinner(snailElement.attributes.name.value); // Vi gemmer sneglens navn i en attribute i HTML elementet, så vi kan hente det her og bruge det til at melde vinderen
        });
      }
    }, snailInterval * 1000);
  });
}

// DeclareWinner('snail1');
function DeclareWinner(snail) {
  console.log(snail);
  let winner = snails.find((s) => s.name === snail);
  console.log(winner);
  alert(`Vinderen er ${winner.name}!`);
  startButton.disabled = false;
}
