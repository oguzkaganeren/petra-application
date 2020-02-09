import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { HomeScreen } from './app/pages/screens/HomeScreen';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { HeaderComponent } from '../src/app/components/HeaderComponent';
import { LoginScreen } from './app/pages/screens/LoginScreen';
import { AddLocationScreen } from './app/pages/screens/AddLocationScreen';
import { AddCompanyScreen } from './app/pages/screens/AddCompanyScreen';
import { AddRestaurantScreen } from './app/pages/screens/AddRestaurantScreen';
import { RestaurantDetailScreen } from './app/pages/screens/RestaurantDetailScreen';
import { AddFoodTypeScreen } from './app/pages/screens/AddFoodTypeScreen';
import { AddFoodScreen } from './app/pages/screens/AddFoodScreen';
import { AddHotelScreen } from './app/pages/screens/AddHotelScreen';
import { ArchSiteDetailScreen } from './app/pages/screens/ArchSiteDetailScreen';
import { AddArchSiteTypeScreen } from './app/pages/screens/AddArchSiteTypeScreen';
import { HotelDetailScreen } from './app/pages/screens/HotelDetailScreen';
import { AddRoomPropertyScreen } from './app/pages/screens/AddRoomPropertyScreen';
import { AddRoomScreen } from './app/pages/screens/AddRoomScreen';
import { AddHotelServicePropertyScreen } from './app/pages/screens/AddHotelServicePropertyScreen';
import { AddHotelCommentScreen } from './app/pages/screens/AddHotelCommentScreen';
import { AddHotelRoomPriceScreen } from './app/pages/screens/AddHotelRoomPrice';
import { AddArchSiteScreen } from './app/pages/screens/AddArchSiteScreen';
import { AddArchSiteCommentScreen } from './app/pages/screens/AddArchSiteCommentScreen';
import { AddArchSiteEntranceTypeScreen } from './app/pages/screens/AddArchSiteEnterenceTypeScreen';
import { AddRestaurantCuisineTypeScreen } from './app/pages/screens/AddRestaurantCuisineTypeScreen';
import { ArticleDetailScreen } from './app/pages/screens/ArticleDetailScreen';
import { AddTagScreen } from './app/pages/screens/AddTagScreen';
import { AddRestaurantTypeScreen } from './app/pages/screens/AddRestaurantTypeScreen';
import { AddRestaurantCommentScreen } from './app/pages/screens/AddRestaurantCommentScreen';
import { MuseumDetailScreen } from './app/pages/screens/MuseumDetailScreen';
import { AddMuseumTypeScreen } from './app/pages/screens/AddMuseumTypeScreen';
import { MapScreen } from './app/pages/screens/MapScreen';
import { HotelMapScreen } from './app/pages/screens/HotelMapScreen';
import { ArchSiteMapScreen } from './app/pages/screens/ArchSiteMapScreen';
import { MuseumMapScreen } from './app/pages/screens/MuseumMapScreen';
import { RestaurantMapScreen } from './app/pages/screens/RestaurantMapScreen';
import { AddArchSiteWorkingScheduleScreen } from './app/pages/screens/AddArchSiteWorkingScheduleScreen';
import { AddMuseumWorkingScheduleScreen } from './app/pages/screens/AddMuseumWorkingScheduleScreen';
import { AddRestaurantWorkingScheduleScreen } from './app/pages/screens/AddRestaurantWorkingScheduleScreen';
// Graphql modules
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// Pass your GraphQL endpoint to uri
const client = new ApolloClient({ uri: 'http://192.168.1.102:8080/v1/graphql' });
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
		AddLocationScreen: { screen: AddLocationScreen },
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
		MapScreen: { screen: MapScreen },
		HotelMapScreen: { screen: HotelMapScreen },
		ArchSiteMapScreen: { screen: ArchSiteMapScreen },
		MuseumMapScreen: { screen: MuseumMapScreen },
		RestaurantMapScreen: { screen: RestaurantMapScreen },
		AddArchSiteWorkingScheduleScreen: { screen: AddArchSiteWorkingScheduleScreen },
		AddMuseumWorkingScheduleScreen: { screen: AddMuseumWorkingScheduleScreen },
		AddRestaurantWorkingScheduleScreen: { screen: AddRestaurantWorkingScheduleScreen }
	},
	{
		initialRouteName: 'LoginScreen',
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
