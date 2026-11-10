// src/data/highlights.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = '@bible:highlights';

export type HighlightColor = 'yellow' | 'green' | 'blue' | 'pink' | 'orange';

// Muted tones that read well on the cream bg. Not neon.
export const HIGHLIGHT_COLORS: Record<HighlightColor, string> = {
  yellow: '#fef3c7',
  green:  '#dcfce7',
  blue:   '#dbeafe',
  pink:   '#fce7f3',
  orange: '#fed7aa',
};

export type Highlight = {
  bookId: string;
  chapter: number;
  verse: number;
  color: HighlightColor;
  createdAt: number;
};

function key(b: { bookId: string; chapter: number; verse: number }) {
  return `${b.bookId}:${b.chapter}:${b.verse}`;
}

let cache: Highlight[] | null = null;
const listeners = new Set<(h: Highlight[]) => void>();

async function load(): Promise<Highlight[]> {
  if (cache) return cache;
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    cache = raw ? JSON.parse(raw) : [];
  } catch {
    cache = [];
  }
  return cache!;
}

async function save(next: Highlight[]) {
  cache = next;
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  listeners.forEach((fn) => fn(next));
}

export function useHighlights() {
  const [highlights, setHighlights] = useState<Highlight[]>(cache ?? []);
  const [ready, setReady] = useState(!!cache);

  useEffect(() => {
    let cancelled = false;
    load().then((h) => {
      if (!cancelled) {
        setHighlights(h);
        setReady(true);
      }
    });
    const listener = (h: Highlight[]) => setHighlights(h);
    listeners.add(listener);
    return () => {
      cancelled = true;
      listeners.delete(listener);
    };
  }, []);

  const setHighlight = useCallback(
    async (
      b: { bookId: string; chapter: number; verse: number },
      color: HighlightColor
    ) => {
      const current = await load();
      const id = key(b);
      // One highlight per verse — replace if exists
      const without = current.filter((x) => key(x) !== id);
      await save([{ ...b, color, createdAt: Date.now() }, ...without]);
    },
    []
  );

  const removeHighlight = useCallback(
    async (b: { bookId: string; chapter: number; verse: number }) => {
      const current = await load();
      await save(current.filter((x) => key(x) !== key(b)));
    },
    []
  );

  const getHighlightColor = useCallback(
    (
      b: { bookId: string; chapter: number; verse: number }
    ): HighlightColor | undefined =>
      highlights.find((h) => key(h) === key(b))?.color,
    [highlights]
  );

  return { highlights, ready, setHighlight, removeHighlight, getHighlightColor };
}