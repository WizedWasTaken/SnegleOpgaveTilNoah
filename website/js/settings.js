/*
 * Indstillinger til snegle ræset. Bare en "opbevarings plads" for konstanter og snegle.
 * Alt kan ændres i UI, default værdier på opstart konfigureres her.
 */

// Snail Speed
export const snailMinSpeed = 15;
export const snailMaxSpeed = 30;
export const snailInterval = 0.2;

// Countdown
export let CountdownTime = 5; // Sæt til 0 for at slå countdown fra
export const countdownSound = "321fight.ogg";
export const countdownMinimumTime = 3;
export const countdownMaximumTime = 10;

export let dataContainerSettings = {
  shown: false,
};

// Snegle
export let snails = [
  {
    id: 1, // Unik id
    name: "Snegl 1", // Navn på snegl
    image: "snegl1.png", // Billede af snegl
    active: true, // Om sneglen er aktiv
  },
  {
    id: 2,
    name: "Kenneth",
    image: "snegl2.png",
    active: true,
  },
  {
    id: 3,
    name: "Snegl 3",
    image: "snegl3.png",
    active: true,
  },
  {
    id: 4,
    name: "Snegl 4",
    image: "snegl4.png",
    active: true,
  },
];
