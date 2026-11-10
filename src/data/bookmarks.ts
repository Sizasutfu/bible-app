// src/data/bookmarks.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = '@bible:bookmarks';

export type Bookmark = {
  bookId: string;   // slug — 'psalms'
  bookName: string; // display — 'Psalms'
  chapter: number;
  verse: number;
  text: string;     // snapshot for the bookmarks screen
  createdAt: number;
};

export function bookmarkId(b: { bookId: string; chapter: number; verse: number }) {
  return `${b.bookId}:${b.chapter}:${b.verse}`;
}

// ── Shared cache + pub/sub so every mounted screen stays in sync ──
let cache: Bookmark[] | null = null;
const listeners = new Set<(b: Bookmark[]) => void>();

async function load(): Promise<Bookmark[]> {
  if (cache) return cache;
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    cache = raw ? JSON.parse(raw) : [];
  } catch {
    cache = [];
  }
  return cache!;
}

async function save(next: Bookmark[]) {
  cache = next;
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  listeners.forEach((fn) => fn(next));
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(cache ?? []);
  const [ready, setReady] = useState(!!cache);

  useEffect(() => {
    let cancelled = false;
    load().then((b) => {
      if (!cancelled) {
        setBookmarks(b);
        setReady(true);
      }
    });
    const listener = (b: Bookmark[]) => setBookmarks(b);
    listeners.add(listener);
    return () => {
      cancelled = true;
      listeners.delete(listener);
    };
  }, []);

  const toggle = useCallback(async (b: Omit<Bookmark, 'createdAt'>) => {
    const current = await load();
    const id = bookmarkId(b);
    const exists = current.some((x) => bookmarkId(x) === id);
    const next = exists
      ? current.filter((x) => bookmarkId(x) !== id)
      : [{ ...b, createdAt: Date.now() }, ...current];
    await save(next);
    return !exists; // true = added, false = removed
  }, []);

  const remove = useCallback(async (id: string) => {
    const current = await load();
    await save(current.filter((x) => bookmarkId(x) !== id));
  }, []);

  const isBookmarked = useCallback(
    (b: { bookId: string; chapter: number; verse: number }) =>
      bookmarks.some((x) => bookmarkId(x) === bookmarkId(b)),
    [bookmarks]
  );

  return { bookmarks, ready, toggle, remove, isBookmarked };
}