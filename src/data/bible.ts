// src/data/bible.ts
import { useSQLiteContext } from 'expo-sqlite';

export type Testament = 'OT' | 'NT';

export type BookMeta = {
  id: string;          // slug used in URLs, e.g. 'genesis'
  name: string;        // display name
  testament: Testament;
  chapterCount: number;
  bookNumber: number;  // matches `book_id` in the DB
};

export type Verse = { verse: number; text: string };

const bookMeta: BookMeta[] = [
  { id: 'genesis',        name: 'Genesis',         testament: 'OT', chapterCount: 50,  bookNumber: 1  },
  { id: 'exodus',         name: 'Exodus',          testament: 'OT', chapterCount: 40,  bookNumber: 2  },
  { id: 'leviticus',      name: 'Leviticus',       testament: 'OT', chapterCount: 27,  bookNumber: 3  },
  { id: 'numbers',        name: 'Numbers',         testament: 'OT', chapterCount: 36,  bookNumber: 4  },
  { id: 'deuteronomy',    name: 'Deuteronomy',     testament: 'OT', chapterCount: 34,  bookNumber: 5  },
  { id: 'joshua',         name: 'Joshua',          testament: 'OT', chapterCount: 24,  bookNumber: 6  },
  { id: 'judges',         name: 'Judges',          testament: 'OT', chapterCount: 21,  bookNumber: 7  },
  { id: 'ruth',           name: 'Ruth',            testament: 'OT', chapterCount: 4,   bookNumber: 8  },
  { id: '1-samuel',       name: '1 Samuel',        testament: 'OT', chapterCount: 31,  bookNumber: 9  },
  { id: '2-samuel',       name: '2 Samuel',        testament: 'OT', chapterCount: 24,  bookNumber: 10 },
  { id: '1-kings',        name: '1 Kings',         testament: 'OT', chapterCount: 22,  bookNumber: 11 },
  { id: '2-kings',        name: '2 Kings',         testament: 'OT', chapterCount: 25,  bookNumber: 12 },
  { id: '1-chronicles',   name: '1 Chronicles',    testament: 'OT', chapterCount: 29,  bookNumber: 13 },
  { id: '2-chronicles',   name: '2 Chronicles',    testament: 'OT', chapterCount: 36,  bookNumber: 14 },
  { id: 'ezra',           name: 'Ezra',            testament: 'OT', chapterCount: 10,  bookNumber: 15 },
  { id: 'nehemiah',       name: 'Nehemiah',        testament: 'OT', chapterCount: 13,  bookNumber: 16 },
  { id: 'esther',         name: 'Esther',          testament: 'OT', chapterCount: 10,  bookNumber: 17 },
  { id: 'job',            name: 'Job',             testament: 'OT', chapterCount: 42,  bookNumber: 18 },
  { id: 'psalms',         name: 'Psalms',          testament: 'OT', chapterCount: 150, bookNumber: 19 },
  { id: 'proverbs',       name: 'Proverbs',        testament: 'OT', chapterCount: 31,  bookNumber: 20 },
  { id: 'ecclesiastes',   name: 'Ecclesiastes',    testament: 'OT', chapterCount: 12,  bookNumber: 21 },
  { id: 'song-of-solomon',name: 'Song of Solomon', testament: 'OT', chapterCount: 8,   bookNumber: 22 },
  { id: 'isaiah',         name: 'Isaiah',          testament: 'OT', chapterCount: 66,  bookNumber: 23 },
  { id: 'jeremiah',       name: 'Jeremiah',        testament: 'OT', chapterCount: 52,  bookNumber: 24 },
  { id: 'lamentations',   name: 'Lamentations',    testament: 'OT', chapterCount: 5,   bookNumber: 25 },
  { id: 'ezekiel',        name: 'Ezekiel',         testament: 'OT', chapterCount: 48,  bookNumber: 26 },
  { id: 'daniel',         name: 'Daniel',          testament: 'OT', chapterCount: 12,  bookNumber: 27 },
  { id: 'hosea',          name: 'Hosea',           testament: 'OT', chapterCount: 14,  bookNumber: 28 },
  { id: 'joel',           name: 'Joel',            testament: 'OT', chapterCount: 3,   bookNumber: 29 },
  { id: 'amos',           name: 'Amos',            testament: 'OT', chapterCount: 9,   bookNumber: 30 },
  { id: 'obadiah',        name: 'Obadiah',         testament: 'OT', chapterCount: 1,   bookNumber: 31 },
  { id: 'jonah',          name: 'Jonah',           testament: 'OT', chapterCount: 4,   bookNumber: 32 },
  { id: 'micah',          name: 'Micah',           testament: 'OT', chapterCount: 7,   bookNumber: 33 },
  { id: 'nahum',          name: 'Nahum',           testament: 'OT', chapterCount: 3,   bookNumber: 34 },
  { id: 'habakkuk',       name: 'Habakkuk',        testament: 'OT', chapterCount: 3,   bookNumber: 35 },
  { id: 'zephaniah',      name: 'Zephaniah',       testament: 'OT', chapterCount: 3,   bookNumber: 36 },
  { id: 'haggai',         name: 'Haggai',          testament: 'OT', chapterCount: 2,   bookNumber: 37 },
  { id: 'zechariah',      name: 'Zechariah',       testament: 'OT', chapterCount: 14,  bookNumber: 38 },
  { id: 'malachi',        name: 'Malachi',         testament: 'OT', chapterCount: 4,   bookNumber: 39 },
  { id: 'matthew',        name: 'Matthew',         testament: 'NT', chapterCount: 28,  bookNumber: 40 },
  { id: 'mark',           name: 'Mark',            testament: 'NT', chapterCount: 16,  bookNumber: 41 },
  { id: 'luke',           name: 'Luke',            testament: 'NT', chapterCount: 24,  bookNumber: 42 },
  { id: 'john',           name: 'John',            testament: 'NT', chapterCount: 21,  bookNumber: 43 },
  { id: 'acts',           name: 'Acts',            testament: 'NT', chapterCount: 28,  bookNumber: 44 },
  { id: 'romans',         name: 'Romans',          testament: 'NT', chapterCount: 16,  bookNumber: 45 },
  { id: '1-corinthians',  name: '1 Corinthians',   testament: 'NT', chapterCount: 16,  bookNumber: 46 },
  { id: '2-corinthians',  name: '2 Corinthians',   testament: 'NT', chapterCount: 13,  bookNumber: 47 },
  { id: 'galatians',      name: 'Galatians',       testament: 'NT', chapterCount: 6,   bookNumber: 48 },
  { id: 'ephesians',      name: 'Ephesians',       testament: 'NT', chapterCount: 6,   bookNumber: 49 },
  { id: 'philippians',    name: 'Philippians',     testament: 'NT', chapterCount: 4,   bookNumber: 50 },
  { id: 'colossians',     name: 'Colossians',      testament: 'NT', chapterCount: 4,   bookNumber: 51 },
  { id: '1-thessalonians',name: '1 Thessalonians', testament: 'NT', chapterCount: 5,   bookNumber: 52 },
  { id: '2-thessalonians',name: '2 Thessalonians', testament: 'NT', chapterCount: 3,   bookNumber: 53 },
  { id: '1-timothy',      name: '1 Timothy',       testament: 'NT', chapterCount: 6,   bookNumber: 54 },
  { id: '2-timothy',      name: '2 Timothy',       testament: 'NT', chapterCount: 4,   bookNumber: 55 },
  { id: 'titus',          name: 'Titus',           testament: 'NT', chapterCount: 3,   bookNumber: 56 },
  { id: 'philemon',       name: 'Philemon',        testament: 'NT', chapterCount: 1,   bookNumber: 57 },
  { id: 'hebrews',        name: 'Hebrews',         testament: 'NT', chapterCount: 13,  bookNumber: 58 },
  { id: 'james',          name: 'James',           testament: 'NT', chapterCount: 5,   bookNumber: 59 },
  { id: '1-peter',        name: '1 Peter',         testament: 'NT', chapterCount: 5,   bookNumber: 60 },
  { id: '2-peter',        name: '2 Peter',         testament: 'NT', chapterCount: 3,   bookNumber: 61 },
  { id: '1-john',         name: '1 John',          testament: 'NT', chapterCount: 5,   bookNumber: 62 },
  { id: '2-john',         name: '2 John',          testament: 'NT', chapterCount: 1,   bookNumber: 63 },
  { id: '3-john',         name: '3 John',          testament: 'NT', chapterCount: 1,   bookNumber: 64 },
  { id: 'jude',           name: 'Jude',            testament: 'NT', chapterCount: 1,   bookNumber: 65 },
  { id: 'revelation',     name: 'Revelation',      testament: 'NT', chapterCount: 22,  bookNumber: 66 },
];

const byId = new Map(bookMeta.map((b) => [b.id, b]));

export function useBibleDb() {
  const db = useSQLiteContext();

  async function getAllBooks(): Promise<BookMeta[]> {
    return bookMeta;
  }

  async function getBook(id: string): Promise<BookMeta | undefined> {
    return byId.get(id);
  }

  async function getVerses(bookId: string, chapter: number): Promise<Verse[]> {
    const meta = byId.get(bookId);
    if (!meta) return [];
    const rows = await db.getAllAsync<{ number: number; text: string }>(
      `SELECT number, text
         FROM verses
        WHERE book_id = ? AND chapter = ?
        ORDER BY number`,
      [meta.bookNumber, chapter]
    );
    return rows.map((r) => ({ verse: r.number, text: r.text }));
  }

  return { getAllBooks, getBook, getVerses };
}