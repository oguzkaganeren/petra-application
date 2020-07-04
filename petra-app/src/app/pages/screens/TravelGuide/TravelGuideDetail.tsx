import * as React from 'react';
import { StyleSheet, View, Dimensions, Platform } from 'react-native';
import { Button, Layout, Icon, Text, ListItem, List, Select, Spinner } from '@ui-kitten/components';
import MapView from 'react-native-maps';
import GetAllCitiesComponent from '../../../components/Public/GetAllCitiesComponent';
import { GetTravelGuideByIdComponent } from '../../../generated/components';
import { Tsp } from '../../../hooks/Tsp';
import { OPENROUTE_API_KEY } from 'react-native-dotenv';
import Timeline from 'react-native-timeline-flatlist';
declare var global: any;

export interface TravelGuideDetailScreenProps {
	navigation: any;
	route: any;
}

const TravelGuideDetailScreen: React.FC<TravelGuideDetailScreenProps> = (props) => {
	const { travelGuideID } = props.route.params;
	const [region, setRegion] = React.useState({
		latitude: 38.411258763601985,
		longitude: 27.124096993356943,
		latitudeDelta: 0.0028816964734517114,
		longitudeDelta: 0.006642155349254608,
	});
	const routeOptions = [
		{ key: 'driving-car', text: 'By Car' },
		{ key: 'foot-walking', text: 'By Walking' },
	];
	const [travelList, setTravelList] = React.useState([]);
	const [markers, setMarkers] = React.useState([]);
	const [isRouteLoading, setIsRouteLoading] = React.useState(false);
	const [polyCoords, setPolyCoords] = React.useState([]);
	const [timelineData, setTimelineData] = React.useState([]);
	const [nodeDistances, setNodeDistances] = React.useState([]);
	const [allPoints, setAllPoints] = React.useState([]);
	const [routeOption, setRouteOption] = React.useState(routeOptions[0]);
	const renderItem = ({ item, index }) => <ListItem title={item.title} />;
	const HotelIcon = (style) => <Icon {...style} name="moon-outline" />;
	const RestaurantIcon = (style) => <Icon {...style} name="droplet-outline" />;
	let markerRef = [];
	React.useEffect(() => {
		if (markers.length == 2) {
			setIsRouteLoading(false);
			generateMainRoute(markers[0], markers[1]);
		} else if (markers.length < 2) {
			setTimelineData([]);
			setNodeDistances([]);
		}
	}, [markers]);
	async function generateMainRoute(startPoint, endPoint) {
		setAllPoints([]);

		//console.log('here');
		allPoints.push(startPoint);
		travelList.map((data, index) => {
			allPoints.push({
				id: data.id,
				title: data.title,
				coordinates: data.coordinates,
				averageTime: data.averageTime,
				type: data.type,
			});
		});
		allPoints.push(endPoint);
		let edges = '{';
		let vertex = [];
		getDistancesList().then((res) => {
			//console.log(res);
			allPoints.map((data, index) => {
				if (data.id != endPoint.id) {
					vertex.push(data.id);
					allPoints.map((data2, index2) => {
						if (data.id != data2.id) {
							edges += '"' + data.id + data2.id + '"' + ':' + res.durations[index][index2] + ',';
							//console.log(nodes);
							//console.log('{' + data.id + '}' + '{' + data2.id + '}');
						}
					});
				}
			});
			//console.log(allPoints);
			edges = edges.substring(0, edges.length - 1);
			edges += '}';
			//console.log(vertex);
			//console.log(edges);//
			nodeDistances.push(JSON.parse(edges)); //for timeline
			let tspResult = new Tsp(vertex, JSON.parse(edges), startPoint.id).shortestPath();
			//	console.log(tspResult);
			tspResult.path.push(endPoint.id);
			getDirectionsAccordingToTsp(tspResult, endPoint);
			let times = [];
			for (let index = 0; index < timelineData.length - 1; index++) {
				let element = timelineData[index].id;
				element += timelineData[index + 1].id;

				times.push(nodeDistances[0][element]);
			}
			let d = new Date(2019, 5, 11, 9, 0, 0);
			let newArr = [...timelineData];
			console.log(newArr);
			let prevId = '';
			const options = {
				hour12: false,
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
			};
			newArr.map((data, index) => {
				if (index != 0 && prevId != data.id) {
					d = new Date(d.getTime() + 1000 * times[index - 1]);
				}
				if (index != 0 && index != newArr.length && data.id == prevId) {
					if (data.averageTime != null) {
						d = new Date(d.getTime() + 1000 * 60 * data.averageTime);
					} else {
						d = new Date(d.getTime() + 1000 * 60 * (data.diameter * 2));
					}
				}
				prevId = data.id;
				data.time = d.toLocaleTimeString('tr-TR', options);
			});
			let tmpArry = [];
			let isAddedLunch = false;
			let isAddedSleep = false;
			newArr.map((data, index) => {
				if (
					(data.time.split(':')[0] == '11' || data.time.split(':')[0] == '12' || data.time.split(':')[0] == '13') &&
					!isAddedLunch
				) {
					isAddedLunch = true;
					tmpArry.push({
						id: 'lunch',
						time: data.time,
						title: (
							<Button
								icon={RestaurantIcon}
								appearance="ghost"
								onPress={() => {
									props.navigation.navigate('GetRestaurantListByCity');
								}}
							>
								I am hungry
							</Button>
						),
						description: '',
					});
				}
				if (parseInt(data.time.split(':')[0]) > 16) {
					tmpArry.push({
						id: 'sleep',
						time: data.time,
						title: (
							<Button
								icon={HotelIcon}
								appearance="ghost"
								onPress={() => {
									props.navigation.navigate('GetHotelListByCity');
								}}
							>
								I need a hotel
							</Button>
						),
						description: '',
					});
					d = new Date(2019, 5, 11, 9, 0, 0);
					tmpArry.push({
						id: 'newDay',
						time: d.toLocaleTimeString('tr-TR', options),
						title: 'New Day',
						description: '',
					});
				}
				tmpArry.push(data);
			});
			setTimelineData(tmpArry);
		});
	}
	function getDistancesList() {
		var xhr = new XMLHttpRequest();

		return new Promise((resolve, reject) => {
			xhr.onreadystatechange = (e) => {
				if (xhr.readyState !== 4) {
					return;
				}

				if (xhr.status === 200) {
					//console.log('SUCCESS', xhr.responseText);
					resolve(JSON.parse(xhr.responseText));
				} else {
					console.warn('request_error');
				}
			};

			xhr.open('POST', 'https://api.openrouteservice.org/v2/matrix/' + routeOption.key);
			xhr.setRequestHeader(
				'Accept',
				'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8'
			);
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.setRequestHeader('Authorization', OPENROUTE_API_KEY);
			const body =
				'{"locations":[' +
				allPoints.map((coor, index) => {
					return '[' + coor.coordinates.longitude + ',' + coor.coordinates.latitude + ']';
				}) +
				'],"metrics":["duration","distance"],"units":"m"}';
			//console.log(body);
			xhr.send(body);
		});
	}
	function getDirectionsAccordingToTsp(tspResult, endPoint) {
		var xhr = new XMLHttpRequest();
		return new Promise((resolve, reject) => {
			xhr.onreadystatechange = (e) => {
				if (xhr.readyState !== 4) {
					return;
				}

				if (xhr.status === 200) {
					//console.log('SUCCESS', xhr.responseText);
					//resolve(JSON.parse(xhr.responseText));
					let respJson = JSON.parse(xhr.responseText);

					if (respJson.features[0].geometry.coordinates.length > 0) {
						const points = respJson.features[0].geometry.coordinates;
						const polyCoords = points.map((point, index) => {
							if (Platform.OS === 'web') {
								return {
									lat: point[1],
									lng: point[0],
								};
							} else {
								return {
									latitude: point[1],
									longitude: point[0],
								};
							}
						});
						//this.generateMainRoute(startPoint, endPoint);
						setIsRouteLoading(true);
						setPolyCoords(polyCoords);
					}
				} else {
					console.warn('request_error');
				}
			};

			xhr.open('POST', 'https://api.openrouteservice.org/v2/directions/' + routeOption.key + '/geojson');
			xhr.setRequestHeader(
				'Accept',
				'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8'
			);
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.setRequestHeader('Authorization', OPENROUTE_API_KEY);

			//allPoints.push(endPoint);
			//console.log(tspResult.path);
			//console.log(allPoints);
			//	console.log(tspResult);
			let coordinates = '';
			tspResult.path.map((tspId) => {
				allPoints.map((allpoint) => {
					//console.log(tspId + '===' + allpoint.id);
					if (tspId === allpoint.id) {
						//console.log(allpoint.coordinates.longitude);
						timelineData.push({
							id: tspId,
							time: '0',
							title: allpoint.title,
							description: allpoint.description,
							averageTime: allpoint.averageTime,
							diameter: allpoint.diameter ? allpoint.diameter : 25,
						});
						if (timelineData.length != 1 && timelineData.length - 1 <= tspResult.path.length) {
							timelineData.push({
								id: tspId,
								time: '0',
								title: 'Time to go to the new placement',
								description: '',
								averageTime: allpoint.averageTime,
								diameter: allpoint.diameter ? allpoint.diameter : 25,
							});
						}

						coordinates += '[' + allpoint.coordinates.longitude + ',' + allpoint.coordinates.latitude + ']';
						if (tspId != endPoint.id) {
							coordinates += ',';
						}
					}
				});
			});
			//console.log(coordinates);
			const body = '{"coordinates":[' + coordinates + ']' + '}';
			//console.log(body);
			xhr.send(body);
		});
	}
	function _onMarkerPress(markerData) {
		//this.props.marker(markerData);
		removeMarker(markerData);
	}
	function removeMarker(e) {
		var array = [...markers]; // make a separate copy of the array
		var index = array.indexOf(e);
		if (index !== -1) {
			array.splice(index, 1);
			setMarkers(array);
		}
	}
	const onMarkerChange = (event) => {
		let longitude;
		let latitude;
		if (Platform.OS === 'web') {
			latitude = event.latLng.lat();
			longitude = event.latLng.lng();
		} else {
			latitude = event.nativeEvent.coordinate.latitude;
			longitude = event.nativeEvent.coordinate.longitude;
		}
		//console.log(latitude + ' ' + longitude);

		if (markers.length < 2) {
			let id = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
			setMarkers((oldArray) => [
				...oldArray,
				{
					id: id,
					title: markers.length == 0 ? 'Start Point' : 'End Point',
					price: 0,
					coordinates: { latitude: latitude, longitude: longitude },
				},
			]);
		}
	};
	return (
		<Layout style={{ flex: 1 }}>
			<GetTravelGuideByIdComponent variables={{ travelGuideID: travelGuideID }}>
				{({ loading, error, data }) => {
					if (loading) return <Spinner size="giant" />;
					if (error) return <Text>error</Text>;

					if (data) {
						console.log(data);

						data.TravelGuide[0].TravelGuideArchSites.map((dat) => {
							if (travelList.length > 0) {
								if (travelList.every((item) => item.id !== dat.ArchSite.archSiteID + 'archsite')) {
									travelList.push({
										id: dat.ArchSite.archSiteID + 'archsite',
										title: dat.ArchSite.name,
										coordinates: {
											latitude: dat.ArchSite.Location.latitude,
											longitude: dat.ArchSite.Location.longtitude,
										},
										averageTime: dat.ArchSite.averageTime,
										type: 'archsite',
									});
								}
							} else {
								travelList.push({
									id: dat.ArchSite.archSiteID + 'archsite',
									title: dat.ArchSite.name,
									coordinates: {
										latitude: dat.ArchSite.Location.latitude,
										longitude: dat.ArchSite.Location.longtitude,
									},
									averageTime: dat.ArchSite.averageTime,
									type: 'archsite',
								});
							}
						});
						data.TravelGuide[0].TravelGuideMuseums.map((dat) => {
							if (travelList.length > 0) {
								if (travelList.every((item) => item.id !== dat.Museum.museumID + 'museum')) {
									travelList.push({
										id: dat.Museum.museumID + 'museum',
										title: dat.Museum.name,
										coordinates: { latitude: dat.Museum.Location.latitude, longitude: dat.Museum.Location.longtitude },
										averageTime: dat.Museum.averageTime,
										type: 'museum',
									});
								}
							} else {
								travelList.push({
									id: dat.Museum.museumID + 'museum',
									title: dat.Museum.name,
									coordinates: { latitude: dat.Museum.Location.latitude, longitude: dat.Museum.Location.longtitude },
									averageTime: dat.Museum.averageTime,
									type: 'museum',
								});
							}
						});
						data.TravelGuide[0].TravelGuideHotels.map((dat) => {
							if (travelList.length > 0) {
								if (travelList.every((item) => item.id !== dat.Hotel.hotelID + 'hotel')) {
									travelList.push({
										id: dat.Hotel.hotelID + 'hotel',
										title: dat.Hotel.name,
										coordinates: { latitude: dat.Hotel.Location.latitude, longitude: dat.Hotel.Location.longtitude },
										type: 'hotel',
									});
								}
							} else {
								travelList.push({
									id: dat.Hotel.hotelID + 'hotel',
									title: dat.Hotel.name,
									coordinates: { latitude: dat.Hotel.Location.latitude, longitude: dat.Hotel.Location.longtitude },
									type: 'hotel',
								});
							}
						});
						data.TravelGuide[0].TravelGuideLocations.map((dat) => {
							if (travelList.length > 0) {
								if (travelList.every((item) => item.id !== dat.travelGuideID + 'travelguide')) {
									travelList.push({
										id: dat.travelGuideID + 'travelguide',
										title: dat.Location.latitude + ' ' + dat.Location.longtitude,
										coordinates: { latitude: dat.Location.latitude, longitude: dat.Location.longtitude },
										type: 'travelguide',
									});
								}
							} else {
								travelList.push({
									id: dat.travelGuideID + 'travelguide',
									title: dat.Location.latitude + ' ' + dat.Location.longtitude,
									coordinates: { latitude: dat.Location.latitude, longitude: dat.Location.longtitude },
									type: 'travelguide',
								});
							}
						});
						data.TravelGuide[0].TravelGuideRestaurants.map((dat) => {
							if (travelList.length > 0) {
								if (travelList.every((item) => item.id !== dat.Restaurant.restaurantID + 'restaurant')) {
									travelList.push({
										id: dat.Restaurant.restaurantID + 'restaurant',
										title: dat.Restaurant.name,
										coordinates: {
											latitude: dat.Restaurant.Location.latitude,
											longitude: dat.Restaurant.Location.longtitude,
										},
										type: 'restaurant',
									});
								}
							} else {
								travelList.push({
									id: dat.Restaurant.restaurantID + 'restaurant',
									title: dat.Restaurant.name,
									coordinates: {
										latitude: dat.Restaurant.Location.latitude,
										longitude: dat.Restaurant.Location.longtitude,
									},
									type: 'restaurant',
								});
							}
						});
					}
					return (
						<Layout>
							<Text style={styles.text} category="h6">
								{data.TravelGuide[0].title + ' (' + data.TravelGuide[0].cost + ' TL)'}
							</Text>
							<Layout style={styles.cityRegion}>
								<Text style={{ paddingTop: 15 }} category="c2">
									Please Select a start point and end point on the map
								</Text>
								<Text style={{ paddingTop: 13, paddingLeft: 5, paddingRight: 5 }}>or select</Text>
								<GetAllCitiesComponent
									label="From"
									parentReference={(value) => {
										setTimelineData([]);
										setNodeDistances([]);
										let id = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
										let newArray = [...markers];
										newArray[0] = {
											id: id,
											title: 'Start Point',
											price: 0,
											coordinates: { latitude: value.location.latitude, longitude: value.location.longtitude },
										};
										setMarkers(newArray);
									}}
								/>
								<Text style={{ paddingTop: 10, paddingLeft: 5, paddingRight: 5 }}> and </Text>
								<GetAllCitiesComponent
									label="To"
									parentReference={(value) => {
										setTimelineData([]);
										setNodeDistances([]);
										let id = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
										let newArray = [...markers];
										newArray[1] = {
											id: id,
											title: 'End Point',
											price: 0,
											coordinates: { latitude: value.location.latitude, longitude: value.location.longtitude },
										};
										setMarkers(newArray);
									}}
								/>
							</Layout>
							<Select
								data={routeOptions}
								selectedOption={routeOption}
								onSelect={(value) => {
									setRouteOption(value);
									if (markers.length == 2) {
										setTimelineData([]);
										setNodeDistances([]);
										let newArray = [...markers];
										setMarkers(newArray);
									}
								}}
							/>
							<Timeline data={timelineData} />

							<MapView
								style={styles.mapStyle}
								provider={null}
								initialRegion={region}
								showsUserLocation={true}
								followsUserLocation={true}
								showsMyLocationButton={true}
								showsCompass={true}
								//mapType={Platform.OS == 'android' ? 'none' : 'standard'}
								userLocationAnnotationTitle="Your position"
								onPress={(e) => {
									onMarkerChange(e);
									//e.nativeEvent.coordinate
								}}
							>
								{markers.map((marker) => (
									<MapView.Marker
										coordinate={marker.coordinates}
										title={marker.title}
										onPress={_onMarkerPress.bind(this, marker)}
									/>
								))}
								{travelList.map((marker, index) => (
									<MapView.Marker
										key={marker.id}
										coordinate={marker.coordinates}
										ref={(marker) => (markerRef[index] = marker)}
										title={marker.title}
										onPress={() => {
											markerRef[index].showCallout();
										}}
									>
										<MapView.Callout onPress={console.log('clicked')}>
											<View style={{ padding: 10 }}>
												<Text>{marker.title}</Text>
											</View>
										</MapView.Callout>
									</MapView.Marker>
								))}
								{markers.length == 2 && isRouteLoading ? (
									<MapView.Polyline coordinates={polyCoords} strokeWidth={5} strokeColor="#00a8ff" />
								) : null}
							</MapView>
							<List data={travelList} renderItem={renderItem} />
						</Layout>
					);
				}}
			</GetTravelGuideByIdComponent>
		</Layout>
	);
};

const styles: any = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	mapStyle: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height / 2,
	},
	cityRegion: {
		flexDirection: 'row',
	},
});
export default TravelGuideDetailScreen;
