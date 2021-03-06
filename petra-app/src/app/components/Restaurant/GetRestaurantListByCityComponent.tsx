import * as React from 'react';
import { StyleSheet, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { Button, Icon, List, ListItem, Layout, Text, Spinner } from '@ui-kitten/components';
import { GetRestaurantByCityComponent } from '../../generated/components';
import StarRating from 'react-native-star-rating';

export interface GetRestaurantListByCityProps {
	navigation: any;
	route: any;
}

const GetRestaurantListByCityComponent: React.FC<GetRestaurantListByCityProps> = (props) => {
	const [restaurantList, setRestaurantList] = React.useState([]);
	const [removeItemBool, setRemoveItemBool] = React.useState(false);
	const cityID = props.route.params != undefined ? props.route.params : undefined;
	const regionID = props.route.params != undefined ? props.route.params : undefined;
	const restaurantVariable =
		cityID != undefined ? { cityID: cityID } : regionID != undefined ? { regionID: regionID } : null;
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
			<GetRestaurantByCityComponent variables={restaurantVariable}>
				{({ loading, error, data }) => {
					if (loading) return <Spinner size="giant" />;
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
export default GetRestaurantListByCityComponent;
