import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { FridgeProvider, useFridge } from './FridgeContext';

// Inner component for Tabs so we can access context
function TabLayout() {
  const { pendingItems } = useFridge();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerTitleAlign: 'center',
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === 'index') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'fridge') iconName = focused ? 'cube' : 'cube-outline';
          else if (route.name === 'optimize') iconName = focused ? 'restaurant' : 'restaurant-outline';
          else if (route.name === 'preferences') iconName = focused ? 'settings' : 'settings-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen
        name="fridge"
        options={{
          title: 'Fridge',
          tabBarBadge: pendingItems.length > 0 ? pendingItems.length : undefined,
          tabBarBadgeStyle: { backgroundColor: 'red' },
        }}
      />
      <Tabs.Screen name="optimize" options={{ title: 'Optimize' }} />
      <Tabs.Screen name="preferences" options={{ title: 'Preferences' }} />
    </Tabs>
  );
}

// Wrap your tabs with the context provider
export default function LayoutWrapper() {
  return (
    <FridgeProvider>
      <TabLayout />
    </FridgeProvider>
  );
}
