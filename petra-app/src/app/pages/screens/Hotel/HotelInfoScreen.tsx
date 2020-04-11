import * as React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Button, Layout, ButtonGroup, Text, ListItem, List } from '@ui-kitten/components';
import { GetHotelByIdComponent } from '../../../generated/components';
import { GetHotelServicesComponent } from '../../../generated/components';
import { GetHotelRoomsComponent } from '../../../generated/components';
import StarRating from 'react-native-star-rating';
import { Formik } from 'formik';
import * as Yup from 'yup';
declare var global: any;
/**
 * AddHotel props
 */
export interface HotelInfoScreenProps {
	navigation: any;
	route: any;
}

/**
 * AddHotel
 */
const HotelInfoScreen: React.FC<HotelInfoScreenProps> = (props) => {
	const { hotelID } = props.route.params;
	const [hotelInfo, setHotelInfo] = React.useState([]);
	const [hotelService, setHotelService] = React.useState([]);
	const [hotelRoom, setHotelRoom] = React.useState([]);

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
			<GetHotelByIdComponent variables={{ hotelID: hotelID }}>
				{({ loading, error, data }) => {
					if (loading) return <Text>Loading</Text>;
					if (error) return <Text>error</Text>;

					if (data) {
						data.Hotel.map((dat) => {
							hotelInfo.push({
								title: dat.name,
								city: dat.Location.Address.City.city,
								address: dat.Location.Address.address,
								taxNumber: dat.taxNumber,
								district: dat.Location.Address.District.district,
								description: dat.description == null ? '' : dat.description,
								star: dat.star,
								phone: dat.Company.CompanyPhones.length > 0 ? dat.Company.CompanyPhones[0].Phone : '',
							});
						});
					}
					return (
						<Layout>
							<Text style={styles.text} category="h4">
								{hotelInfo[0].title}
							</Text>
							<Text>{hotelInfo[0].description}</Text>

							<Text style={styles.text} category="s1">
								Address:{hotelInfo[0].address} {hotelInfo[0].district}/{hotelInfo[0].city}
							</Text>
							<Text style={styles.text} category="p1">
								Tax Number:{hotelInfo[0].taxNumber}
							</Text>
							<Text style={styles.text} category="p1">
								Phone:{hotelInfo[0].phone}
							</Text>
							<StarRating
								containerStyle={{ width: Dimensions.get('window').width / 8 }}
								disabled={false}
								emptyStar={'ios-star-outline'}
								fullStar={'ios-star'}
								halfStar={'ios-star-half'}
								iconSet={'Ionicons'}
								maxStars={5}
								rating={hotelInfo[0].star}
								starSize={25}
								fullStarColor={'orange'}
							/>
						</Layout>
					);
				}}
			</GetHotelByIdComponent>

			<GetHotelServicesComponent variables={{ hotelID: hotelID }}>
				{({ loading, error, data }) => {
					if (loading) return <Text>Loading</Text>;
					if (error) return <Text>error</Text>;

					if (data) {
						data.HotelService.map((dat) => {
							if (hotelService.length > 0) {
								if (hotelService.every((item) => item.content != dat.HotelServiceProperty.content)) {
									hotelService.push({
										content: dat.HotelServiceProperty.content,
									});
								}
							} else {
								hotelService.push({
									content: dat.HotelServiceProperty.content,
								});
							}
						});
					}
					return (
						<Layout style={styles.container}>
							<Text style={{ marginTop: 8 }} category="s1">
								Services:
							</Text>
							<ButtonGroup style={{ marginLeft: 5 }} appearance="outline">
								{hotelService.map((dat) => {
									return <Button>{dat.content}</Button>;
								})}
							</ButtonGroup>
						</Layout>
					);
				}}
			</GetHotelServicesComponent>

			<GetHotelRoomsComponent variables={{ hotelID: hotelID }}>
				{({ loading, error, data }) => {
					if (loading) return <Text>Loading</Text>;
					if (error) return <Text>error</Text>;

					if (data) {
						data.HotelRoom.map((dat) => {
							if (hotelRoom.length > 0) {
								if (hotelRoom.every((item) => item.roomID != dat.Room.roomID)) {
									hotelRoom.push({
										roomID: dat.Room.roomID,
										roomNo: dat.Room.roomNo,
										roomPrices: dat.Room.RoomPrices,
										roomProperties: dat.Room.RoomPropertyRooms,
									});
								}
							} else {
								hotelRoom.push({
									roomID: dat.Room.roomID,
									roomNo: dat.Room.roomNo,
									roomPrices: dat.Room.RoomPrices,
									roomProperties: dat.Room.RoomPropertyRooms,
								});
							}
						});
					}
					return (
						<Layout>
							<Text style={styles.text} category="h6">
								Rooms
							</Text>
							<List data={hotelRoom} renderItem={renderItem} />
						</Layout>
					);
				}}
			</GetHotelRoomsComponent>
		</Layout>
	);
};

const styles: any = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
});
export default HotelInfoScreen;
