import { View, Text, StyleSheet } from 'react-native';

export default function OptimizeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Recipe recommendations will show here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 18 },
});
