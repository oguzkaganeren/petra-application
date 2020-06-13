import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Drawer as UIKittenDrawer, Layout, Text } from '@ui-kitten/components';
import HomeScreen from './app/pages/screens/HomeScreen';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import HeaderComponent from '../src/app/components/Public/HeaderComponent';
import LoginScreen from './app/pages/screens/LoginScreen';
import AddCompanyScreen from './app/pages/screens/Company/AddCompanyScreen';
import ArchSiteScreen from './app/pages/screens/ArchSite/ArchSiteScreen';
import MuseumScreen from './app/pages/screens/Museum/MuseumScreen';
import RestaurantScreen from './app/pages/screens/Restaurant/RestaurantScreen';
import HotelScreen from './app/pages/screens/Hotel/HotelScreen';
import EditHotelScreen from './app/pages/screens/Hotel/EditHotelScreen';
import EditMuseumScreen from './app/pages/screens/Museum/EditMuseumScreen';
import EditArticleScreen from './app/pages/screens/Article/EditArticleScreen';
import EditArchSiteScreen from './app/pages/screens/ArchSite/EditArchSiteScreen';
import EditRestaurantScreen from './app/pages/screens/Restaurant/EditRestaurantScreen';
import EditCompanyScreen from './app/pages/screens/Company/EditCompanyScreen';
import CompanyScreen from './app/pages/screens/Company/CompanyScreen';
import ArticleScreen from './app/pages/screens/Article/ArticleScreen';
import TravelGuideScreen from './app/pages/screens/TravelGuide/TravelGuideScreen';
import GetHotelListByCity from './app/components/Hotel/GetHotelListByCity';
import GetRestaurantListByCityComponent from './app/components/Restaurant/GetRestaurantListByCityComponent';
import HotelInfoScreen from './app/pages/screens/Hotel/HotelInfoScreen';
import RestaurantInfoScreen from './app/pages/screens/Restaurant/RestaurantInfoScreen';
import TravelGuideDetailScreen from './app/pages/screens/TravelGuide/TravelGuideDetail';
import SettingScreen from './app/pages/screens/SettingScreen';
import AddRestaurantScreen from './app/pages/screens/Restaurant/AddRestaurantScreen';
import RestaurantDetailScreen from './app/pages/screens/Restaurant/RestaurantDetailScreen';
import AddFoodTypeScreen from './app/pages/screens/Restaurant/AddFoodTypeScreen';
import AddFoodScreen from './app/pages/screens/Restaurant/AddFoodScreen';
import AddHotelScreen from './app/pages/screens/Hotel/AddHotelScreen';
import ArchSiteDetailScreen from './app/pages/screens/ArchSite/ArchSiteDetailScreen';
import AddArchSiteTypeScreen from './app/pages/screens/ArchSite/AddArchSiteTypeScreen';
import HotelDetailScreen from './app/pages/screens/Hotel/HotelDetailScreen';
import AddRoomPropertyScreen from './app/pages/screens/Hotel/AddRoomPropertyScreen';
import AddRoomScreen from './app/pages/screens/Hotel/AddRoomScreen';
import AddHotelServicePropertyScreen from './app/pages/screens/Hotel/AddHotelServicePropertyScreen';
import AddHotelRoomPriceScreen from './app/pages/screens/Hotel/AddHotelRoomPriceScreen';
import AddArchSiteScreen from './app/pages/screens/ArchSite/AddArchSiteScreen';
import AddArchSiteCommentScreen from './app/pages/screens/ArchSite/AddArchSiteCommentScreen';
import AddArchSiteEntranceTypeScreen from './app/pages/screens/ArchSite/AddArchSiteEnterenceTypeScreen';
import AddRestaurantCuisineTypeScreen from './app/pages/screens/Restaurant/AddRestaurantCuisineTypeScreen';
import ArticleDetailScreen from './app/pages/screens/Article/ArticleDetailScreen';
import AddTagScreen from './app/pages/screens/Article/AddTagScreen';
import AddRestaurantTypeScreen from './app/pages/screens/Restaurant/AddRestaurantTypeScreen';
import AddMenuScreen from './app/pages/screens/Restaurant/AddMenuScreen';
import AddRestaurantCommentScreen from './app/pages/screens/Restaurant/AddRestaurantCommentScreen';
import MuseumDetailScreen from './app/pages/screens/Museum/MuseumDetailScreen';
import AddMuseumTypeScreen from './app/pages/screens/Museum/AddMuseumTypeScreen';
import AddMuseumScreen from './app/pages/screens/Museum/AddMuseumScreen';
import AddMuseumCommentScreen from './app/pages/screens/Museum/AddMuseumCommentScreen';
import AddMuseumEntranceTypeScreen from './app/pages/screens/Museum/AddMuseumEntranceTypeScreen';
import AddArchSiteWorkingScheduleScreen from './app/pages/screens/ArchSite/AddArchSiteWorkingScheduleScreen';
import AddArchSitePriceScreen from './app/pages/screens/ArchSite/AddArchSitePriceScreen';
import AddMuseumPriceScreen from './app/pages/screens/Museum/AddMuseumPriceScreen';
import AddMuseumWorkingScheduleScreen from './app/pages/screens/Museum/AddMuseumWorkingScheduleScreen';
import AddRestaurantWorkingScheduleScreen from './app/pages/screens/Restaurant/AddRestaurantWorkingScheduleScreen';
import AddTravelGuideScreen from './app/pages/screens/TravelGuide/AddTravelGuideScreen';
import AddArticleScreen from './app/pages/screens/Article/AddArticleScreen';
import RegisterScreen from './app/pages/screens/RegisterScreen';
import CityInfoScreen from './app/pages/screens/CityInfoScreen';
declare var global: any;
/**
 * Eğer drawer ile tıkladığın bir sayfada header gözükmesini istiyorsan her bir ekran için yeni bir stack oluşturmalısın
 * by oguz
 */

// Graphql modules
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// Pass your GraphQL endpoint to uri
const client = new ApolloClient({ uri: 'http://127.0.0.1:8080/v1/graphql' });
const unregisteredMenu = [{ title: 'Login' }, { title: 'Home' }];
const userTypeOneMenus = [{ title: 'Home' }, { title: 'TravelGuide' }];
const userTypeTwoMenus = [
	{ title: 'Home' },
	{ title: 'Company' },
	{ title: 'Restaurant' },
	{ title: 'Hotel' },
	{ title: 'Museum' },
	{ title: 'Archaeological Site' },
];
const userTypeThreeMenus = [{ title: 'Home' }, { title: 'Article' }];
const userTypeFiveMenus = [
	{ title: 'Home' },
	{ title: 'Company' },
	{ title: 'Restaurant' },
	{ title: 'Hotel' },
	{ title: 'Museum' },
	{ title: 'Archaeological Site' },
	{ title: 'Article' },
	{ title: 'Travel Guide' },
];
const Drawer = createDrawerNavigator();

const DrawerContent = ({ navigation, state }) => {
	let index = state.index;
	global.userTypeID == 1 && index == 1
		? (index = 0)
		: global.userTypeID == 1
		? (index = 1)
		: (global.userTypeID == 2 || global.userTypeID == 4) && index == 1
		? (index = 0)
		: global.userTypeID == 2 || global.userTypeID == 4
		? (index = index - 1)
		: global.userTypeID == 3 && index == 1
		? (index = 0)
		: global.userTypeID == 3
		? (index = 1)
		: global.userTypeID == 5 && index == 1
		? (index = 0)
		: global.userTypeID == 5
		? (index = index - 1)
		: index;
	const onSelect = (indexvalue) => {
		global.userTypeID == 1 && indexvalue == 0
			? (indexvalue = 1)
			: global.userTypeID == 1
			? (indexvalue = 8)
			: (global.userTypeID == 2 || global.userTypeID == 4) && indexvalue == 0
			? (indexvalue = 1)
			: global.userTypeID == 2 || global.userTypeID == 4
			? (indexvalue = indexvalue + 1)
			: global.userTypeID == 3 && indexvalue == 0
			? (indexvalue = 1)
			: global.userTypeID == 3
			? (indexvalue = 7)
			: global.userTypeID == 5 && indexvalue == 0
			? (indexvalue = 1)
			: global.userTypeID == 5
			? (indexvalue = indexvalue + 1)
			: indexvalue;
		console.log(state.routeNames[indexvalue]);
		navigation.navigate(state.routeNames[indexvalue]);
	};
	console.log(state);
	return (
		<UIKittenDrawer
			data={
				global.userTypeID == 1
					? userTypeOneMenus
					: global.userTypeID == 2 || global.userTypeID == 4
					? userTypeTwoMenus
					: global.userTypeID == 3
					? userTypeThreeMenus
					: global.userTypeID == 5
					? userTypeFiveMenus
					: unregisteredMenu
			}
			selectedIndex={index}
			onSelect={onSelect}
		/>
	);
};
function DrawerNavigator() {
	return (
		<Drawer.Navigator
			screenOptions={{ gestureEnabled: false }}
			initialRouteName="HomeScreen"
			drawerContent={(props) => <DrawerContent {...props} />}
		>
			<Drawer.Screen name="LoginScreen" component={LoginStack} />
			<Drawer.Screen name="HomeScreen" component={HomeStack} />
			<Drawer.Screen name="CompanyScreen" component={CompanyStack} />
			<Drawer.Screen name="RestaurantScreen" component={RestaurantStack} />
			<Drawer.Screen name="HotelScreen" component={HotelStack} />
			<Drawer.Screen name="MuseumScreen" component={MuseumStack} />
			<Drawer.Screen name="ArchSiteScreen" component={ArchSiteStack} />
			<Drawer.Screen name="ArticleScreen" component={ArticleStack} />
			<Drawer.Screen name="TravelGuideScreen" component={TravelGuideStack} />
		</Drawer.Navigator>
	);
}

const Stack = createStackNavigator();
function LoginStack() {
	return (
		<Stack.Navigator initialRouteName="LoginScreen">
			<Stack.Screen
				name="LoginScreen"
				component={LoginScreen}
				options={{
					title: 'Home',
					header: ({ scene, previous, navigation }) => {
						const { options } = scene.descriptor;
						const title =
							options.headerTitle !== undefined
								? options.headerTitle
								: options.title !== undefined
								? options.title
								: scene.route.name;

						return <HeaderComponent navigation={navigation} headerTitle={title} previous={false} />;
					},
				}}
			/>
			<Stack.Screen
				name="RegisterScreen"
				component={RegisterScreen}
				options={{
					title: 'Register',
					header: ({ scene, previous, navigation }) => {
						const { options } = scene.descriptor;
						const title =
							options.headerTitle !== undefined
								? options.headerTitle
								: options.title !== undefined
								? options.title
								: scene.route.name;

						return <HeaderComponent navigation={navigation} headerTitle={title} previous={previous} />;
					},
				}}
			/>
		</Stack.Navigator>
	);
}
function HomeStack() {
	return (
		<Stack.Navigator initialRouteName="HomeScreen">
			<Stack.Screen
				name="HomeScreen"
				component={HomeScreen}
				options={{
					title: 'Home',
					header: ({ scene, previous, navigation }) => {
						const { options } = scene.descriptor;
						const title =
							options.headerTitle !== undefined
								? options.headerTitle
								: options.title !== undefined
								? options.title
								: scene.route.name;

						return <HeaderComponent navigation={navigation} headerTitle={title} previous={false} />;
					},
				}}
			/>
			<Stack.Screen
				name="GetHotelListByCity"
				component={GetHotelListByCity}
				options={{
					title: 'Hotels',
					header: ({ scene, previous, navigation }) => {
						const { options } = scene.descriptor;
						const title =
							options.headerTitle !== undefined
								? options.headerTitle
								: options.title !== undefined
								? options.title
								: scene.route.name;

						return <HeaderComponent navigation={navigation} headerTitle={title} previous={previous} />;
					},
				}}
			/>
			<Stack.Screen
				name="GetRestaurantListByCity"
				component={GetRestaurantListByCityComponent}
				options={{
					title: 'Restaurants',
					header: ({ scene, previous, navigation }) => {
						const { options } = scene.descriptor;
						const title =
							options.headerTitle !== undefined
								? options.headerTitle
								: options.title !== undefined
								? options.title
								: scene.route.name;

						return <HeaderComponent navigation={navigation} headerTitle={title} previous={previous} />;
					},
				}}
			/>
			<Stack.Screen
				name="HotelInfoScreen"
				component={HotelInfoScreen}
				options={{
					title: 'Details',
					header: ({ scene, previous, navigation }) => {
						const { options } = scene.descriptor;
						const title =
							options.headerTitle !== undefined
								? options.headerTitle
								: options.title !== undefined
								? options.title
								: scene.route.name;

						return <HeaderComponent navigation={navigation} headerTitle={title} previous={previous} />;
					},
				}}
			/>
			<Stack.Screen
				name="CityInfoScreen"
				component={CityInfoScreen}
				options={{
					title: 'City Details',
					header: ({ scene, previous, navigation }) => {
						const { options } = scene.descriptor;
						const title =
							options.headerTitle !== undefined
								? options.headerTitle
								: options.title !== undefined
								? options.title
								: scene.route.name;

						return <HeaderComponent navigation={navigation} headerTitle={title} previous={previous} />;
					},
				}}
			/>
			<Stack.Screen
				name="RestaurantInfoScreen"
				component={RestaurantInfoScreen}
				options={{
					title: 'Details',
					header: ({ scene, previous, navigation }) => {
						const { options } = scene.descriptor;
						const title =
							options.headerTitle !== undefined
								? options.headerTitle
								: options.title !== undefined
								? options.title
								: scene.route.name;

						return <HeaderComponent navigation={navigation} headerTitle={title} previous={previous} />;
					},
				}}
			/>
			<Stack.Screen
				name="AddTravelGuideScreen"
				component={AddTravelGuideScreen}
				options={{
					title: 'Add your travel guide',
					header: ({ scene, previous, navigation }) => {
						const { options } = scene.descriptor;
						const title =
							options.headerTitle !== undefined
								? options.headerTitle
								: options.title !== undefined
								? options.title
								: scene.route.name;

						return <HeaderComponent navigation={navigation} headerTitle={title} previous={previous} />;
					},
				}}
			/>
			<Stack.Screen
				name="TravelGuideDetailScreen"
				component={TravelGuideDetailScreen}
				options={{
					title: 'Travel guide detail',
					header: ({ scene, previous, navigation }) => {
						const { options } = scene.descriptor;
						const title =
							options.headerTitle !== undefined
								? options.headerTitle
								: options.title !== undefined
								? options.title
								: scene.route.name;

						return <HeaderComponent navigation={navigation} headerTitle={title} previous={previous} />;
					},
				}}
			/>
			<Stack.Screen
				name="SettingScreen"
				component={SettingScreen}
				options={{
					title: 'Setting',
					header: ({ scene, previous, navigation }) => {
						const { options } = scene.descriptor;
						const title =
							options.headerTitle !== undefined
								? options.headerTitle
								: options.title !== undefined
								? options.title
								: scene.route.name;

						return <HeaderComponent navigation={navigation} headerTitle={title} previous={false} />;
					},
				}}
			/>
		</Stack.Navigator>
	);
}
function CompanyStack() {
	return (
		<Stack.Navigator initialRouteName="CompanyScreen">
			<Stack.Screen
				name="CompanyScreen"
				component={CompanyScreen}
				options={{
					title: 'Company',
					header: ({ scene, previous, navigation }) => {
						const { options } = scene.descriptor;
						const title =
							options.headerTitle !== undefined
								? options.headerTitle
								: options.title !== undefined
								? options.title
								: scene.route.name;

						return <HeaderComponent navigation={navigation} headerTitle={title} previous={previous} />;
					},
				}}
			/>
			<Stack.Screen
				name="EditCompanyScreen"
				component={EditCompanyScreen}
				options={{
					title: 'Edit Company',
					header: ({ scene, previous, navigation }) => {
						const { options } = scene.descriptor;
						const title =
							options.headerTitle !== undefined
								? options.headerTitle
								: options.title !== undefined
								? options.title
								: scene.route.name;

						return <HeaderComponent navigation={navigation} headerTitle={title} previous={previous} />;
					},
				}}
			/>
			<Stack.Screen
				name="AddCompanyScreen"
				component={AddCompanyScreen}
				options={{
					title: 'Add Company',
					header: ({ scene, previous, navigation }) => {
						const { options } = scene.descriptor;
						const title =
							options.headerTitle !== undefined
								? options.headerTitle
								: options.title !== undefined
								? options.title
								: scene.route.name;

						return <HeaderComponent navigation={navigation} headerTitle={title} previous={previous} />;
					},
				}}
			/>
		</Stack.Navigator>
	);
}
function RestaurantStack() {
	return (
		<Stack.Navigator initialRouteName="RestaurantScreen">
			<Stack.Screen
				name="RestaurantScreen"
				component={RestaurantScreen}
				options={{
					title: 'Restaurant',
					header: ({ scene, previous, navigation }) => {
						const { options } = scene.descriptor;
						const title =
							options.headerTitle !== undefined
								? options.headerTitle
								: options.title !== undefined
								? options.title
								: scene.route.name;

						return <HeaderComponent navigation={navigation} headerTitle={title} previous={previous} />;
					},
				}}
			/>
			<Stack.Screen
				name="AddRestaurantScreen"
				component={AddRestaurantScreen}
				options={{
					title: 'Add Restaurant',
					header: ({ scene, previous, navigation }) => {
						const { options } = scene.descriptor;
						const title =
							options.headerTitle !== undefined
								? options.headerTitle
								: options.title !== undefined
								? options.title
								: scene.route.name;

						return <HeaderComponent navigation={navigation} headerTitle={title} previous={previous} />;
					},
				}}
			/>
			<Stack.Screen
				name="EditRestaurantScreen"
				component={EditRestaurantScreen}
				options={{
					title: 'Edit Restaurant',
					header: ({ scene, previous, navigation }) => {
						const { options } = scene.descriptor;
						const title =
							options.headerTitle !== undefined
								? options.headerTitle
								: options.title !== undefined
								? options.title
								: scene.route.name;

						return <HeaderComponent navigation={navigation} headerTitle={title} previous={previous} />;
					},
				}}
			/>
			<Stack.Screen
				name="RestaurantDetailScreen"
				component={RestaurantDetailScreen}
				options={{
					title: 'Restaurant Details',
					header: ({ scene, previous, navigation }) => {
						const { options } = scene.descriptor;
						const title =
							options.headerTitle !== undefined
								? options.headerTitle
								: options.title !== undefined
								? options.title
								: scene.route.name;

						return <HeaderComponent navigation={navigation} headerTitle={title} previous={previous} />;
					},
				}}
			/>
			<Stack.Screen
				name="AddRestaurantTypeScreen"
				component={AddRestaurantTypeScreen}
				options={{
					title: 'Add Restaurant Type',
					header: ({ scene, previous, navigation }) => {
						const { options } = scene.descriptor;
						const title =
							options.headerTitle !== undefined
								? options.headerTitle
								: options.title !== undefined
								? options.title
								: scene.route.name;

						return <HeaderComponent navigation={navigation} headerTitle={title} previous={previous} />;
					},
				}}
			/>
			<Stack.Screen
				name="AddFoodTypeScreen"
				component={AddFoodTypeScreen}
				options={{
					title: 'Add Food Type',
					header: ({ scene, previous, navigation }) => {
						const { options } = scene.descriptor;
						const title =
							options.headerTitle !== undefined
								? options.headerTitle
								: options.title !== undefined
								? options.title
								: scene.route.name;

						return <HeaderComponent navigation={navigation} headerTitle={title} previous={previous} />;
					},
				}}
			/>
			<Stack.Screen
				name="AddFoodScreen"
				component={AddFoodScreen}
				options={{
					title: 'Add Food',
					header: ({ scene, previous, navigation }) => {
						const { options } = scene.descriptor;
						const title =
							options.headerTitle !== undefined
								? options.headerTitle
								: options.title !== undefined
								? options.title
								: scene.route.name;

						return <HeaderComponent navigation={navigation} headerTitle={title} previous={previous} />;
					},
				}}
			/>
			<Stack.Screen
				name="AddMenuScreen"
				component={AddMenuScreen}
				options={{
					title: 'Add Menu',
					header: ({ scene, previous, navigation }) => {
						const { options } = scene.descriptor;
						const title =
							options.headerTitle !== undefined
								? options.headerTitle
								: options.title !== undefined
								? options.title
								: scene.route.name;

						return <HeaderComponent navigation={navigation} headerTitle={title} previous={previous} />;
					},
				}}
			/>
			<Stack.Screen
				name="AddRestaurantCuisineTypeScreen"
				component={AddRestaurantCuisineTypeScreen}
				options={{
					title: 'Add Restaurant Cuisine Type',
					header: ({ scene, previous, navigation }) => {
						const { options } = scene.descriptor;
						const title =
							options.headerTitle !== undefined
								? options.headerTitle
								: options.title !== undefined
								? options.title
								: scene.route.name;

						return <HeaderComponent navigation={navigation} headerTitle={title} previous={previous} />;
					},
				}}
			/>
			<Stack.Screen
				name="AddRestaurantCommentScreen"
				component={AddRestaurantCommentScreen}
				options={{
					title: 'Add Comment Type',
					header: ({ scene, previous, navigation }) => {
						const { options } = scene.descriptor;
						const title =
							options.headerTitle !== undefined
								? options.headerTitle
								: options.title !== undefined
								? options.title
								: scene.route.name;

						return <HeaderComponent navigation={navigation} headerTitle={title} previous={previous} />;
					},
				}}
			/>
			<Stack.Screen
				name="AddRestaurantWorkingScheduleScreen"
				component={AddRestaurantWorkingScheduleScreen}
				options={{
					title: 'Add Restaurant Working Schedule',
					header: ({ scene, previous, navigation }) => {
						const { options } = scene.descriptor;
						const title =
							options.headerTitle !== undefined
								? options.headerTitle
								: options.title !== undefined
								? options.title
								: scene.route.name;

						return <HeaderComponent navigation={navigation} headerTitle={title} previous={previous} />;
					},
				}}
			/>
		</Stack.Navigator>
	);
}
function HotelStack() {
	return (
		<Stack.Navigator initialRouteName="HotelScreen">
			<Stack.Screen
				name="HotelScreen"
				component={HotelScreen}
				options={{
					title: 'Hotel',
					header: ({ scene, previous, navigation }) => {
						const { options } = scene.descriptor;
						const title =
							options.headerTitle !== undefined
								? options.headerTitle
								: options.title !== undefined
								? options.title
								: scene.route.name;

						return <HeaderComponent navigation={navigation} headerTitle={title} previous={previous} />;
					},
				}}
			/>
			<Stack.Screen
				name="EditHotelScreen"
				component={EditHotelScreen}
				options={{
					title: 'Edit Hotel',
					header: ({ scene, previous, navigation }) => {
						const { options } = scene.descriptor;
						const title =
							options.headerTitle !== undefined
								? options.headerTitle
								: options.title !== undefined
								? options.title
								: scene.route.name;

						return <HeaderComponent navigation={navigation} headerTitle={title} previous={previous} />;
					},
				}}
			/>
			<Stack.Screen
				name="AddHotelScreen"
				component={AddHotelScreen}
				options={{
					title: 'Add Hotel',
					header: ({ scene, previous, navigation }) => {
						const { options } = scene.descriptor;
						const title =
							options.headerTitle !== undefined
								? options.headerTitle
								: options.title !== undefined
								? options.title
								: scene.route.name;

						return <HeaderComponent navigation={navigation} headerTitle={title} previous={previous} />;
					},
				}}
			/>
			<Stack.Screen
				name="HotelDetailScreen"
				component={HotelDetailScreen}
				options={{
					title: 'Hotel Details',
					header: ({ scene, previous, navigation }) => {
						const { options } = scene.descriptor;
						const title =
							options.headerTitle !== undefined
								? options.headerTitle
								: options.title !== undefined
								? options.title
								: scene.route.name;

						return <HeaderComponent navigation={navigation} headerTitle={title} previous={previous} />;
					},
				}}
			/>
			<Stack.Screen
				name="AddRoomPropertyScreen"
				component={AddRoomPropertyScreen}
				options={{
					title: 'Add Room Property',
					header: ({ scene, previous, navigation }) => {
						const { options } = scene.descriptor;
						const title =
							options.headerTitle !== undefined
								? options.headerTitle
								: options.title !== undefined
								? options.title
								: scene.route.name;

						return <HeaderComponent navigation={navigation} headerTitle={title} previous={previous} />;
					},
				}}
			/>
			<Stack.Screen
				name="AddRoomScreen"
				component={AddRoomScreen}
				options={{
					title: 'Add Room',
					header: ({ scene, previous, navigation }) => {
						const { options } = scene.descriptor;
						const title =
							options.headerTitle !== undefined
								? options.headerTitle
								: options.title !== undefined
								? options.title
								: scene.route.name;

						return <HeaderComponent navigation={navigation} headerTitle={title} previous={previous} />;
					},
				}}
			/>
			<Stack.Screen
				name="AddHotelServicePropertyScreen"
				component={AddHotelServicePropertyScreen}
				options={{
					title: 'Add Service Property',
					header: ({ scene, previous, navigation }) => {
						const { options } = scene.descriptor;
						const title =
							options.headerTitle !== undefined
								? options.headerTitle
								: options.title !== undefined
								? options.title
								: scene.route.name;

						return <HeaderComponent navigation={navigation} headerTitle={title} previous={previous} />;
					},
				}}
			/>
			<Stack.Screen
				name="AddHotelRoomPriceScreen"
				component={AddHotelRoomPriceScreen}
				options={{
					title: 'Add Room Price',
					header: ({ scene, previous, navigation }) => {
						const { options } = scene.descriptor;
						const title =
							options.headerTitle !== undefined
								? options.headerTitle
								: options.title !== undefined
								? options.title
								: scene.route.name;

						return <HeaderComponent navigation={navigation} headerTitle={title} previous={previous} />;
					},
				}}
			/>
		</Stack.Navigator>
	);
}
function MuseumStack() {
	return (
		<Stack.Navigator initialRouteName="MuseumScreen">
			<Stack.Screen
				name="MuseumScreen"
				component={MuseumScreen}
				options={{
					title: 'Museum',
					header: ({ scene, previous, navigation }) => {
						const { options } = scene.descriptor;
						const title =
							options.headerTitle !== undefined
								? options.headerTitle
								: options.title !== undefined
								? options.title
								: scene.route.name;

						return <HeaderComponent navigation={navigation} headerTitle={title} previous={previous} />;
					},
				}}
			/>

			<Stack.Screen
				name="AddMuseumScreen"
				component={AddMuseumScreen}
				options={{
					title: 'Add Museum',
					header: ({ scene, previous, navigation }) => {
						const { options } = scene.descriptor;
						const title =
							options.headerTitle !== undefined
								? options.headerTitle
								: options.title !== undefined
								? options.title
								: scene.route.name;

						return <HeaderComponent navigation={navigation} headerTitle={title} previous={previous} />;
					},
				}}
			/>
			<Stack.Screen
				name="EditMuseumScreen"
				component={EditMuseumScreen}
				options={{
					title: 'Edit Museum',
					header: ({ scene, previous, navigation }) => {
						const { options } = scene.descriptor;
						const title =
							options.headerTitle !== undefined
								? options.headerTitle
								: options.title !== undefined
								? options.title
								: scene.route.name;

						return <HeaderComponent navigation={navigation} headerTitle={title} previous={previous} />;
					},
				}}
			/>
			<Stack.Screen
				name="MuseumDetailScreen"
				component={MuseumDetailScreen}
				options={{
					title: 'Museum Details',
					header: ({ scene, previous, navigation }) => {
						const { options } = scene.descriptor;
						const title =
							options.headerTitle !== undefined
								? options.headerTitle
								: options.title !== undefined
								? options.title
								: scene.route.name;

						return <HeaderComponent navigation={navigation} headerTitle={title} previous={previous} />;
					},
				}}
			/>
			<Stack.Screen
				name="AddMuseumTypeScreen"
				component={AddMuseumTypeScreen}
				options={{
					title: 'Add Museum Type',
					header: ({ scene, previous, navigation }) => {
						const { options } = scene.descriptor;
						const title =
							options.headerTitle !== undefined
								? options.headerTitle
								: options.title !== undefined
								? options.title
								: scene.route.name;

						return <HeaderComponent navigation={navigation} headerTitle={title} previous={previous} />;
					},
				}}
			/>
			<Stack.Screen
				name="AddMuseumCommentScreen"
				component={AddMuseumCommentScreen}
				options={{
					title: 'Add Museum Comment Screen',
					header: ({ scene, previous, navigation }) => {
						const { options } = scene.descriptor;
						const title =
							options.headerTitle !== undefined
								? options.headerTitle
								: options.title !== undefined
								? options.title
								: scene.route.name;

						return <HeaderComponent navigation={navigation} headerTitle={title} previous={previous} />;
					},
				}}
			/>
			<Stack.Screen
				name="AddMuseumEntranceTypeScreen"
				component={AddMuseumEntranceTypeScreen}
				options={{
					title: 'Add Museum Entrance Type Screen',
					header: ({ scene, previous, navigation }) => {
						const { options } = scene.descriptor;
						const title =
							options.headerTitle !== undefined
								? options.headerTitle
								: options.title !== undefined
								? options.title
								: scene.route.name;

						return <HeaderComponent navigation={navigation} headerTitle={title} previous={previous} />;
					},
				}}
			/>
			<Stack.Screen
				name="AddMuseumWorkingScheduleScreen"
				component={AddMuseumWorkingScheduleScreen}
				options={{
					title: 'Add Museum Working Schedule Screen',
					header: ({ scene, previous, navigation }) => {
						const { options } = scene.descriptor;
						const title =
							options.headerTitle !== undefined
								? options.headerTitle
								: options.title !== undefined
								? options.title
								: scene.route.name;

						return <HeaderComponent navigation={navigation} headerTitle={title} previous={previous} />;
					},
				}}
			/>
			<Stack.Screen
				name="AddMuseumPriceScreen"
				component={AddMuseumPriceScreen}
				options={{
					title: 'Add Museum Price Screen',
					header: ({ scene, previous, navigation }) => {
						const { options } = scene.descriptor;
						const title =
							options.headerTitle !== undefined
								? options.headerTitle
								: options.title !== undefined
								? options.title
								: scene.route.name;

						return <HeaderComponent navigation={navigation} headerTitle={title} previous={previous} />;
					},
				}}
			/>
		</Stack.Navigator>
	);
}
function ArchSiteStack() {
	return (
		<Stack.Navigator initialRouteName="ArchSiteScreen">
			<Stack.Screen
				name="ArchSiteScreen"
				component={ArchSiteScreen}
				options={{
					title: 'Archaeological Site',
					header: ({ scene, previous, navigation }) => {
						const { options } = scene.descriptor;
						const title =
							options.headerTitle !== undefined
								? options.headerTitle
								: options.title !== undefined
								? options.title
								: scene.route.name;

						return <HeaderComponent navigation={navigation} headerTitle={title} previous={previous} />;
					},
				}}
			/>
			<Stack.Screen
				name="AddArchSiteScreen"
				component={AddArchSiteScreen}
				options={{
					title: 'Add ArchSite',
					header: ({ scene, previous, navigation }) => {
						const { options } = scene.descriptor;
						const title =
							options.headerTitle !== undefined
								? options.headerTitle
								: options.title !== undefined
								? options.title
								: scene.route.name;

						return <HeaderComponent navigation={navigation} headerTitle={title} previous={previous} />;
					},
				}}
			/>
			<Stack.Screen
				name="EditArchSiteScreen"
				component={EditArchSiteScreen}
				options={{
					title: 'Edit ArchSite',
					header: ({ scene, previous, navigation }) => {
						const { options } = scene.descriptor;
						const title =
							options.headerTitle !== undefined
								? options.headerTitle
								: options.title !== undefined
								? options.title
								: scene.route.name;

						return <HeaderComponent navigation={navigation} headerTitle={title} previous={previous} />;
					},
				}}
			/>
			<Stack.Screen
				name="ArchSiteDetailScreen"
				component={ArchSiteDetailScreen}
				options={{
					title: 'ArchSite Details',
					header: ({ scene, previous, navigation }) => {
						const { options } = scene.descriptor;
						const title =
							options.headerTitle !== undefined
								? options.headerTitle
								: options.title !== undefined
								? options.title
								: scene.route.name;

						return <HeaderComponent navigation={navigation} headerTitle={title} previous={previous} />;
					},
				}}
			/>
			<Stack.Screen
				name="AddArchSiteTypeScreen"
				component={AddArchSiteTypeScreen}
				options={{
					title: 'Add ArchSite Type',
					header: ({ scene, previous, navigation }) => {
						const { options } = scene.descriptor;
						const title =
							options.headerTitle !== undefined
								? options.headerTitle
								: options.title !== undefined
								? options.title
								: scene.route.name;

						return <HeaderComponent navigation={navigation} headerTitle={title} previous={previous} />;
					},
				}}
			/>
			<Stack.Screen
				name="AddArchSiteCommentScreen"
				component={AddArchSiteCommentScreen}
				options={{
					title: 'Add ArchSite Comment Screen',
					header: ({ scene, previous, navigation }) => {
						const { options } = scene.descriptor;
						const title =
							options.headerTitle !== undefined
								? options.headerTitle
								: options.title !== undefined
								? options.title
								: scene.route.name;

						return <HeaderComponent navigation={navigation} headerTitle={title} previous={previous} />;
					},
				}}
			/>
			<Stack.Screen
				name="AddArchSiteEntranceTypeScreen"
				component={AddArchSiteEntranceTypeScreen}
				options={{
					title: 'Add ArchSite Entrance Type Screen',
					header: ({ scene, previous, navigation }) => {
						const { options } = scene.descriptor;
						const title =
							options.headerTitle !== undefined
								? options.headerTitle
								: options.title !== undefined
								? options.title
								: scene.route.name;

						return <HeaderComponent navigation={navigation} headerTitle={title} previous={previous} />;
					},
				}}
			/>
			<Stack.Screen
				name="AddArchSiteWorkingScheduleScreen"
				component={AddArchSiteWorkingScheduleScreen}
				options={{
					title: 'Add ArchSite Working Schedule Screen',
					header: ({ scene, previous, navigation }) => {
						const { options } = scene.descriptor;
						const title =
							options.headerTitle !== undefined
								? options.headerTitle
								: options.title !== undefined
								? options.title
								: scene.route.name;

						return <HeaderComponent navigation={navigation} headerTitle={title} previous={previous} />;
					},
				}}
			/>
			<Stack.Screen
				name="AddArchSitePriceScreen"
				component={AddArchSitePriceScreen}
				options={{
					title: 'Add ArchSite Price Screen',
					header: ({ scene, previous, navigation }) => {
						const { options } = scene.descriptor;
						const title =
							options.headerTitle !== undefined
								? options.headerTitle
								: options.title !== undefined
								? options.title
								: scene.route.name;

						return <HeaderComponent navigation={navigation} headerTitle={title} previous={previous} />;
					},
				}}
			/>
		</Stack.Navigator>
	);
}
function ArticleStack() {
	return (
		<Stack.Navigator initialRouteName="ArticleScreen">
			<Stack.Screen
				name="ArticleScreen"
				component={ArticleScreen}
				options={{
					title: 'Article',
					header: ({ scene, previous, navigation }) => {
						const { options } = scene.descriptor;
						const title =
							options.headerTitle !== undefined
								? options.headerTitle
								: options.title !== undefined
								? options.title
								: scene.route.name;

						return <HeaderComponent navigation={navigation} headerTitle={title} previous={previous} />;
					},
				}}
			/>
			<Stack.Screen
				name="AddArticleScreen"
				component={AddArticleScreen}
				options={{
					title: 'Add Article Screen',
					header: ({ scene, previous, navigation }) => {
						const { options } = scene.descriptor;
						const title =
							options.headerTitle !== undefined
								? options.headerTitle
								: options.title !== undefined
								? options.title
								: scene.route.name;

						return <HeaderComponent navigation={navigation} headerTitle={title} previous={previous} />;
					},
				}}
			/>
			<Stack.Screen
				name="EditArticleScreen"
				component={EditArticleScreen}
				options={{
					title: 'Edit Article Screen',
					header: ({ scene, previous, navigation }) => {
						const { options } = scene.descriptor;
						const title =
							options.headerTitle !== undefined
								? options.headerTitle
								: options.title !== undefined
								? options.title
								: scene.route.name;

						return <HeaderComponent navigation={navigation} headerTitle={title} previous={previous} />;
					},
				}}
			/>
			<Stack.Screen
				name="ArticleDetailScreen"
				component={ArticleDetailScreen}
				options={{
					title: 'Article Detail Screen',
					header: ({ scene, previous, navigation }) => {
						const { options } = scene.descriptor;
						const title =
							options.headerTitle !== undefined
								? options.headerTitle
								: options.title !== undefined
								? options.title
								: scene.route.name;

						return <HeaderComponent navigation={navigation} headerTitle={title} previous={previous} />;
					},
				}}
			/>
			<Stack.Screen
				name="AddTagScreen"
				component={AddTagScreen}
				options={{
					title: 'Add Tag Screen',
					header: ({ scene, previous, navigation }) => {
						const { options } = scene.descriptor;
						const title =
							options.headerTitle !== undefined
								? options.headerTitle
								: options.title !== undefined
								? options.title
								: scene.route.name;

						return <HeaderComponent navigation={navigation} headerTitle={title} previous={previous} />;
					},
				}}
			/>
		</Stack.Navigator>
	);
}
function TravelGuideStack() {
	return (
		<Stack.Navigator initialRouteName="TravelGuideScreen">
			<Stack.Screen
				name="TravelGuideScreen"
				component={TravelGuideScreen}
				options={{
					title: 'Travel Guide',
					header: ({ scene, previous, navigation }) => {
						const { options } = scene.descriptor;
						const title =
							options.headerTitle !== undefined
								? options.headerTitle
								: options.title !== undefined
								? options.title
								: scene.route.name;

						return <HeaderComponent navigation={navigation} headerTitle={title} previous={previous} />;
					},
				}}
			/>
			<Stack.Screen
				name="AddTravelGuideScreen"
				component={AddTravelGuideScreen}
				options={{
					title: 'Add your travel guide',
					header: ({ scene, previous, navigation }) => {
						const { options } = scene.descriptor;
						const title =
							options.headerTitle !== undefined
								? options.headerTitle
								: options.title !== undefined
								? options.title
								: scene.route.name;

						return <HeaderComponent navigation={navigation} headerTitle={title} previous={previous} />;
					},
				}}
			/>
			<Stack.Screen
				name="TravelGuideDetailScreen"
				component={TravelGuideDetailScreen}
				options={{
					title: 'Travel guide detail',
					header: ({ scene, previous, navigation }) => {
						const { options } = scene.descriptor;
						const title =
							options.headerTitle !== undefined
								? options.headerTitle
								: options.title !== undefined
								? options.title
								: scene.route.name;

						return <HeaderComponent navigation={navigation} headerTitle={title} previous={previous} />;
					},
				}}
			/>
		</Stack.Navigator>
	);
}
/**View or Fragment??? */
export default () => (
	<React.Fragment>
		<IconRegistry icons={EvaIconsPack} />

		<ApolloProvider client={client}>
			<ApplicationProvider mapping={mapping} theme={lightTheme}>
				<NavigationContainer>
					<DrawerNavigator />
				</NavigationContainer>
			</ApplicationProvider>
		</ApolloProvider>
	</React.Fragment>
);
