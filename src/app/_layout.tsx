// src/app/_layout.tsx
import { Stack } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../theme';

export default function RootLayout() {
  return (
    <SQLiteProvider
      databaseName="kjv.sqlite"
      assetSource={{ assetId: require('../../assets/bible.sqlite') }}
    >
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.text,
          headerTitleStyle: { fontWeight: '600' },
          contentStyle: { backgroundColor: colors.bg },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Bible' }} />
        <Stack.Screen name="book/[bookId]" options={{ title: 'Chapters' }} />
        <Stack.Screen name="read/[bookId]/[chapter]" options={{ title: 'Reading' }} />
      </Stack>
    </SQLiteProvider>
  );
}