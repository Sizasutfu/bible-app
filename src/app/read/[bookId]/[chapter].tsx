// src/app/read/[bookId]/[chapter].tsx
import { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import {
  ScrollView,
  View,
  Text,
  Pressable,
  Platform,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { useBibleDb } from '../../../data/bible';
import type { BookMeta, Verse } from '../../../data/bible';
import { useBookmarks } from '../../../data/bookmarks';
import { colors } from '../../../theme';

const serif = Platform.select({ ios: 'Georgia', android: 'serif', default: 'serif' });

export default function ReadScreen() {
  const { bookId, chapter } = useLocalSearchParams<{ bookId: string; chapter: string }>();
  const router = useRouter();
  const { getBook, getVerses } = useBibleDb();
  const { toggle, isBookmarked } = useBookmarks();

  const chapterNum = parseInt(chapter, 10);

  const [book, setBook] = useState<BookMeta | null>(null);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    Promise.all([getBook(bookId), getVerses(bookId, chapterNum)])
      .then(([b, v]) => {
        if (cancelled) return;
        setBook(b ?? null);
        setVerses(v);
        setLoading(false);
      })
      .catch((e) => {
        if (cancelled) return;
        console.error('Failed to load chapter:', e);
        setBook(null);
        setVerses([]);
        setLoading(false);
      });

    return () => { cancelled = true; };
  }, [bookId, chapterNum]);

  const handleToggleBookmark = async (v: Verse) => {
    if (!book) return;
    const added = await toggle({
      bookId: book.id,
      bookName: book.name,
      chapter: chapterNum,
      verse: v.verse,
      text: v.text,
    });
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(
        added ? Haptics.ImpactFeedbackStyle.Medium : Haptics.ImpactFeedbackStyle.Light
      ).catch(() => {});
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!book || verses.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Chapter not found</Text>
      </View>
    );
  }

  const hasPrev = chapterNum > 1;
  const hasNext = chapterNum < book.chapterCount;
  const goToChapter = (n: number) => router.replace(`/read/${book.id}/${n}`);

  return (
    <>
      <Stack.Screen options={{ title: `${book.name} ${chapterNum}` }} />
      <ScrollView
        key={`${book.id}-${chapterNum}`}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.heading}>
          {book.name} {chapterNum}
        </Text>

        {verses.map((v) => {
          const saved = isBookmarked({
            bookId: book.id,
            chapter: chapterNum,
            verse: v.verse,
          });

          return (
            <Text key={v.verse} selectable style={styles.verse}>
              <Text
                style={[styles.verseNum, saved && styles.verseNumSaved]}
                onPress={() => handleToggleBookmark(v)}
                suppressHighlighting
              >
                {v.verse}{' '}
              </Text>
              {v.text}
            </Text>
          );
        })}

        <View style={styles.nav}>
          <Pressable
            disabled={!hasPrev}
            onPress={() => goToChapter(chapterNum - 1)}
            style={({ pressed }) => [
              styles.navBtn,
              !hasPrev && styles.navBtnDisabled,
              pressed && hasPrev && styles.navBtnPressed,
            ]}
          >
            <Text style={[styles.navText, !hasPrev && styles.navTextDisabled]}>
              ‹ Previous
            </Text>
          </Pressable>
          <Pressable
            disabled={!hasNext}
            onPress={() => goToChapter(chapterNum + 1)}
            style={({ pressed }) => [
              styles.navBtn,
              !hasNext && styles.navBtnDisabled,
              pressed && hasNext && styles.navBtnPressed,
            ]}
          >
            <Text style={[styles.navText, !hasNext && styles.navTextDisabled]}>
              Next ›
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  errorText: { fontSize: 16, color: colors.textMuted },
  content: { padding: 20, paddingBottom: 60 },

  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 20,
    fontFamily: serif,
  },

  verse: {
    fontSize: 18,
    lineHeight: 30,
    color: colors.text,
    fontFamily: serif,
    marginBottom: 10,
  },
  verseNum: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: '700',
    fontFamily: undefined,
  },
  verseNumSaved: {
    color: '#fff',
    backgroundColor: colors.primary,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
    overflow: 'hidden',
  },

  nav: { flexDirection: 'row', gap: 12, marginTop: 32 },
  navBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  navBtnPressed: { backgroundColor: colors.primarySoft, borderColor: colors.primary },
  navBtnDisabled: { opacity: 0.4 },
  navText: { fontSize: 15, fontWeight: '600', color: colors.text },
  navTextDisabled: { color: colors.textMuted },
});