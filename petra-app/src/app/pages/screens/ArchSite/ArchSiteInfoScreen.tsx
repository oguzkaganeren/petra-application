import * as React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Button, Layout, Calendar, Text, ListItem, List } from '@ui-kitten/components';
import { GetArchSiteByIdComponent } from '../../../generated/components';

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
	const [priceDetails, setPriceDetails] = React.useState([]);
	const DayCell = ({ date }, style) => (
		<View style={[styles.dayContainer, style.container]}>
			<Text style={style.text}>{`${date.getDate()}`}</Text>
			<Text style={[style.text, styles.value]}>{`${100 * date.getDate() + Math.pow(date.getDate(), 2)}$`}</Text>
		</View>
	);
	return (
		<Layout style={{ flex: 1, margin: 40 }}>
			<GetArchSiteByIdComponent variables={{ archSiteID: archSiteID }}>
				{({ loading, error, data }) => {
					if (loading) return <Text>Loading</Text>;
					if (error) return <Text>error</Text>;

					if (data) {
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
							console.log(priceDetails);
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
							<Calendar date={selectedDate} onSelect={setSelectedDate} renderDay={DayCell} />
						</Layout>
					);
				}}
			</GetArchSiteByIdComponent>
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
});
export default ArchSiteInfoScreen;
