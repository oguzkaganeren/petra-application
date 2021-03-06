import React from 'react';
import { Layout, Select, Text, Spinner } from '@ui-kitten/components';
import { StyleSheet, Dimensions, View, TouchableHighlight, ImageBackground, Platform } from 'react-native';
import { GetCitiesComponent } from '../../generated/components';
import Carousel from 'react-native-looped-carousel';
export interface GetAllCitiesCardProps {
	navigation: any;
	route: any;
}

const GetAllCitiesComponentCard: React.FC<GetAllCitiesCardProps> = (props) => {
	const [cities, setCities] = React.useState([]);

	return (
		<Layout>
			<GetCitiesComponent>
				{({ loading, error, data }) => {
					if (loading) return <Spinner size="giant" />;
					if (error) return <Text>error</Text>;

					if (data) {
						data.City.map((dat) => {
							if (cities.length > 0) {
								if (cities.every((item) => item.id !== dat.cityID)) {
									cities.push({
										id: dat.cityID,
										city: dat.city,
										description: dat.description,
										imageUrl: dat.imageUrl,
									});
								}
							} else {
								cities.push({ id: dat.cityID, city: dat.city, description: dat.description, imageUrl: dat.imageUrl });
							}
						});

						return (
							<Carousel delay={2000} style={styles.sliderStyle} bullet autoplay currentPage={1}>
								{cities.map((city) => (
									<View>
										<TouchableHighlight
											key={city.id}
											onPress={() => {
												props.navigation.navigate('CityInfoScreen', { cityID: city.id });
											}}
											style={{
												borderRadius: 15,
												width:
													Platform.OS === 'web' ? Dimensions.get('window').width / 2 : Dimensions.get('window').width,
												height: Dimensions.get('window').height / 5,
											}}
										>
											<ImageBackground
												source={{ uri: city.imageUrl }}
												style={{
													flex: 1,
													flexDirection: 'row',
													justifyContent: 'center',
													alignItems: 'center',
													backgroundColor: 'transparent',
												}}
												imageStyle={{
													borderRadius: 25,
												}}
											>
												<Text
													category="h1"
													style={{
														position: 'absolute',
														bottom: 0,
														color: 'white',
														textShadowColor: 'rgba(0, 0, 0, 0.75)',
														textShadowOffset: { width: -1, height: 1 },
														textShadowRadius: 10,
													}}
												>
													{city.city}
												</Text>
											</ImageBackground>
										</TouchableHighlight>
									</View>
								))}
							</Carousel>
						);
					}
				}}
			</GetCitiesComponent>
		</Layout>
	);
};

const styles: any = StyleSheet.create({
	sliderStyle: {
		width: Platform.OS === 'web' ? Dimensions.get('window').width / 2 : Dimensions.get('window').width,
		height: Dimensions.get('window').height / 5,
		bottom: 25,
	},
});
export default GetAllCitiesComponentCard;
