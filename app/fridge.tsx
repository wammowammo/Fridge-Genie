import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useFridge } from './FridgeContext';
import { getEmojiForItem } from './utils/getEmojiForItem';

export default function FridgeScreen() {
  const {
    fridgeItems,
    pendingItems,
    acceptItem,
    rejectItem,
  } = useFridge();

  useFocusEffect(useCallback(() => {
    // Could trigger animation or refresh later
  }, []));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pending Items</Text>
      {pendingItems.length === 0 ? (
        <Text style={styles.empty}>No new items. Scan your fridge!</Text>
      ) : (
        <FlatList
          data={pendingItems}
          keyExtractor={(item) => `pending-${item.id}`}
          renderItem={({ item }) => (
            <View style={styles.pendingCard}>
              <Text style={styles.itemText}>{getEmojiForItem(item.name)} {item.name}</Text>
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.accept} onPress={() => acceptItem(item.id)}>
                  <Text style={styles.buttonText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.reject} onPress={() => rejectItem(item.id)}>
                  <Text style={styles.buttonText}>Reject</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      <Text style={[styles.title, { marginTop: 30 }]}>Fridge Contents</Text>
      {fridgeItems.length === 0 ? (
        <Text style={styles.empty}>No items in your fridge yet.</Text>
      ) : (
        <FlatList
          data={fridgeItems}
          keyExtractor={(item) => `fridge-${item.id}`}
          renderItem={({ item }) => (
            <View style={styles.itemCard}>
              <Text style={styles.itemText}>{getEmojiForItem(item.name)} {item.name}</Text>
            </View>
          )}
          contentContainerStyle={{ paddingTop: 10 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  empty: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#777',
  },
  itemCard: {
    padding: 16,
    marginVertical: 6,
    backgroundColor: '#e0f0e0',
    borderRadius: 12,
  },
  pendingCard: {
    padding: 16,
    marginVertical: 6,
    backgroundColor: '#fff5e0',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  itemText: {
    fontSize: 18,
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-around',
  },
  accept: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
  },
  reject: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: '#f44336',
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
