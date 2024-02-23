// Settings
import {
  snailMinSpeed,
  snailMaxSpeed,
  snailInterval,
  snails,
  CountdownTime,
  countdownMaximumTime,
  countdownMinimumTime,
  countdownSound,
} from './settings.js';

// Load Ræs når siden er loadet
window.onload = () => {
  LoadRace();
};

// HTML elementer
const startButton = document.querySelector('#startknap');
const htmlFinishLine = document.querySelector('.finish');
const racetrack = document.querySelector('#raceway');
const countdown = document.querySelector('#countdown');

// indstillinger
const settings = document.querySelector('#settings i');
const settingsContainer = document.querySelector('#settings');
const settingsModal = document.querySelector('#settings-modal');
const settingsClose = document.querySelector('#settings-close');

// Countdown Variabler
var countdownAudio = new Audio(`./sounds/${countdownSound}`); // Lyd til nedtælling
var music = new Audio('./sounds/music.ogg'); // Baggrundsmusik

// Variabler
let winner = '';
let finishLine;

// Data Variabler
let globalAverageSpeed = 0; // Calculate average speed for all snails
let globalAverageTimeLeft = 0; // Calculate average time left for all snails based on speed and distance left

// Event Listeners
startButton.addEventListener('click', StartRace);

// Indstillinger
settingsContainer.addEventListener('click', () => {
  console.log('Settings clicked');

  settingsModal.showModal();
  loadModalSettings();
});

settingsClose.addEventListener('click', (e) => {
  e.preventDefault();
  settingsModal.close();
});

// Funktioner

/*
 * LoadModalSettings
 * Load alle settings fra settings.js ind i modalen i korrekte input felt.
 * @return void
 * @throws Error - Hvis funktionen ikke er implementeret
 */

function loadModalSettings() {
  // TODO: Load alle settings fra settings.js ind i modalen i korrekte input felt.
  throw new Error('Not implemented');
}

/*
 * LoadRace
 * Load ræset ved at hente snegle og vise dem på skærmen
 * @return void
 */
function LoadRace() {
  htmlFinishLine.style.height = snails.length * 100 + 50 + 'px'; // Sæt højden på målstregen baseret på antal snegle

  // Hent snegle
  let snailList = '';
  startButton.disabled = false;

  // Vis snegle
  for (let i = 0; i < snails.length; i++) {
    snailList += `
      <div class="snail" id="snail${snails[i].id}" style="top:${
      i * 100
    }px;" name="${snails[i].name}">
      <h3 class="snail-text">${snails[i].name}</h3>
        <img src="../../Snegle/${snails[i].image}" alt="${snails[i].name}">
      </div>`; // Vi bruger en template string for at indsætte variabler i HTML (Også kendt som string interpolation)
    // Vi bruger også en attribute til at gemme sneglens navn, så vi kan bruge det til at melde vinderen
  }

  racetrack.innerHTML = snailList;
}

/*
 * ResetRace
 * Reset ræset ved at sætte snegle til start position og nulstille variabler
 * @return void
 */
function ResetRace() {
  music.currentTime = 0;
  countdownAudio.currentTime = 0;
  startButton.disabled = false;
  countdown.style.display = 'none';
  winner = '';
  finishLine = htmlFinishLine.offsetLeft - 150; // -150 fordi snegle er 150px brede, og den når halvt over målstregen ellers
  snails.forEach((snail, i) => {
    document.querySelector(`#snail${snails[i].id}`).style.left = '0px';
  });
  RemoveAttributesFromSnail();
  AddAttributesToSnail();
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

  RemoveAttributesFromSnail();
  AddAttributesToSnail();

  winner = '';
  finishLine = htmlFinishLine.offsetLeft - 150; // -150 fordi snegle er 150px brede, og den når halvt over målstregen ellers

  // Opret config
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
  });
}

/*
 * Fjern attributter fra snegle
 * Fjern attributter fra snegle for at rydde op efter ræset
 * @return void
 */
function RemoveAttributesFromSnail() {
  snails.forEach((snail) => {
    delete snail.finished;
    delete snail.distance;
    delete snail.averageSpeed;
    delete snail.topSpeed;
    delete snail.minSpeed;
  });
}

/*
 * Start ræset
 * Start ræset ved at flytte snegle
 * @return void
 */
async function StartRace() {
  ResetRace();
  startButton.disabled = true;
  ConfigureRace();
  // Hvis nedtællingstiden er sat, start en nedtælling
  if (CountdownTime > 0) {
    let tempCountdown = CountdownTime;
    if (tempCountdown < countdownMinimumTime) {
      tempCountdown = countdownMinimumTime;
    }
    if (tempCountdown > countdownMaximumTime) {
      tempCountdown = countdownMaximumTime;
    }
    await Countdown(tempCountdown);
  }
  MoveSnail();
}

/*
 * Nedtælling
 * Start en nedtælling før ræset starter
 * @param {number} count - Antal sekunder nedtællingen skal vare
 * @return {Promise} - Promise der resolver når nedtællingen er færdig
 */
function Countdown(count) {
  // Reset nedtælling
  countdown.style.display = 'flex';
  // Fjern vigtig tekst fra nedtælling
  countdown.classList.remove('important-text');
  countdown.innerHTML = count;

  return new Promise((resolve) => {
    let interval = setInterval(() => {
      if (count === 3) {
        countdownAudio.play();
      }
      if (count === 0) {
        countdown.innerHTML = 'Fight!';
        countdown.classList.add('important-text');
        setTimeout(() => {
          countdownAudio.pause();

          clearInterval(interval);
          resolve();
          countdown.style.display = 'none';
        }, 2000);
      } else {
        countdown.innerHTML = count;
        count--;
      }
    }, 1000);
  });
}

/*
 * Flyt snegle
 * Flyt snegle til højre, og stop når de når slutningen af skærmen
 * @return void
 */
function MoveSnail() {
  let snailElements = Array.from(document.querySelectorAll('.snail'));
  let snailFinished = false; // Boolean for at holde styr på om en snegl er færdig
  music.play(); // Start baggrundsmusik

  let interval = setInterval(() => {
    // Tilfældiggør rækkefølgen af snegle
    snailElements.sort(() => Math.random() - 0.5);

    snailElements.forEach((snailElement) => {
      if (snailFinished) {
        // Hvis en snegl er færdig, stop ræset
        clearInterval(interval);
        return;
      }

      // 50% chance for at sneglen skal flytte sig
      if (Math.random() > 0.5) {
        let position = parseInt(snailElement.style.left) || 0;
        position +=
          Math.floor(Math.random() * (snailMaxSpeed - snailMinSpeed + 1)) +
          snailMinSpeed;
        snailElement.style.left = `${position}px`;
      }

      if (parseInt(snailElement.style.left) >= finishLine) {
        // Hvis en snegl krydser målstregen, stop ræset
        clearInterval(interval);
        snailFinished = true;
        console.log('Snail finished: ', snailElement.attributes.name.value);

        // Lav en event listener for at vente på at transitionen er færdig
        let transitionEndHandler = () => {
          console.log('Transition ended: ', snailElement.attributes.name.value);
          DeclareWinner(snailElement.attributes.name.value); // Vis vinder
          snailElement.removeEventListener(
            'transitionend',
            transitionEndHandler
          ); // Fjern event listener for at undgå at kalde funktionen flere gange
        };

        snailElement.addEventListener('transitionend', transitionEndHandler);
      }
    });
  }, snailInterval * 1000);
}

/*
 * DeclareWinner
 * Vis en alert med vinderen af ræset
 * @param {string} snail - Navn på snegl der vandt
 * @return void
 */
function DeclareWinner(snail) {
  console.log('Vinderen er: ', snail);
  winner = snails.find((s) => s.name === snail); // Find snegl baseret på navn, for at få alt data om sneglen
  alert(`Vinderen er ${winner.name}!`); // Vis vinderen i en alert
  // TODO: ^^ Skift til at vise vinderen i UI med sound effect, konfetti osv.
  music.pause(); // Stop baggrundsmusik
  ResetRace(); // Reset ræset
}

// TODO: Implementer en funktion til at beregne gennemsnitshastighed og gennemsnitstid tilbage
// TODO: Tilføj data analysering til ræset
