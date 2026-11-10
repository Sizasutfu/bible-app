// src/app/bookmarks.tsx
import { useRouter, Stack } from 'expo-router';
import {
  ScrollView,
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useBookmarks, bookmarkId } from '../data/bookmarks';
import { colors } from '../theme';

export default function BookmarksScreen() {
  const router = useRouter();
  const { bookmarks, ready, remove } = useBookmarks();

  if (!ready) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: '',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: colors.bg },
        }}
      />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>Saved</Text>
          <Text style={styles.title}>Bookmarks</Text>
          <Text style={styles.subtitle}>
            {bookmarks.length}{' '}
            {bookmarks.length === 1 ? 'verse saved' : 'verses saved'}
          </Text>
        </View>

        {bookmarks.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No bookmarks yet</Text>
            <Text style={styles.emptyBody}>
              Tap a verse number while reading to save it here.
            </Text>
          </View>
        ) : (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Your Verses</Text>
              <View style={styles.sectionRule} />
            </View>

            {bookmarks.map((b) => {
              const reference = `${b.bookName} ${b.chapter}:${b.verse}`;
              return (
                <View key={bookmarkId(b)} style={styles.row}>
                  <Pressable
                    style={({ pressed }) => [
                      styles.rowBody,
                      pressed && { opacity: 0.6 },
                    ]}
                    onPress={() =>
                      router.push(`/read/${b.bookId}/${b.chapter}`)
                    }
                  >
                    <Text style={styles.reference}>{reference}</Text>
                    <Text style={styles.snippet} numberOfLines={2}>
                      {b.text}
                    </Text>
                  </Pressable>
                  <Pressable
                    hitSlop={10}
                    style={({ pressed }) => [
                      styles.removeBtn,
                      pressed && { opacity: 0.5 },
                    ]}
                    onPress={() => remove(bookmarkId(b))}
                  >
                    <Text style={styles.removeIcon}>×</Text>
                  </Pressable>
                </View>
              );
            })}
          </>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 60 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  hero: { paddingHorizontal: 24, paddingTop: 8, paddingBottom: 8 },
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
  subtitle: { fontSize: 14, color: colors.textMuted, letterSpacing: 0.1 },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 12,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: colors.textMuted,
  },
  sectionRule: { flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: colors.border },

  empty: { paddingHorizontal: 24, paddingTop: 48, alignItems: 'center' },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 6,
  },
  emptyBody: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 280,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.surface,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  rowBody: { flex: 1, paddingHorizontal: 20, paddingVertical: 16 },
  reference: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: colors.primary,
    marginBottom: 4,
  },
  snippet: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 21,
    letterSpacing: -0.1,
  },
  removeBtn: {
    paddingHorizontal: 16,
    paddingVertical: 18,
    justifyContent: 'flex-start',
  },
  removeIcon: {
    fontSize: 22,
    lineHeight: 22,
    color: colors.textMuted,
    fontWeight: '300',
  },
});