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
import { AddHotelScreen } from './app/pages/screens/AddHotelScreen';
// Graphql modules
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// Pass your GraphQL endpoint to uri
const client = new ApolloClient({ uri: 'http://95.183.155.183:8080/v1/graphql' });
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
		AddHotelScreen: { screen: AddHotelScreen }
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
