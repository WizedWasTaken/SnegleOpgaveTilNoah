/*
 * Indstillinger til snegle ræset. Bare en "opbevarings plads" for konstanter og snegle.
 * Alt kan ændres i UI, default værdier på opstart konfigureres her.
 */

export const snailMinSpeed = 15;
export const snailMaxSpeed = 30;
export const snailInterval = 0.2;
export let CountdownTime = 3; // Sæt til 0 for at slå countdown fra
export const countdownMinimumTime = 3;
export const countdownMaximumTime = 10;

export let dataContainerSettings = {
  shown: false,
};

// Snegle
export let snails = [
  {
    id: 1, // Unik id
    name: 'Snegl 1', // Navn på snegl
    image: 'snegl1.png', // Billede af snegl
  },
  {
    id: 2,
    name: 'Snegl 2',
    image: 'snegl2.png',
  },
  {
    id: 3,
    name: 'Snegl 3',
    image: 'snegl3.png',
  },
  {
    id: 4,
    name: 'Snegl 4',
    image: 'snegl4.png',
  },
];
