import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Button, Icon, List, ListItem, Layout, Text, Spinner } from '@ui-kitten/components';
import { GetHotelByCityComponent } from '../../generated/components';
import StarRating from 'react-native-star-rating';

export interface GetHotelListByCityProps {
	navigation: any;
	route: any;
}

const GetHotelListByCity: React.FC<GetHotelListByCityProps> = (props) => {
	const [hotelList, setHotelList] = React.useState([]);
	const [removeItemBool, setRemoveItemBool] = React.useState(false);
	const cityID = props.route.params != undefined ? props.route.params : undefined;
	const regionID = props.route.params != undefined ? props.route.params : undefined;
	const hotelVariable =
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
				description={`${item.description}`}
				icon={renderItemIcon}
				accessory={() => renderItemAccessory(item)}
				onPress={() => {
					props.navigation.navigate('HotelInfoScreen', {
						hotelID: item.key,
					});
				}}
			/>
		);
	};
	return (
		<Layout style={{ flex: 1 }}>
			<GetHotelByCityComponent variables={hotelVariable}>
				{({ loading, error, data }) => {
					if (loading) return <Spinner size="giant" />;
					if (error) return <Text>error</Text>;

					if (data) {
						data.Hotel.map((dat) => {
							if (hotelList.length > 0 && !removeItemBool) {
								if (hotelList.every((item) => item.key != dat.hotelID)) {
									hotelList.push({
										key: dat.hotelID,
										title: dat.name,
										city: dat.Location.Address.City.city,
										district: dat.Location.Address.District.district,
										description: dat.description == null ? '' : dat.description,
										star: dat.star,
									});
								}
							} else if (!removeItemBool) {
								hotelList.push({
									key: dat.hotelID,
									title: dat.name,
									city: dat.Location.Address.City.city,
									district: dat.Location.Address.District.district,
									description: dat.description == null ? '' : dat.description,
									star: dat.star,
								});
							}
						});
					}
					return <List data={hotelList} renderItem={renderItem} />;
				}}
			</GetHotelByCityComponent>
		</Layout>
	);
};

const styles: any = StyleSheet.create({
	mapStyle: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height / 2,
	},
});
export default GetHotelListByCity;
