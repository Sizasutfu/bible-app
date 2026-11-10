// src/data/tutorial.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = '@bible:tutorialSeen';

export async function hasSeenTutorial(): Promise<boolean> {
  try {
    return (await AsyncStorage.getItem(KEY)) === '1';
  } catch {
    return false;
  }
}

export async function markTutorialSeen(): Promise<void> {
  try {
    await AsyncStorage.setItem(KEY, '1');
  } catch {
    // best-effort — no reason to crash if storage fails
  }
}