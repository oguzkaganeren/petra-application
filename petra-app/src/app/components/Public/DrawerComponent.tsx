import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { LoginScreen } from '../../pages/screens/LoginScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeScreen } from '../../pages/screens/HomeScreen';
import { AddRestaurantScreen } from '../../pages/screens/Restaurant/AddRestaurantScreen';
import { Drawer as UIKittenDrawer, Layout, Text } from '@ui-kitten/components';

const Drawer = createDrawerNavigator();

const DrawerContent = ({ navigation, state }) => {
	const onSelect = index => {
		navigation.navigate(state.routeNames[index]);
	};

	return (
		<UIKittenDrawer
			data={[{ title: 'LoginScreen' }, { title: 'HomeScreen' }]}
			selectedIndex={state.index}
			onSelect={onSelect}
		/>
	);
};

export const DrawerNavigator = () => (
	<Drawer.Navigator initialRouteName="HomeScreen" drawerContent={props => <DrawerContent {...props} />}>
		<Drawer.Screen name="LoginScreen" component={LoginScreen} />
		<Drawer.Screen name="HomeScreen" component={HomeScreen} />
	</Drawer.Navigator>
);

export const AppNavigator = () => (
	<NavigationContainer>
		<DrawerNavigator />
	</NavigationContainer>
);
