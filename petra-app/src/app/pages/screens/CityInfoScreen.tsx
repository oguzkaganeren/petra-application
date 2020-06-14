import * as React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Button, Layout, ButtonGroup, Text, ListItem, Spinner } from '@ui-kitten/components';
import { GetCityByIdComponent } from '../../generated/components';
declare var global: any;

export interface CityInfoScreenProps {
	navigation: any;
	route: any;
}

const CityInfoScreen: React.FC<CityInfoScreenProps> = (props) => {
	const { cityID } = props.route.params;
	const [cityInfo, setCityInfo] = React.useState([]);

	return (
		<Layout style={{ flex: 1 }}>
			<GetCityByIdComponent variables={{ cityID: cityID }}>
				{({ loading, error, data }) => {
					if (loading) return <Spinner size="giant" />;
					if (error) return <Text>error</Text>;

					if (data) {
						data.City.map((dat) => {
							cityInfo.push({
								title: dat.city,
								description: dat.description,
								imageUrl: dat.imageUrl,
							});
						});
					}
					return (
						<View>
							<Image style={styles.headerImage} source={{ uri: cityInfo[0].imageUrl }} />
							<Text style={styles.text} category="h4">
								{cityInfo[0].title}
							</Text>
							<Text style={styles.text} category="p1">
								{cityInfo[0].description}
							</Text>
						</View>
					);
				}}
			</GetCityByIdComponent>
		</Layout>
	);
};

const styles: any = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	headerImage: {
		flex: 1,
		height: 192,
	},
});
export default CityInfoScreen;
