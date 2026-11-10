// src/app/quiz/[quizId].tsx
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  ScrollView, View, Text, Pressable, StyleSheet, Animated,
} from 'react-native';
import { getQuiz } from '../../data/quizzes';
import { colors } from '../../theme';

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

export default function QuizScreen() {
  const { quizId } = useLocalSearchParams<{ quizId: string }>();
  const router = useRouter();
  const quiz = getQuiz(quizId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!quiz) return;
    Animated.timing(progressAnim, {
      toValue: currentIndex / quiz.questions.length,
      duration: 350,
      useNativeDriver: false,
    }).start();
  }, [currentIndex, quiz]);

  if (!quiz) {
    return (
      <View style={styles.center}>
        <Text style={styles.muted}>Quiz not found</Text>
      </View>
    );
  }

  const question = quiz.questions[currentIndex];
  const isLast = currentIndex === quiz.questions.length - 1;
  const answered = selected !== null;

  const handleSelect = (index: number) => {
    if (answered) return;
    setSelected(index);
    if (index === question.correctIndex) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (isLast) {
      if (transitioning) return;
      setTransitioning(true);
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setFinished(true));
    } else {
      setCurrentIndex((i) => i + 1);
      setSelected(null);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setTransitioning(false);
  };

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  // ---------- Results ----------
  if (finished) {
    const pct = Math.round((score / quiz.questions.length) * 100);
    const message =
      pct === 100 ? 'Perfect. Well studied.'
      : pct >= 70 ? 'Strong recall.'
      : pct >= 50 ? 'A solid start.'
      : 'Keep reading — you\u2019ll get there.';

    return (
      <>
        <Stack.Screen
          options={{
            headerTitle: 'Results',
            headerShadowVisible: false,
            headerStyle: { backgroundColor: colors.bg },
          }}
        />
        <ScrollView contentContainerStyle={styles.resultsContent}>
          <Text style={styles.eyebrow}>Results</Text>
          <Text style={styles.resultsTitle}>{quiz.title}</Text>

          <View style={styles.scoreRow}>
            <Text style={styles.scoreBig}>{score}</Text>
            <Text style={styles.scoreDivider}>/</Text>
            <Text style={styles.scoreTotal}>{quiz.questions.length}</Text>
          </View>
          <Text style={styles.scorePct}>{pct}%</Text>

          <View style={styles.resultRule} />

          <Text style={styles.resultMessage}>{message}</Text>

          <Pressable
            style={({ pressed }) => [
              styles.primaryBtn,
              pressed && { opacity: 0.85 },
            ]}
            onPress={handleRestart}
          >
            <Text style={styles.primaryBtnText}>Try Again</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.textBtn,
              pressed && { opacity: 0.6 },
            ]}
            onPress={() => router.back()}
          >
            <Text style={styles.textBtnText}>Back to Quizzes</Text>
          </Pressable>
        </ScrollView>
      </>
    );
  }

  // ---------- Question ----------
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: quiz.title,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: colors.bg },
        }}
      />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Progress header */}
        <View style={styles.progressHeader}>
          <Text style={styles.eyebrow}>
            Question {currentIndex + 1} of {quiz.questions.length}
          </Text>
          <Text style={styles.scoreLabel}>Score {score}</Text>
        </View>

        <View style={styles.progressTrack}>
          <Animated.View style={[styles.progressFill, { width: progressWidth }]} />
        </View>

        {/* Question */}
        <Text style={styles.question}>{question.question}</Text>

        {/* Options */}
        <View style={styles.options}>
          {question.options.map((option, index) => {
            const isCorrect = index === question.correctIndex;
            const isSelected = index === selected;

            const showCorrect = answered && isCorrect;
            const showIncorrect = answered && isSelected && !isCorrect;
            const dimmed = answered && !isCorrect && !isSelected;

            return (
              <Pressable
                key={index}
                disabled={answered}
                onPress={() => handleSelect(index)}
                style={({ pressed }) => [
                  styles.option,
                  pressed && !answered && styles.optionPressed,
                  showCorrect && styles.optionCorrect,
                  showIncorrect && styles.optionIncorrect,
                  dimmed && styles.optionDim,
                ]}
              >
                <View
                  style={[
                    styles.letterBadge,
                    showCorrect && styles.letterBadgeCorrect,
                    showIncorrect && styles.letterBadgeIncorrect,
                  ]}
                >
                  <Text
                    style={[
                      styles.letterText,
                      showCorrect && styles.letterTextCorrect,
                      showIncorrect && styles.letterTextIncorrect,
                    ]}
                  >
                    {LETTERS[index]}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.optionText,
                    showCorrect && styles.optionTextCorrect,
                    showIncorrect && styles.optionTextIncorrect,
                  ]}
                >
                  {option}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Explanation */}
        {answered && question.explanation && (
          <View style={styles.explanationBox}>
            <Text style={styles.explanation}>{question.explanation}</Text>
            {question.reference && (
              <Text style={styles.reference}>{question.reference}</Text>
            )}
          </View>
        )}

        {/* Next */}
        {answered && (
          <Pressable
            style={({ pressed }) => [
              styles.primaryBtn,
              pressed && { opacity: 0.85 },
            ]}
            onPress={handleNext}
          >
            <Text style={styles.primaryBtnText}>
              {isLast ? 'See Results' : 'Next Question'}
            </Text>
          </Pressable>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  content: { padding: 24, paddingBottom: 48 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  muted: { fontSize: 14, color: colors.textMuted },

  // Eyebrow / progress header
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: colors.primary,
  },
  scoreLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: colors.textMuted,
  },

  // Progress bar
  progressTrack: {
    height: 3,
    backgroundColor: colors.border,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 32,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },

  // Question
  question: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.text,
    lineHeight: 32,
    letterSpacing: -0.4,
    marginBottom: 28,
  },

  // Options
  options: { gap: 10 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  optionPressed: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.primary,
  },
  optionCorrect: {
    borderColor: colors.correct,
    backgroundColor: colors.correctBg,
  },
  optionIncorrect: {
    borderColor: colors.incorrect,
    backgroundColor: colors.incorrectBg,
  },
  optionDim: { opacity: 0.45 },

  letterBadge: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    backgroundColor: colors.bg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  letterBadgeCorrect: {
    borderColor: colors.correct,
    backgroundColor: colors.correct,
  },
  letterBadgeIncorrect: {
    borderColor: colors.incorrect,
    backgroundColor: colors.incorrect,
  },
  letterText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textMuted,
    letterSpacing: 0.4,
  },
  letterTextCorrect: { color: '#fff' },
  letterTextIncorrect: { color: '#fff' },

  optionText: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    lineHeight: 22,
    letterSpacing: -0.1,
  },
  optionTextCorrect: { color: colors.correct, fontWeight: '600' },
  optionTextIncorrect: { color: colors.incorrect, fontWeight: '600' },

  // Explanation
  explanationBox: {
    marginTop: 24,
    paddingLeft: 16,
    borderLeftWidth: 2,
    borderLeftColor: colors.primary,
  },
  explanation: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
    letterSpacing: -0.1,
    marginBottom: 6,
  },
  reference: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },

  // Buttons
  primaryBtn: {
    marginTop: 28,
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  primaryBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  textBtn: {
    marginTop: 16,
    paddingVertical: 8,
    alignItems: 'center',
  },
  textBtnText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.2,
  },

  // Results
  resultsContent: {
    padding: 24,
    paddingTop: 40,
    paddingBottom: 48,
  },
  resultsTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.text,
    letterSpacing: -0.3,
    marginTop: 6,
    marginBottom: 40,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  scoreBig: {
    fontSize: 84,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: -3,
    lineHeight: 88,
  },
  scoreDivider: {
    fontSize: 32,
    color: colors.textMuted,
    fontWeight: '300',
    marginHorizontal: 10,
    marginBottom: 8,
  },
  scoreTotal: {
    fontSize: 32,
    color: colors.textMuted,
    fontWeight: '500',
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  scorePct: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textMuted,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginTop: 4,
  },
  resultRule: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    marginVertical: 32,
  },
  resultMessage: {
    fontSize: 18,
    color: colors.text,
    lineHeight: 26,
    letterSpacing: -0.2,
    marginBottom: 32,
  },
});