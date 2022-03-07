import { writable } from "svelte/store";
export const initialInterval = writable(1);
export const maxRetries = writable(5);
export const exponentialFactor = writable(1.1);

