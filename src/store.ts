import { derived, writable } from "svelte/store";
export const initialInterval = writable(1);
export const maxRetries = writable(5);
export const exponentialFactor = writable(1.1);
// export const totalTime = derived([initialInterval, maxRetries, exponentialFactor], ([$initialInterval, $maxRetries, $exponentialFactor]) => {
//   let totalTime = 0;
//   for (let i = 0; i < $maxRetries; i++) {
//     totalTime += $initialInterval * Math.pow($exponentialFactor, i)
//   }
//   return totalTime;
// })
