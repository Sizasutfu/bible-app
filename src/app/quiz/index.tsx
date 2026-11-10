// src/app/quiz/index.tsx
import { useRouter, Stack } from 'expo-router';
import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native';
import { quizzes } from '../../data/quizzes';
import { colors } from '../../theme';

export default function QuizListScreen() {
  const router = useRouter();
  const totalQuestions = quizzes.reduce((sum, q) => sum + q.questions.length, 0);

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: '',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: colors.bg },
        }}
      />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>Test Yourself</Text>
          <Text style={styles.title}>Quizzes</Text>
          <Text style={styles.subtitle}>
            {quizzes.length} quizzes · {totalQuestions} questions
          </Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Available</Text>
          <View style={styles.sectionRule} />
        </View>

        {quizzes.map((quiz) => (
          <Pressable
            key={quiz.id}
            onPress={() => router.push(`/quiz/${quiz.id}`)}
            style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
          >
            <View style={styles.badge}>
              <Text style={styles.badgeEmoji}>{quiz.emoji}</Text>
            </View>
            <View style={styles.rowBody}>
              <Text style={styles.quizTitle}>{quiz.title}</Text>
              <Text style={styles.quizMeta}>
                {quiz.description} · {quiz.questions.length} questions
              </Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 40 },

  // Hero
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

  // Section header
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
  sectionRule: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
  },

  // Rows
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.surface,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  rowPressed: { backgroundColor: colors.primarySoft },

  badge: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  badgeEmoji: { fontSize: 20 },

  rowBody: { flex: 1 },
  quizTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    letterSpacing: -0.1,
    marginBottom: 2,
  },
  quizMeta: {
    fontSize: 13,
    color: colors.textMuted,
    letterSpacing: 0.1,
  },

  chevron: {
    fontSize: 22,
    lineHeight: 22,
    color: colors.textMuted,
    opacity: 0.55,
    marginLeft: 8,
    marginTop: -2,
  },
});