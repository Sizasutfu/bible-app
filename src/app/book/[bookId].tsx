// src/app/book/[bookId].tsx
import { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import {
  ScrollView,
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useBibleDb } from '../../data/bible';
import type { BookMeta } from '../../data/bible';
import { colors } from '../../theme';

export default function BookScreen() {
  const { bookId } = useLocalSearchParams<{ bookId: string }>();
  const router = useRouter();
  const { getBook } = useBibleDb();

  const [book, setBook] = useState<BookMeta | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    getBook(bookId)
      .then((result) => {
        if (!cancelled) {
          setBook(result ?? null);
          setLoading(false);
        }
      })
      .catch((e) => {
        if (!cancelled) {
          console.error('Failed to load book:', e);
          setBook(null);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [bookId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!book) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Book not found</Text>
      </View>
    );
  }

  // Generate chapter numbers from chapterCount (no `chapters` array on BookMeta).
  const chapterNumbers = Array.from(
    { length: book.chapterCount },
    (_, i) => i + 1
  );

  return (
    <>
      <Stack.Screen options={{ title: book.name }} />
      <ScrollView contentContainerStyle={styles.grid}>
        {chapterNumbers.map((num) => (
          <Pressable
            key={num}
            style={({ pressed }) => [
              styles.chapterBtn,
              pressed && styles.chapterBtnPressed,
            ]}
            onPress={() => router.push(`/read/${book.id}/${num}`)}
          >
            <Text style={styles.chapterText}>{num}</Text>
          </Pressable>
        ))}
      </ScrollView>
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
  errorText: {
    fontSize: 16,
    color: colors.textMuted,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    padding: 16,
  },
  chapterBtn: {
    width: '17%',
    aspectRatio: 1,
    backgroundColor: colors.surface,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  chapterBtnPressed: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.primary,
  },
  chapterText: {
    fontSize: 15,
    color: colors.text,
    fontWeight: '500',
  },
});