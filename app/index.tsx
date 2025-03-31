import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useFridge } from './FridgeContext';

export default function HomeScreen() {
  const [scanning, setScanning] = useState(false);
  const [scanText, setScanText] = useState('Scan Fridge');
  const { addPendingItems } = useFridge();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let timeout: NodeJS.Timeout;

    if (scanning) {
      const dots = ['.', '..', '...'];
      let i = 0;

      interval = setInterval(() => {
        setScanText(`Analyzing${dots[i % dots.length]}`);
        i++;
      }, 500);

      timeout = setTimeout(() => {
        clearInterval(interval);
        setScanning(false);
        setScanText('Scan Fridge');

        addPendingItems([{ name: 'Apple' }, { name: 'Orange' }]);
      }, 3000);
    }

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [scanning]);

  const handleStartScan = () => {
    if (!scanning) setScanning(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Fridge Genie!</Text>

      <View style={styles.scanButtonContainer}>
        <TouchableOpacity
          style={[styles.scanButton, scanning && styles.scanButtonDisabled]}
          onPress={handleStartScan}
          disabled={scanning}
        >
          <Text style={styles.scanButtonText}>{scanText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 80,
    paddingBottom: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scanButtonContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  scanButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#80c080',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  scanButtonDisabled: {
    backgroundColor: '#c0c0c0',
  },
  scanButtonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
});
