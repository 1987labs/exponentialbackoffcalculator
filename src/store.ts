import { derived, writable } from "svelte/store";
export const initialInterval = writable(1);
export const maxRetries = writable(5);
export const exponentialFactor = writable(1.1);
export const totalTime = derived([initialInterval, maxRetries, exponentialFactor], ([$initialInterval, $maxRetries, $exponentialFactor]) => {
  let totalTime = 0;
  for (let count = 0; count < $maxRetries; count++) {
    totalTime += $initialInterval * Math.pow($exponentialFactor, count)
  }
  return totalTime;
})
export const maxBackoffTime = derived([initialInterval, maxRetries, exponentialFactor], ([$initialInterval, $maxRetries, $exponentialFactor]) => {
  return $initialInterval * Math.pow($exponentialFactor, $maxRetries)
})
