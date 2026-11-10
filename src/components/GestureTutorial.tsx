// src/components/GestureTutorial.tsx
import { useEffect, useRef } from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  Animated,
} from 'react-native';
import { colors } from '../theme';
import { HIGHLIGHT_COLORS } from '../data/highlights';

type Props = {
  visible: boolean;
  onDismiss: () => void;
};

export function GestureTutorial({ visible, onDismiss }: Props) {
  // Tap demo (row 1)
  const tapRippleScale = useRef(new Animated.Value(0.3)).current;
  const tapRippleOpacity = useRef(new Animated.Value(0)).current;
  const pillOpacity = useRef(new Animated.Value(0)).current;
  const plainNumOpacity = useRef(new Animated.Value(1)).current;
  const hint1Opacity = useRef(new Animated.Value(0)).current;

  // Hold demo (row 2)
  const holdRippleScale = useRef(new Animated.Value(0.3)).current;
  const holdRippleOpacity = useRef(new Animated.Value(0)).current;
  const highlightOpacity = useRef(new Animated.Value(0)).current;
  const hint2Opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!visible) return;

    // Reset every time the modal opens
    tapRippleScale.setValue(0.3);
    tapRippleOpacity.setValue(0);
    pillOpacity.setValue(0);
    plainNumOpacity.setValue(1);
    hint1Opacity.setValue(0);
    holdRippleScale.setValue(0.3);
    holdRippleOpacity.setValue(0);
    highlightOpacity.setValue(0);
    hint2Opacity.setValue(0);

    const seq = Animated.sequence([
      Animated.delay(400),

      // ── TAP demo
      Animated.parallel([
        Animated.timing(hint1Opacity, {
          toValue: 1, duration: 250, useNativeDriver: true,
        }),
        Animated.timing(tapRippleOpacity, {
          toValue: 0.7, duration: 100, useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(tapRippleScale, {
          toValue: 1, duration: 400, useNativeDriver: true,
        }),
        Animated.timing(tapRippleOpacity, {
          toValue: 0, duration: 400, useNativeDriver: true,
        }),
      ]),
      // Bookmark pill appears
      Animated.parallel([
        Animated.timing(pillOpacity, {
          toValue: 1, duration: 200, useNativeDriver: true,
        }),
        Animated.timing(plainNumOpacity, {
          toValue: 0, duration: 200, useNativeDriver: true,
        }),
      ]),
      Animated.delay(700),

      // ── HOLD demo
      Animated.parallel([
        Animated.timing(hint2Opacity, {
          toValue: 1, duration: 250, useNativeDriver: true,
        }),
        Animated.timing(holdRippleOpacity, {
          toValue: 0.6, duration: 100, useNativeDriver: true,
        }),
      ]),
      // Slow growth to read as "holding"
      Animated.timing(holdRippleScale, {
        toValue: 1, duration: 700, useNativeDriver: true,
      }),
      Animated.timing(holdRippleOpacity, {
        toValue: 0, duration: 200, useNativeDriver: true,
      }),
      // Row highlight appears
      Animated.timing(highlightOpacity, {
        toValue: 1, duration: 300, useNativeDriver: true,
      }),
      Animated.delay(600),
    ]);

    seq.start();
    return () => seq.stop();
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDismiss}
    >
      <Pressable style={styles.backdrop} onPress={onDismiss}>
        <Pressable style={styles.card} onPress={() => {}}>
          <Text style={styles.eyebrow}>Mark your reading</Text>
          <Text style={styles.heading}>Two quick gestures</Text>

          {/* Row 1 — tap to bookmark */}
          <View style={styles.demoRow}>
            <View style={styles.numWrap}>
              <Animated.View
                style={[
                  styles.ripple,
                  {
                    opacity: tapRippleOpacity,
                    transform: [{ scale: tapRippleScale }],
                  },
                ]}
              />
              <Animated.View style={[styles.pillBg, { opacity: pillOpacity }]} />
              <View style={styles.numCenter}>
                <Animated.Text
                  style={[
                    styles.numText,
                    { color: colors.textMuted, opacity: plainNumOpacity },
                  ]}
                >
                  1
                </Animated.Text>
              </View>
              <View style={styles.numCenter}>
                <Animated.Text
                  style={[
                    styles.numText,
                    { color: '#fff', opacity: pillOpacity },
                  ]}
                >
                  1
                </Animated.Text>
              </View>
            </View>
            <Text style={styles.demoVerse}>
              In the beginning God created…
            </Text>
          </View>

          <Animated.Text style={[styles.hint, { opacity: hint1Opacity }]}>
            <Text style={styles.hintBold}>Tap</Text> a number to bookmark
          </Animated.Text>

          {/* Row 2 — hold to highlight */}
          <View style={[styles.demoRow, styles.demoRowSpacing]}>
            <Animated.View
              style={[
                StyleSheet.absoluteFill,
                styles.highlightFill,
                { opacity: highlightOpacity },
              ]}
            />
            <View style={styles.numWrap}>
              <Animated.View
                style={[
                  styles.ripple,
                  {
                    opacity: holdRippleOpacity,
                    transform: [{ scale: holdRippleScale }],
                  },
                ]}
              />
              <View style={styles.numCenter}>
                <Text style={[styles.numText, { color: colors.textMuted }]}>
                  2
                </Text>
              </View>
            </View>
            <Text style={styles.demoVerse}>
              And the earth was without form…
            </Text>
          </View>

          <Animated.Text style={[styles.hint, { opacity: hint2Opacity }]}>
            <Text style={styles.hintBold}>Hold</Text> a number to highlight
          </Animated.Text>

          <Pressable
            style={({ pressed }) => [styles.btn, pressed && { opacity: 0.85 }]}
            onPress={onDismiss}
          >
            <Text style={styles.btnText}>Got it</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: colors.primary,
    marginBottom: 6,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -0.5,
    marginBottom: 24,
  },

  // Demo rows
  demoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginHorizontal: -8,
    borderRadius: 6,
    overflow: 'hidden',
  },
  demoRowSpacing: { marginTop: 24 },
  highlightFill: {
    backgroundColor: HIGHLIGHT_COLORS.yellow,
  },
  demoVerse: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
    fontFamily: 'Georgia',
    lineHeight: 22,
  },

  // Number + ripple
  numWrap: {
    width: 24,
    height: 24,
    marginRight: 10,
    position: 'relative',
  },
  numCenter: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
    numText: {
    fontSize: 15,                     
    fontWeight: '700',
  },
  pillBg: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 4,                              
    bottom: 4,                           
    backgroundColor: colors.primary,
    borderRadius: 5,                     
  },
  ripple: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(139, 90, 43, 0.22)',
    left: -8,
    top: -8,
  },

  // Hint labels
  hint: {
    fontSize: 13,
    color: colors.textMuted,
    paddingLeft: 34,
    marginTop: 6,
  },
  hintBold: {
    fontWeight: '700',
    color: colors.text,
  },

  // Button
  btn: {
    marginTop: 28,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});