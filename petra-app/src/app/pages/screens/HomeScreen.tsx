import * as React from 'react';
import { StyleSheet, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { TabView, BottomNavigationTab, Layout, Text, Icon } from '@ui-kitten/components';
import { SearchScreen } from '../screens/Search/SearchScreen';
import GetArticleList from '../../components/Article/GetArticleList';

declare var global: any;

export interface HomeProps {
	navigation: any;
	route: any;
}

const HomeScreen: React.FC<HomeProps> = props => {
	const [userID, setUserID] = React.useState(-1);
	const [selectedIndex, setSelectedIndex] = React.useState(0);

	const shouldLoadComponent = index => index === selectedIndex;
	const SearchIcon = style => <Icon {...style} name="search-outline" />;

	const FlagIcon = style => <Icon {...style} name="flag-outline" />;

	const SettingsIcon = style => <Icon {...style} name="settings-outline" />;
	React.useEffect(() => {
		const unsubscribe = props.navigation.addListener('focus', () => {
			if (userID != global.userID && global.userID != undefined) {
				setUserID(global.userID);
			}
		});

		// Return the function to unsubscribe from the event so it gets removed on unmount
		return unsubscribe;
	}, [props.navigation]);
	if (userID == -1) {
		return (
			<Layout style={{ flex: 1 }}>
				<GetArticleList />
			</Layout>
		);
	} else {
		return (
			<TabView selectedIndex={selectedIndex} shouldLoadComponent={shouldLoadComponent} onSelect={setSelectedIndex}>
				<BottomNavigationTab title="Explore" icon={FlagIcon}>
					<Layout style={styles.tabContainer}>
						<GetArticleList />
					</Layout>
				</BottomNavigationTab>
				<BottomNavigationTab title="Search" icon={SearchIcon}>
					<Layout style={styles.tabContainer}>
						<SearchScreen navigation={props.navigation} route={props.route} />
					</Layout>
				</BottomNavigationTab>
				<BottomNavigationTab title="Settings" icon={SettingsIcon}>
					<Layout style={styles.tabContainer}>
						<Text>List of transactions.</Text>
					</Layout>
				</BottomNavigationTab>
			</TabView>
		);
	}
};

const styles: any = StyleSheet.create({
	tabContainer: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height
	}
});
export default HomeScreen;
