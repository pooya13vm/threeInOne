import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TodoHomeScreen from './screens/HomeScreen';
import AddScreen from './screens/AddScreen';
import EditScreen from './screens/EditScreen';
import SettingScreen from './screens/SettingScreen';
import {TodoProvider} from '../contexts/todoContext';

const Stack = createNativeStackNavigator();

function TodoNavigator() {
  return (
    <TodoProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={TodoHomeScreen} />
        <Stack.Screen name="ADD" component={AddScreen} />
        <Stack.Screen name="EDIT" component={EditScreen} />
        <Stack.Screen name="SETTING" component={SettingScreen} />
      </Stack.Navigator>
    </TodoProvider>
  );
}
export default TodoNavigator;
