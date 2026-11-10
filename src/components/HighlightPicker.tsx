// src/components/HighlightPicker.tsx
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import { colors } from '../theme';
import { HIGHLIGHT_COLORS } from '../data/highlights';
import type { HighlightColor } from '../data/highlights';

type Props = {
  visible: boolean;
  reference: string;
  currentColor?: HighlightColor;
  onSelectColor: (color: HighlightColor) => void;
  onRemove: () => void;
  onClose: () => void;
};

export function HighlightPicker({
  visible,
  reference,
  currentColor,
  onSelectColor,
  onRemove,
  onClose,
}: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.card} onPress={() => {}}>
          <View style={styles.header}>
            <Text style={styles.reference}>{reference}</Text>
            <Pressable onPress={onClose} hitSlop={10}>
              <Text style={styles.close}>×</Text>
            </Pressable>
          </View>

          <Text style={styles.label}>Highlight</Text>

          <View style={styles.swatches}>
            {(Object.keys(HIGHLIGHT_COLORS) as HighlightColor[]).map((color) => {
              const selected = currentColor === color;
              return (
                <Pressable
                  key={color}
                  onPress={() => onSelectColor(color)}
                  style={({ pressed }) => [
                    styles.swatch,
                    { backgroundColor: HIGHLIGHT_COLORS[color] },
                    selected && styles.swatchSelected,
                    pressed && { opacity: 0.7 },
                  ]}
                >
                  {selected && <Text style={styles.check}>✓</Text>}
                </Pressable>
              );
            })}
          </View>

          {currentColor && (
            <Pressable
              onPress={onRemove}
              style={({ pressed }) => [
                styles.removeBtn,
                pressed && { opacity: 0.6 },
              ]}
            >
              <Text style={styles.removeText}>Remove highlight</Text>
            </Pressable>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  reference: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: colors.primary,
  },
  close: {
    fontSize: 24,
    lineHeight: 24,
    color: colors.textMuted,
    fontWeight: '300',
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: colors.textMuted,
    marginBottom: 12,
  },
  swatches: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  swatch: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  swatchSelected: {
    borderColor: colors.text,
  },
  check: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '700',
  },
  removeBtn: {
    marginTop: 20,
    paddingVertical: 12,
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  removeText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.incorrect,
  },
});