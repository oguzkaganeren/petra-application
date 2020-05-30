import * as React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Button, Layout, ButtonGroup, Text, ListItem, List } from '@ui-kitten/components';
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

	return (
		<Layout style={{ flex: 1, margin: 40 }}>
			<GetMuseumByIdComponent variables={{ museumID: museumID }}>
				{({ loading, error, data }) => {
					if (loading) return <Text>Loading</Text>;
					if (error) return <Text>error</Text>;

					if (data) {
						data.Museum.map((dat) => {
							museumInfo.push({
								title: dat.name,
								city: dat.Location.Address.City.city,
								address: dat.Location.Address.address,
								district: dat.Location.Address.District.district,
								description: dat.description == null ? '' : dat.description,
								phone: dat.Company.CompanyPhones.length > 0 ? dat.Company.CompanyPhones[0].Phone : '',
							});
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
});
export default ArchSiteInfoScreen;
