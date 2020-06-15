import * as React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Button, Layout, Calendar, Text, ListItem, List, Spinner } from '@ui-kitten/components';
import { GetArchSiteByIdComponent } from '../../../generated/components';
import GetArchSiteWorkingScListComponent from '../../../components/ArchSite/GetArchSiteWorkingScList';
import GetArchSitePricesList from '../../../components/ArchSite/GetArchSitePricesList';
declare var global: any;

export interface ArchSiteInfoScreenProps {
	navigation: any;
	route: any;
	archSiteID: any;
}

const ArchSiteInfoScreen: React.FC<ArchSiteInfoScreenProps> = (props) => {
	const { archSiteID } = props.route.params;
	const [archSiteInfo, setArchSiteInfo] = React.useState([]);
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
						entranceType = data.ArchSiteEntranceType.content;
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
						let workingSchedule = data.ArchSiteWorkingDaySchedules;
						let dayID;
						let openHour;
						let closeHour;
						workingSchedule.map((wsData) => {
							if (date.getDay() == wsData.ArchSiteWorkingDay.dayID) {
								console.log(wsData.ArchSiteWorkingDay.openHour);
								dayID = wsData.ArchSiteWorkingDay.dayID;
								openHour = wsData.ArchSiteWorkingDay.openHour;
								closeHour = wsData.ArchSiteWorkingDay.closeHour;
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
			<GetArchSiteByIdComponent variables={{ archSiteID: archSiteID }}>
				{({ loading, error, data }) => {
					if (loading) return <Spinner size="giant" />;
					if (error) return <Text>error</Text>;

					if (data) {
						archSiteInfo.splice(0);
						priceDetails.splice(0);
						workingDetails.splice(0);
						data.ArchSite.map((dat) => {
							archSiteInfo.push({
								title: dat.name,
								city: dat.Location.Address.City.city,
								address: dat.Location.Address.address,
								age: dat.age,
								altitude: dat.altitude,
								destruction: dat.destruction,
								diameter: dat.diameter,
								period: dat.period,
								district: dat.Location.Address.District.district,
								description: dat.description == null ? '' : dat.description,
								phone: dat.Company.CompanyPhones.length > 0 ? dat.Company.CompanyPhones[0].Phone.phone : '',
							});
							priceDetails.push(dat.ArchSitePrices);
							workingDetails.push(dat.ArchSiteWorkingSchedules);
						});
					}
					return (
						<Layout>
							<Text style={styles.text} category="h4">
								{archSiteInfo[0].title}
							</Text>
							<Text>{archSiteInfo[0].description}</Text>

							<Text style={styles.text} category="s1">
								Address:{archSiteInfo[0].address} {archSiteInfo[0].district}/{archSiteInfo[0].city}
							</Text>
							<Text style={styles.text} category="p1">
								Age:{archSiteInfo[0].age}
							</Text>
							<Text style={styles.text} category="p1">
								Altitude:{archSiteInfo[0].altitude}
							</Text>
							<Text style={styles.text} category="p1">
								Destruction:{archSiteInfo[0].destruction}
							</Text>
							<Text style={styles.text} category="p1">
								Diameter:{archSiteInfo[0].diameter}
							</Text>
							<Text style={styles.text} category="p1">
								Period:{archSiteInfo[0].period}
							</Text>
							<Text style={styles.text} category="p1">
								Phone:{archSiteInfo[0].phone}
							</Text>
							<Layout style={styles.priceWork}>
								<View>
									<Text category="h6">Price Details</Text>
									{priceDetails[0].length > 0 ? (
										<Calendar
											key={(((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)}
											date={selectedDate}
											onSelect={setSelectedDate}
											renderDay={DayCellPrice}
										/>
									) : (
										<Calendar
											key={(((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)}
											date={selectedDate}
											onSelect={setSelectedDate}
											renderDay={DayCellPrice}
										/>
									)}
								</View>
								<View style={{ marginLeft: 40 }}>
									<Text category="h6">Working Schedule Details</Text>
									{workingDetails[0].length > 0 ? (
										<Calendar
											key={(((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)}
											date={selectedDateWorking}
											onSelect={setSelectedDateWorking}
											renderDay={DayCellWorking}
										/>
									) : (
										<Calendar
											key={(((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)}
											date={selectedDateWorking}
											onSelect={setSelectedDateWorking}
											renderDay={DayCellWorking}
										/>
									)}
								</View>
							</Layout>
						</Layout>
					);
				}}
			</GetArchSiteByIdComponent>

			<GetArchSiteWorkingScListComponent navigation={props.navigation} route={props.route} archSiteID={archSiteID} />

			<GetArchSitePricesList navigation={props.navigation} route={props.route} archSiteID={archSiteID} />
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
