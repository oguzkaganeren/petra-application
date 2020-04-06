import * as React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Button, Layout, ButtonGroup, Text, ListItem, List } from '@ui-kitten/components';
import { GetRestaurantByIdComponent } from '../../../generated/components';
import StarRating from 'react-native-star-rating';
declare var global: any;
/**
 *
 */
export interface RestaurantInfoScreenProps {
	navigation: any;
	route: any;
}

/**
 * Props restaurant info screen
 * @param props
 * @returns
 */
const RestaurantInfoScreen: React.FC<RestaurantInfoScreenProps> = (props) => {
	const { restaurantID } = props.route.params;
	const [restaurantInfo, setHotelInfo] = React.useState([]);
	const [restaurantService, setRestaurantService] = React.useState([]);

	const renderItem = ({ item, index }) => (
		<ListItem
			title={item.roomNo + ' ' + (item.roomPrices.length > 0 ? '(' + item.roomPrices[0].price + ' TL' + ')' : '')}
			description={item.roomProperties.map((dat) => {
				return dat.RoomProperty.content + ', ';
			})}
		/>
	);
	return (
		<Layout style={{ flex: 1 }}>
			<GetRestaurantByIdComponent variables={{ restaurantID: restaurantID }}>
				{({ loading, error, data }) => {
					if (loading) return <Text>Loading</Text>;
					if (error) return <Text>error</Text>;

					if (data) {
						data.Restaurant.map((dat) => {
							restaurantInfo.push({
								title: dat.name,
								city: dat.Location.Address.City.city,
								address: dat.Location.Address.address,
								taxNumber: dat.taxNumber,
								district: dat.Location.Address.District.district,
								star: dat.star,
								phone: dat.Company.CompanyPhones.length > 0 ? dat.Company.CompanyPhones[0].Phone : '',
							});
						});
					}
					return (
						<Layout>
							<Text style={styles.text} category="h4">
								{restaurantInfo[0].title}
							</Text>

							<Text style={styles.text} category="s1">
								Address:{restaurantInfo[0].address} {restaurantInfo[0].district}/{restaurantInfo[0].city}
							</Text>
							<Text style={styles.text} category="p1">
								Tax Number:{restaurantInfo[0].taxNumber}
							</Text>
							<Text style={styles.text} category="p1">
								Phone:{restaurantInfo[0].phone}
							</Text>
							<StarRating
								containerStyle={{ width: Dimensions.get('window').width / 8 }}
								disabled={false}
								emptyStar={'ios-star-outline'}
								fullStar={'ios-star'}
								halfStar={'ios-star-half'}
								iconSet={'Ionicons'}
								maxStars={5}
								rating={restaurantInfo[0].star}
								starSize={25}
								fullStarColor={'orange'}
							/>
						</Layout>
					);
				}}
			</GetRestaurantByIdComponent>
		</Layout>
	);
};

const styles: any = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
});
export default RestaurantInfoScreen;
