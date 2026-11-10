// src/app/read/[bookId]/[chapter].tsx
import { useEffect, useRef, useState } from 'react';
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
import { useHighlights, HIGHLIGHT_COLORS } from '../../../data/highlights';
import { hasSeenTutorial, markTutorialSeen } from '../../../data/tutorial';
import { HighlightPicker } from '../../../components/HighlightPicker';
import { GestureTutorial } from '../../../components/GestureTutorial';
import { colors } from '../../../theme';

const serif = Platform.select({ ios: 'Georgia', android: 'serif', default: 'serif' });

export default function ReadScreen() {
  const params = useLocalSearchParams<{
    bookId: string;
    chapter: string;
    verse?: string;
  }>();
  const { bookId, chapter, verse: verseParam } = params;
  const router = useRouter();
  const { getBook, getVerses } = useBibleDb();
  const { toggle, isBookmarked } = useBookmarks();
  const { getHighlightColor, setHighlight, removeHighlight } = useHighlights();

  const chapterNum = parseInt(chapter, 10);
  const targetVerse = verseParam ? parseInt(verseParam, 10) : null;

  const [book, setBook] = useState<BookMeta | null>(null);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);

  const [pickerVerse, setPickerVerse] = useState<Verse | null>(null);
  const longPressRef = useRef(false);

  const [showTutorial, setShowTutorial] = useState(false);
  const tutorialCheckedRef = useRef(false);

  // Scroll-to-verse plumbing
  const scrollRef = useRef<React.ComponentRef<typeof ScrollView>>(null);
  const hasScrolledRef = useRef(false);
  const [flashVerse, setFlashVerse] = useState<number | null>(null);

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

    return () => {
      cancelled = true;
    };
  }, [bookId, chapterNum]);

  // Reset the scroll guard when the target changes (e.g. new bookmark tap)
  useEffect(() => {
    hasScrolledRef.current = false;
  }, [bookId, chapterNum, targetVerse]);

  // Show the gesture tutorial once
  useEffect(() => {
    if (tutorialCheckedRef.current) return;
    if (loading || verses.length === 0) return;
    tutorialCheckedRef.current = true;

    hasSeenTutorial().then((seen) => {
      if (!seen) setShowTutorial(true);
    });
  }, [loading, verses.length]);

  const dismissTutorial = async () => {
    setShowTutorial(false);
    await markTutorialSeen();
  };

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

  const openPicker = (v: Verse) => {
    setPickerVerse(v);
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
  };

  // Called by each verse row's onLayout once positioned
  const handleVerseLayout = (verseNum: number, y: number) => {
    if (hasScrolledRef.current) return;
    if (targetVerse !== verseNum) return;

    hasScrolledRef.current = true;

    // Small RAF lets the ScrollView finish sizing its content first
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({
        y: Math.max(0, y - 60),
        animated: true,
      });

      // Flash the target verse so the user sees where they landed
      setFlashVerse(verseNum);
      setTimeout(() => setFlashVerse(null), 1400);

      if (Platform.OS === 'ios') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
      }
    });
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
      <Stack.Screen
        options={{
          title: `${book.name} ${chapterNum}`,
          headerRight: () => (
            <Pressable
              onPress={() => setShowTutorial(true)}
              hitSlop={10}
              style={{ marginRight: 8, paddingHorizontal: 6 }}
            >
              <Text style={{ fontSize: 18, fontWeight: '700', color: colors.primary }}>
                ?
              </Text>
            </Pressable>
          ),
        }}
      />
      <ScrollView
        ref={scrollRef}
        key={`${book.id}-${chapterNum}`}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.heading}>
          {book.name} {chapterNum}
        </Text>

        {verses.map((v) => {
          const verseKey = { bookId: book.id, chapter: chapterNum, verse: v.verse };
          const saved = isBookmarked(verseKey);
          const highlight = getHighlightColor(verseKey);
          const bg = highlight ? HIGHLIGHT_COLORS[highlight] : undefined;
          const flashing = flashVerse === v.verse;

          return (
            <View
              key={v.verse}
              onLayout={(e) => handleVerseLayout(v.verse, e.nativeEvent.layout.y)}
              style={[
                styles.verseRow,
                bg && { backgroundColor: bg },
                flashing && styles.verseRowFlash,
              ]}
            >
              <Text selectable style={styles.verse}>
                <Text
                  style={[styles.verseNum, saved && styles.verseNumSaved]}
                  onPressIn={() => {
                    longPressRef.current = false;
                  }}
                  onLongPress={() => {
                    longPressRef.current = true;
                    openPicker(v);
                  }}
                  onPress={() => {
                    if (!longPressRef.current) handleToggleBookmark(v);
                  }}
                  suppressHighlighting
                >
                  {v.verse}{' '}
                </Text>
                {v.text}
              </Text>
            </View>
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

      {pickerVerse && (
        <HighlightPicker
          visible={!!pickerVerse}
          reference={`${book.name} ${chapterNum}:${pickerVerse.verse}`}
          currentColor={getHighlightColor({
            bookId: book.id,
            chapter: chapterNum,
            verse: pickerVerse.verse,
          })}
          onSelectColor={(color) => {
            setHighlight(
              { bookId: book.id, chapter: chapterNum, verse: pickerVerse.verse },
              color
            );
            if (Platform.OS === 'ios') {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
            }
            setPickerVerse(null);
          }}
          onRemove={() => {
            removeHighlight({
              bookId: book.id,
              chapter: chapterNum,
              verse: pickerVerse.verse,
            });
            setPickerVerse(null);
          }}
          onClose={() => setPickerVerse(null)}
        />
      )}

      <GestureTutorial visible={showTutorial} onDismiss={dismissTutorial} />
    </>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: { fontSize: 16, color: colors.textMuted },
  content: { padding: 20, paddingBottom: 60 },

  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 20,
    fontFamily: serif,
  },

  verseRow: {
    marginHorizontal: -8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 4,
  },
  // Brief flash when the user lands on a bookmarked verse
  verseRowFlash: {
    backgroundColor: 'rgba(139, 90, 43, 0.16)',
  },
  verse: {
    fontSize: 18,
    lineHeight: 30,
    color: colors.text,
    fontFamily: serif,
  },
  verseNum: {
    fontSize: 15,
    color: colors.textMuted,
    fontWeight: '700',
    fontFamily: undefined,
  },
  verseNumSaved: {
    color: '#fff',
    backgroundColor: colors.primary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
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
  navBtnPressed: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.primary,
  },
  navBtnDisabled: { opacity: 0.4 },
  navText: { fontSize: 15, fontWeight: '600', color: colors.text },
  navTextDisabled: { color: colors.textMuted },
});