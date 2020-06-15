import * as React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Button, Layout, Calendar, Text, ListItem, List, Spinner } from '@ui-kitten/components';
import { GetRestaurantByIdComponent } from '../../../generated/components';
import { GetRestaurantMenuByResIdComponent } from '../../../generated/components';
import GetRestaurantWorkingScListComponent from '../../../components/Restaurant/GetRestaurantWorkingScList';
import StarRating from 'react-native-star-rating';
declare var global: any;

export interface RestaurantInfoScreenProps {
	navigation: any;
	route: any;
	restaurantID: any;
}

const RestaurantInfoScreen: React.FC<RestaurantInfoScreenProps> = (props) => {
	const { restaurantID } = props.route.params;
	const [restaurantInfo, setHotelInfo] = React.useState([]);
	const [restaurantMenu, setRestaurantMenu] = React.useState([]);
	const [selectedDateWorking, setSelectedDateWorking] = React.useState(null);
	const [workingDetails, setWorkingDetails] = React.useState([]);
	const renderItem = ({ item, index }) => (
		<ListItem
			title={item.name + ' ' + (item.price > 0 ? '(' + item.price + ' TL' + ')' : '')}
			description={item.menuFoods.map((dat) => {
				return dat.RestaurantFood.name + ', ';
			})}
		/>
	);

	const DayCellWorking = ({ date }, style) => {
		return (
			<View style={[styles.dayContainer, style.container]}>
				<Text style={style.text}>{`${date.getDate()}`}</Text>
				{workingDetails.length > 0
					? workingDetails[0].map((data) => {
							let startDate = new Date(data.startDate);
							let finishDate = new Date(data.finishDate);
							if (date >= startDate && date <= finishDate) {
								let workingSchedule = data.RestaurantWorkingDaySchedules;
								let dayID;
								let openHour;
								let closeHour;
								workingSchedule.map((wsData) => {
									if (date.getDay() == wsData.RestaurantWorkingDay.dayID) {
										console.log(wsData.RestaurantWorkingDay.openHour);
										dayID = wsData.RestaurantWorkingDay.dayID;
										openHour = wsData.RestaurantWorkingDay.openHour;
										closeHour = wsData.RestaurantWorkingDay.closeHour;
									}
								});
								if (date.getDay() == dayID) {
									return (
										<View>
											<Text style={[style.text, styles.value]}>{`${openHour.substring(0, 5)}`}</Text>
											<Text style={[style.text, styles.value]}>{`${''}`}</Text>
											<Text style={[style.text, styles.value]}>{`${closeHour.substring(0, 5)}`}</Text>
										</View>
									);
								}
							}
					  })
					: null}
			</View>
		);
	};
	return (
		<Layout style={{ flex: 1, padding: 40 }}>
			<GetRestaurantByIdComponent variables={{ restaurantID: restaurantID }}>
				{({ loading, error, data }) => {
					if (loading) return <Spinner size="giant" />;
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
								phone: dat.Company.CompanyPhones.length > 0 ? dat.Company.CompanyPhones[0].Phone.phone : '',
							});
							workingDetails.push(dat.RestaurantWorkingSchedules);
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
							<View style={{ marginLeft: 40 }}>
								<Text category="h6">Working Schedule Details</Text>
								<Calendar date={selectedDateWorking} onSelect={setSelectedDateWorking} renderDay={DayCellWorking} />
							</View>
						</Layout>
					);
				}}
			</GetRestaurantByIdComponent>
			<GetRestaurantMenuByResIdComponent variables={{ restaurantID: restaurantID }}>
				{({ loading, error, data }) => {
					if (loading) return <Spinner size="giant" />;
					if (error) return <Text>error</Text>;

					if (data) {
						data.RestaurantMenu.map((dat) => {
							if (restaurantMenu.length > 0) {
								if (restaurantMenu.every((item) => item.restaurantMenuID != dat.restaurantMenuID)) {
									restaurantMenu.push({
										restaurantMenuID: dat.restaurantMenuID,
										name: dat.name,
										price: dat.price,
										menuFoods: dat.RestaurantMenuFoods,
									});
								}
							} else {
								restaurantMenu.push({
									restaurantMenuID: dat.restaurantMenuID,
									name: dat.name,
									price: dat.price,
									menuFoods: dat.RestaurantMenuFoods,
								});
							}
						});
					}
					return (
						<Layout>
							<Text style={styles.text} category="h6">
								Menus:
							</Text>
							<List data={restaurantMenu} renderItem={renderItem} />
						</Layout>
					);
				}}
			</GetRestaurantMenuByResIdComponent>
			<Text category={'h5'}>Working Schedules</Text>
			<GetRestaurantWorkingScListComponent
				navigation={props.navigation}
				route={props.route}
				restaurantID={restaurantID}
			/>
		</Layout>
	);
};

const styles: any = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	dayContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		aspectRatio: 1,
	},
	value: {
		fontSize: 12,
		fontWeight: '400',
	},
	priceWork: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
export default RestaurantInfoScreen;
