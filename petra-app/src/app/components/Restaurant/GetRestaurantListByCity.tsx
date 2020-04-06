import * as React from 'react';
import { StyleSheet, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { Button, Icon, List, ListItem, Layout, Text } from '@ui-kitten/components';
import { GetRestaurantByCityComponent } from '../../generated/components';
import StarRating from 'react-native-star-rating';
/**
 * Home props
 */
export interface GetRestaurantListByCityProps {
	navigation: any;
	route: any;
}

/**
 * Home
 */
const GetRestaurantListByCity: React.FC<GetRestaurantListByCityProps> = (props) => {
	const [restaurantList, setRestaurantList] = React.useState([]);
	const [removeItemBool, setRemoveItemBool] = React.useState(false);
	const { cityID } = props.route.params;
	function renderItemAccessory(item) {
		return (
			<Layout>
				<Text appearance="hint">
					{item.district}/{item.city}
				</Text>
				<StarRating
					disabled={false}
					emptyStar={'ios-star-outline'}
					fullStar={'ios-star'}
					halfStar={'ios-star-half'}
					iconSet={'Ionicons'}
					maxStars={5}
					rating={item.star}
					starSize={25}
					fullStarColor={'orange'}
				/>
			</Layout>
		);
	}
	const renderItemIcon = (style) => <Icon {...style} name="briefcase-outline" />;
	const renderItem = ({ item, index }) => {
		return (
			<ListItem
				key={item.key}
				title={`${item.title}`}
				icon={renderItemIcon}
				accessory={() => renderItemAccessory(item)}
				onPress={() => {
					props.navigation.navigate('RestaurantInfoScreen', {
						restaurantID: item.key,
					});
				}}
			/>
		);
	};
	return (
		<Layout style={{ flex: 1 }}>
			<GetRestaurantByCityComponent variables={{ cityID: cityID }}>
				{({ loading, error, data }) => {
					if (loading) return <Text>Loading</Text>;
					if (error) return <Text>error</Text>;

					if (data) {
						data.Restaurant.map((dat) => {
							if (restaurantList.length > 0 && !removeItemBool) {
								if (restaurantList.every((item) => item.key != dat.restaurantID)) {
									restaurantList.push({
										key: dat.restaurantID,
										title: dat.name,
										city: dat.Location.Address.City.city,
										district: dat.Location.Address.District.district,
										star: dat.star,
									});
								}
							} else if (!removeItemBool) {
								restaurantList.push({
									key: dat.restaurantID,
									title: dat.name,
									city: dat.Location.Address.City.city,
									district: dat.Location.Address.District.district,
									star: dat.star,
								});
							}
						});
					}
					return <List data={restaurantList} renderItem={renderItem} />;
				}}
			</GetRestaurantByCityComponent>
		</Layout>
	);
};

const styles: any = StyleSheet.create({
	mapStyle: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height / 2,
	},
});
export default GetRestaurantListByCity;
