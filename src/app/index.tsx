// src/app/index.tsx
import { useEffect, useMemo, useState } from 'react';
import {
  SectionList,
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { useBibleDb } from '../data/bible';
import type { BookMeta } from '../data/bible';
import { colors } from '../theme';

export default function BooksScreen() {
  const router = useRouter();
  const { getAllBooks } = useBibleDb();

  const [books, setBooks] = useState<BookMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    getAllBooks()
      .then((result) => {
        if (!cancelled) {
          setBooks(result);
          setLoading(false);
        }
      })
      .catch((e) => {
        if (!cancelled) {
          console.error('Failed to load books:', e);
          setError(String(e));
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const sections = useMemo(
    () => [
      {
        title: 'Old Testament',
        data: books.filter((b) => b.testament === 'OT'),
      },
      {
        title: 'New Testament',
        data: books.filter((b) => b.testament === 'NT'),
      },
    ],
    [books]
  );

  const totalChapters = useMemo(
    () => books.reduce((sum, b) => sum + b.chapterCount, 0),
    [books]
  );

  const headerOptions = {
    headerTitle: '',
    headerShadowVisible: false,
    headerStyle: { backgroundColor: colors.bg },
   headerRight: () => (
  <View style={{ flexDirection: 'row', gap: 8 }}>
    <Pressable
      onPress={() => router.push('./bookmarks')}
      hitSlop={8}
      style={({ pressed }) => [styles.quizBtn, pressed && styles.quizBtnPressed]}
    >
      <Text style={styles.quizBtnText}>Bookmarks</Text>
    </Pressable>
    <Pressable
      onPress={() => router.push('/quiz')}
      hitSlop={8}
      style={({ pressed }) => [styles.quizBtn, pressed && styles.quizBtnPressed]}
    >
      <Text style={styles.quizBtnText}>Quizzes</Text>
    </Pressable>
  </View>
),
  };

  if (loading) {
    return (
      <>
        <Stack.Screen options={headerOptions} />
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.muted}>Loading books…</Text>
        </View>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Stack.Screen options={headerOptions} />
        <View style={styles.center}>
          <Text style={styles.errorTitle}>Couldn’t load the Bible</Text>
          <Text style={styles.muted}>{error}</Text>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={headerOptions} />
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.hero}>
            <Text style={styles.eyebrow}>King James Version</Text>
            <Text style={styles.title}>Holy Bible</Text>
            <Text style={styles.subtitle}>
              {books.length} books · {totalChapters.toLocaleString()} chapters
            </Text>
          </View>
        }
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionRule} />
            <Text style={styles.sectionCount}>{section.data.length}</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [
              styles.row,
              pressed && styles.rowPressed,
            ]}
            onPress={() => router.push(`/book/${item.id}`)}
          >
            <Text style={styles.bookName}>{item.name}</Text>
            <Text style={styles.meta}>
              {item.chapterCount}{' '}
              {item.chapterCount === 1 ? 'chapter' : 'chapters'}
            </Text>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </>
  );
}

const styles = StyleSheet.create({
  // ---------- Header quiz button ----------
  quizBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.primarySoft,
    marginRight: 8,
  },
  quizBtnPressed: {
    opacity: 0.7,
  },
  quizBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
    letterSpacing: 0.2,
  },

  // ---------- Loading / error ----------
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 12,
  },
  muted: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
  },
  errorTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },

  // ---------- List container ----------
  listContent: {
    paddingBottom: 40,
  },

  // ---------- Hero ----------
  hero: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 8,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: colors.primary,
    marginBottom: 8,
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -1.2,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textMuted,
    letterSpacing: 0.1,
  },

  // ---------- Section headers ----------
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 12,
    backgroundColor: colors.bg,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: colors.textMuted,
  },
  sectionRule: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
  },
  sectionCount: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textMuted,
    letterSpacing: 0.5,
    minWidth: 20,
    textAlign: 'right',
  },

  // ---------- Book rows ----------
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.surface,
  },
  rowPressed: {
    backgroundColor: colors.primarySoft,
  },
  bookName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    letterSpacing: -0.1,
  },
  meta: {
    fontSize: 13,
    color: colors.textMuted,
    marginRight: 8,
  },
  chevron: {
    fontSize: 22,
    lineHeight: 22,
    color: colors.textMuted,
    opacity: 0.55,
    marginTop: -2,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    marginLeft: 20,
  },
});