import { View, Text, StyleSheet } from 'react-native';

export default function PreferencesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>User dietary preferences go here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 18 },
});
