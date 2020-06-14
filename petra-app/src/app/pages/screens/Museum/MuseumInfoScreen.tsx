import * as React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Button, Layout, ButtonGroup, Text, Calendar, Spinner } from '@ui-kitten/components';
import { GetMuseumByIdComponent } from '../../../generated/components';

declare var global: any;

export interface ArchSiteInfoScreenProps {
	navigation: any;
	route: any;
	museumID: any;
}

const ArchSiteInfoScreen: React.FC<ArchSiteInfoScreenProps> = (props) => {
	const { museumID } = props.route.params;
	const [museumInfo, setMuseumInfo] = React.useState([]);
	const [selectedDate, setSelectedDate] = React.useState(null);
	const [selectedDateWorking, setSelectedDateWorking] = React.useState(null);
	const [priceDetails, setPriceDetails] = React.useState([]);
	const [workingDetails, setWorkingDetails] = React.useState([]);

	const DayCellPrice = ({ date }, style) => {
		let price = -1;
		let entranceType = '';

		return (
			<View style={[styles.dayContainer, style.container]}>
				<Text style={style.text}>{`${date.getDate()}`}</Text>
				{priceDetails[0].map((data) => {
					let startDate = new Date(data.startDate);
					let finishDate = new Date(data.finishDate);
					if (date >= startDate && date <= finishDate) {
						//console.log(date + '|||' + startDate + '|||' + finishDate);
						price = data.price;
						entranceType = data.MuseumEntranceType.content;
						return (
							<View>
								<Text style={[style.text, styles.value]}>{`${
									price == -1
										? ''
										: entranceType.length > 0
										? entranceType.length > 3
											? entranceType.substring(0, 3) + '.'
											: entranceType + '.'
										: ''
								}`}</Text>
								<Text style={[style.text, styles.value]}>{`${price == -1 ? '' : price + '₺'}`}</Text>
							</View>
						);
					}
				})}
			</View>
		);
	};
	const DayCellWorking = ({ date }, style) => {
		return (
			<View style={[styles.dayContainer, style.container]}>
				<Text style={style.text}>{`${date.getDate()}`}</Text>
				{workingDetails[0].map((data) => {
					let startDate = new Date(data.startDate);
					let finishDate = new Date(data.finishDate);
					if (date >= startDate && date <= finishDate) {
						let workingSchedule = data.MuseumWorkingDaySchedules;
						let dayID;
						let openHour;
						let closeHour;
						workingSchedule.map((wsData) => {
							if (date.getDay() == wsData.MuseumWorkingDay.dayID) {
								console.log(wsData.MuseumWorkingDay.openHour);
								dayID = wsData.MuseumWorkingDay.dayID;
								openHour = wsData.MuseumWorkingDay.openHour;
								closeHour = wsData.MuseumWorkingDay.closeHour;
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
				})}
			</View>
		);
	};

	return (
		<Layout style={{ flex: 1, margin: 40 }}>
			<GetMuseumByIdComponent variables={{ museumID: museumID }}>
				{({ loading, error, data }) => {
					if (loading) return <Spinner size="giant" />;
					if (error) return <Text>error</Text>;

					if (data) {
						data.Museum.map((dat) => {
							museumInfo.push({
								title: dat.name,
								city: dat.Location.Address.City.city,
								address: dat.Location.Address.address,
								district: dat.Location.Address.District.district,
								description: dat.description == null ? '' : dat.description,
								phone: dat.Company.CompanyPhones.length > 0 ? dat.Company.CompanyPhones[0].Phone.phone : '',
							});
							priceDetails.push(dat.MuseumPrices);
							workingDetails.push(dat.MuseumWorkingSchedules);
						});
					}
					return (
						<Layout>
							<Text style={styles.text} category="h4">
								{museumInfo[0].title}
							</Text>
							<Text>{museumInfo[0].description}</Text>

							<Text style={styles.text} category="s1">
								Address:{museumInfo[0].address} {museumInfo[0].district}/{museumInfo[0].city}
							</Text>

							<Text style={styles.text} category="p1">
								Phone:{museumInfo[0].phone}
							</Text>
							<Layout style={styles.priceWork}>
								<View>
									<Text category="h6">Price Details</Text>
									<Calendar date={selectedDate} onSelect={setSelectedDate} renderDay={DayCellPrice} />
								</View>
								<View style={{ marginLeft: 40 }}>
									<Text category="h6">Working Schedule Details</Text>
									<Calendar date={selectedDateWorking} onSelect={setSelectedDateWorking} renderDay={DayCellWorking} />
								</View>
							</Layout>
						</Layout>
					);
				}}
			</GetMuseumByIdComponent>
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
export default ArchSiteInfoScreen;
