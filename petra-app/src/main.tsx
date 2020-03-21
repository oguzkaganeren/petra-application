import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { HomeScreen } from './app/pages/screens/HomeScreen';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { HeaderComponent } from '../src/app/components/Public/HeaderComponent';
import { LoginScreen } from './app/pages/screens/LoginScreen';
import { AddCompanyScreen } from './app/pages/screens/Company/AddCompanyScreen';
import { AddRestaurantScreen } from './app/pages/screens/Restaurant/AddRestaurantScreen';
import { RestaurantDetailScreen } from './app/pages/screens/Restaurant/RestaurantDetailScreen';
import { AddFoodTypeScreen } from './app/pages/screens/Restaurant/AddFoodTypeScreen';
import { AddFoodScreen } from './app/pages/screens/Restaurant/AddFoodScreen';
import { AddHotelScreen } from './app/pages/screens/Hotel/AddHotelScreen';
import { ArchSiteDetailScreen } from './app/pages/screens/ArchSite/ArchSiteDetailScreen';
import { AddArchSiteTypeScreen } from './app/pages/screens/ArchSite/AddArchSiteTypeScreen';
import { HotelDetailScreen } from './app/pages/screens/Hotel/HotelDetailScreen';
import { AddRoomPropertyScreen } from './app/pages/screens/Hotel/AddRoomPropertyScreen';
import { AddRoomScreen } from './app/pages/screens/Hotel/AddRoomScreen';
import { AddHotelServicePropertyScreen } from './app/pages/screens/Hotel/AddHotelServicePropertyScreen';
import { AddHotelCommentScreen } from './app/pages/screens/Hotel/AddHotelCommentScreen';
import { AddHotelRoomPriceScreen } from './app/pages/screens/Hotel/AddHotelRoomPrice';
import { AddArchSiteScreen } from './app/pages/screens/ArchSite/AddArchSiteScreen';
import { AddArchSiteCommentScreen } from './app/pages/screens/ArchSite/AddArchSiteCommentScreen';
import { AddArchSiteEntranceTypeScreen } from './app/pages/screens/ArchSite/AddArchSiteEnterenceTypeScreen';
import { AddRestaurantCuisineTypeScreen } from './app/pages/screens/Restaurant/AddRestaurantCuisineTypeScreen';
import { ArticleDetailScreen } from './app/pages/screens/Article/ArticleDetailScreen';
import { AddTagScreen } from './app/pages/screens/Article/AddTagScreen';
import { AddRestaurantTypeScreen } from './app/pages/screens/Restaurant/AddRestaurantTypeScreen';
import { AddMenuScreen } from './app/pages/screens/Restaurant/AddMenuScreen';
import { AddRestaurantCommentScreen } from './app/pages/screens/Restaurant/AddRestaurantCommentScreen';
import { MuseumDetailScreen } from './app/pages/screens/Museum/MuseumDetailScreen';
import { AddMuseumTypeScreen } from './app/pages/screens/Museum/AddMuseumTypeScreen';
import { AddMuseumScreen } from './app/pages/screens/Museum/AddMuseumScreen';
import { AddMuseumCommentScreen } from './app/pages/screens/Museum/AddMuseumCommentScreen';
import { AddMuseumEntranceTypeScreen } from './app/pages/screens/Museum/AddMuseumEntranceTypeScreen';
import { MapScreen } from './app/pages/screens/MapScreen';
import { HotelMapScreen } from './app/pages/screens/Hotel/HotelMapScreen';
import { ArchSiteMapScreen } from './app/pages/screens/ArchSite/ArchSiteMapScreen';
import { MuseumMapScreen } from './app/pages/screens/Museum/MuseumMapScreen';
import { RestaurantMapScreen } from './app/pages/screens/Restaurant/RestaurantMapScreen';
import { AddArchSiteWorkingScheduleScreen } from './app/pages/screens/ArchSite/AddArchSiteWorkingScheduleScreen';
import { AddArchSitePriceScreen } from './app/pages/screens/ArchSite/AddArchSitePriceScreen';
import { AddMuseumPriceScreen } from './app/pages/screens/Museum/AddMuseumPriceScreen';
import { AddMuseumWorkingScheduleScreen } from './app/pages/screens/Museum/AddMuseumWorkingScheduleScreen';
import { AddRestaurantWorkingScheduleScreen } from './app/pages/screens/Restaurant/AddRestaurantWorkingScheduleScreen';
import { AddTravelGuideScreen } from './app/pages/screens/TravelGuide/AddTravelGuideScreen';
import { AddArticleScreen } from './app/pages/screens/Article/AddArticleScreen';
import { SearchScreen } from './app/pages/screens/Search/SearchScreen';
// Graphql modules
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// Pass your GraphQL endpoint to uri
const client = new ApolloClient({ uri: 'http://192.168.1.108:8080/v1/graphql' });
const MyHeader = navigation => {
	return {
		header: props => <HeaderComponent headerTitle={navigation.getParam('title')} />
	};
};
/**
 * Define navigator
 */
const RootStack = createStackNavigator(
	{
		HomeScreen: { screen: HomeScreen },
		LoginScreen: { screen: LoginScreen },
		AddCompanyScreen: { screen: AddCompanyScreen },
		AddRestaurantScreen: { screen: AddRestaurantScreen },
		RestaurantDetailScreen: { screen: RestaurantDetailScreen },
		AddFoodTypeScreen: { screen: AddFoodTypeScreen },
		AddFoodScreen: { screen: AddFoodScreen },
		AddHotelScreen: { screen: AddHotelScreen },
		ArchSiteDetailScreen: { screen: ArchSiteDetailScreen },
		AddArchSiteTypeScreen: { screen: AddArchSiteTypeScreen },
		HotelDetailScreen: { screen: HotelDetailScreen },
		AddRoomPropertyScreen: { screen: AddRoomPropertyScreen },
		AddRoomScreen: { screen: AddRoomScreen },
		AddHotelServicePropertyScreen: { screen: AddHotelServicePropertyScreen },
		AddHotelCommentScreen: { screen: AddHotelCommentScreen },
		AddHotelRoomPriceScreen: { screen: AddHotelRoomPriceScreen },
		AddArchSiteScreen: { screen: AddArchSiteScreen },
		AddArchSiteCommentScreen: { screen: AddArchSiteCommentScreen },
		AddArchSiteEntranceTypeScreen: { screen: AddArchSiteEntranceTypeScreen },
		AddRestaurantCuisineTypeScreen: { screen: AddRestaurantCuisineTypeScreen },
		ArticleDetailScreen: { screen: ArticleDetailScreen },
		AddTagScreen: { screen: AddTagScreen },
		AddRestaurantTypeScreen: { screen: AddRestaurantTypeScreen },
		AddRestaurantCommentScreen: { screen: AddRestaurantCommentScreen },
		MuseumDetailScreen: { screen: MuseumDetailScreen },
		AddMuseumTypeScreen: { screen: AddMuseumTypeScreen },
		AddMuseumScreen: { screen: AddMuseumScreen },
		AddMuseumCommentScreen: { screen: AddMuseumCommentScreen },
		AddMuseumEntranceTypeScreen: { screen: AddMuseumEntranceTypeScreen },
		MapScreen: { screen: MapScreen },
		HotelMapScreen: { screen: HotelMapScreen },
		ArchSiteMapScreen: { screen: ArchSiteMapScreen },
		MuseumMapScreen: { screen: MuseumMapScreen },
		RestaurantMapScreen: { screen: RestaurantMapScreen },
		AddArchSiteWorkingScheduleScreen: { screen: AddArchSiteWorkingScheduleScreen },
		AddMuseumWorkingScheduleScreen: { screen: AddMuseumWorkingScheduleScreen },
		AddRestaurantWorkingScheduleScreen: { screen: AddRestaurantWorkingScheduleScreen },
		AddArchSitePriceScreen: { screen: AddArchSitePriceScreen },
		AddMuseumPriceScreen: { screen: AddMuseumPriceScreen },
		AddTravelGuideScreen: { screen: AddTravelGuideScreen },
		AddMenuScreen: { screen: AddMenuScreen },
		AddArticleScreen: { screen: AddArticleScreen },
		SearchScreen: { screen: SearchScreen }
	},
	{
		initialRouteName: 'HomeScreen',
		defaultNavigationOptions: ({ navigation }) => {
			return MyHeader(navigation);
		}
	}
);
const App = createAppContainer(RootStack);
/**View or Fragment??? */
export default () => (
	<React.Fragment>
		<IconRegistry icons={EvaIconsPack} />
		<ApolloProvider client={client}>
			<ApplicationProvider mapping={mapping} theme={lightTheme}>
				<App />
			</ApplicationProvider>
		</ApolloProvider>
	</React.Fragment>
);
