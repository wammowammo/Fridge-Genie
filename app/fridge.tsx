import { useNavigation } from 'expo-router';
import { useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Pressable,
} from 'react-native';
import { useFridge } from './FridgeContext';
import { getEmojiForItem } from './utils/getEmojiForItem';
import { Ionicons } from '@expo/vector-icons';

export default function FridgeScreen() {
  const {
    fridgeItems,
    pendingItems,
    acceptItem,
    rejectItem,
    addToFridge,
    removeItem,
  } = useFridge();

  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [newFoodName, setNewFoodName] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => setModalVisible(true)} style={{ marginRight: 20 }}>
          <Ionicons name="add" size={28} color="#4CAF50" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleManualAdd = () => {
    if (newFoodName.trim() !== '') {
      addToFridge(newFoodName.trim());
      setNewFoodName('');
      setModalVisible(false);
    }
  };

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
            <View style={styles.itemCardRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.itemText}>
                  {getEmojiForItem(item.name)} {item.name}
                </Text>
                <Text style={styles.itemDate}>
                  Scanned: {new Date(item.dateScanned).toLocaleDateString()}
                </Text>
              </View>
              <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.trashButton}>
                <Ionicons name="trash-outline" size={20} color="#f44336" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      {/* Modal for manual input */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Add Food Manually</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Yogurt"
              value={newFoodName}
              onChangeText={setNewFoodName}
            />
            <View style={styles.modalButtons}>
              <Pressable style={styles.cancel} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </Pressable>
              <Pressable style={styles.accept} onPress={handleManualAdd}>
                <Text style={styles.buttonText}>Add</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
  itemCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginVertical: 6,
    backgroundColor: '#e0f0e0',
    borderRadius: 12,
  },
  itemText: {
    fontSize: 18,
  },
  itemDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  trashButton: {
    padding: 6,
  },
  pendingCard: {
    padding: 16,
    marginVertical: 6,
    backgroundColor: '#fff5e0',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
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
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancel: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: '#aaa',
    borderRadius: 8,
  },
});
