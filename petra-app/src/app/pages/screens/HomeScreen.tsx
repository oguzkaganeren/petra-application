import * as React from 'react';
import {
	StyleSheet,
	Dimensions,
	View,
	TouchableHighlight,
	ImageBackground,
	SafeAreaView,
	ScrollView,
} from 'react-native';
import { BottomNavigation, BottomNavigationTab, TabBar, Layout, Tab, Icon } from '@ui-kitten/components';
import { SearchScreen } from '../screens/Search/SearchScreen';
import GetArticleList from '../../components/Article/GetArticleList';
import { NavigationContainer } from '@react-navigation/native';
import GetAllCitiesComponentCard from '../../components/Public/GetAllCitiesComponentCard';
import SettingScreen from '../screens/SettingScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Linking from 'expo-linking';

declare var global: any;

export interface HomeProps {
	navigation: any;
	route: any;
}

const HomeScreen: React.FC<HomeProps> = (props) => {
	const [userID, setUserID] = React.useState(-1);
	const [selectedIndex, setSelectedIndex] = React.useState(0);
	const BottomTab = createBottomTabNavigator();
	const shouldLoadComponent = (index) => index === selectedIndex;
	const SearchIcon = (style) => <Icon {...style} name="search-outline" />;

	const FlagIcon = (style) => <Icon {...style} name="flag-outline" />;

	const SettingsIcon = (style) => <Icon {...style} name="settings-outline" />;
	React.useEffect(() => {
		const unsubscribe = props.navigation.addListener('focus', () => {
			if (userID != global.userID && global.userID != undefined) {
				setUserID(global.userID);
			}
		});

		// Return the function to unsubscribe from the event so it gets removed on unmount
		return unsubscribe;
	}, [props.navigation]);
	React.useEffect(() => {
		Linking.getInitialURL()
			.then((url) => {
				Linking.addEventListener('url', _handleUrl);
			})
			.catch((error) => console.error(error));
	});
	const _handleUrl = (url) => {
		let linking = Linking.parse(url.url);
		if (linking.path == 'travelguide') {
			let getTravelGuideID = linking.queryParams.id;
			props.navigation.navigate('TravelGuideDetailScreen', {
				travelGuideID: getTravelGuideID,
			});
			console.log('ok');
		}
		Linking.removeEventListener('url', _handleUrl);
	};
	const HomeScreenCon = () => (
		<Layout style={[{ justifyContent: 'center', alignItems: 'center' }, styles.tabContainer]}>
			<GetAllCitiesComponentCard navigation={props.navigation} route={props.route} />
			<GetArticleList />
		</Layout>
	);

	const SearchScreenCon = () => (
		<Layout style={styles.tabContainer}>
			<SearchScreen navigation={props.navigation} route={props.route} />
		</Layout>
	);
	const SettingScreenCon = () => (
		<Layout style={styles.tabContainer}>
			<SettingScreen navigation={props.navigation} />
		</Layout>
	);
	const BottomTabBar = ({ navigation, state }) => {
		const onSelect = (index) => {
			navigation.navigate(state.routeNames[index]);
		};
		if (userID == -1) {
			return (
				<SafeAreaView>
					<BottomNavigation
						style={{ backgroundColor: '#222B45', height: Dimensions.get('window').height / 9 }}
						selectedIndex={state.index}
						indicatorStyle={{ backgroundColor: '#ffaa00' }}
						onSelect={onSelect}
					>
						<BottomNavigationTab title="Explore" icon={FlagIcon} />
					</BottomNavigation>
				</SafeAreaView>
			);
		} else {
			return (
				<SafeAreaView>
					<BottomNavigation
						style={{ backgroundColor: '#222B45', height: Dimensions.get('window').height / 9 }}
						selectedIndex={state.index}
						indicatorStyle={{ backgroundColor: '#ffaa00' }}
						onSelect={onSelect}
					>
						<BottomNavigationTab title="Explore" icon={FlagIcon} />
						<BottomNavigationTab title="Search" icon={SearchIcon} />
						<BottomNavigationTab title="Settings" icon={SettingsIcon} />
					</BottomNavigation>
				</SafeAreaView>
			);
		}
	};
	const TabNavigator = () => {
		if (userID == -1) {
			return (
				<BottomTab.Navigator tabBar={(props) => <BottomTabBar {...props} />}>
					<BottomTab.Screen name="Explore" component={HomeScreenCon} />
				</BottomTab.Navigator>
			);
		} else {
			return (
				<BottomTab.Navigator tabBar={(props) => <BottomTabBar {...props} />}>
					<BottomTab.Screen name="Explore" component={HomeScreenCon} />
					<BottomTab.Screen name="Search" component={SearchScreenCon} />
					<BottomTab.Screen name="Settings" component={SettingScreenCon} />
				</BottomTab.Navigator>
			);
		}
	};

	return <TabNavigator />;
};

const styles: any = StyleSheet.create({
	tabContainer: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height - Dimensions.get('window').height / 6,
	},
});
export default HomeScreen;
