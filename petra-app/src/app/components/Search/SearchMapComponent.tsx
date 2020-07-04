import React, { useEffect } from 'react';
import { StyleSheet, Dimensions, Platform, View, ScrollView } from 'react-native';
import { Input, Text, CheckBox, Layout, Button, Icon, Select, Spinner } from '@ui-kitten/components';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import GetAllCitiesComponent from '../../components/Public/GetAllCitiesComponent';
import GetAllRegionsComponent from '../../components/Public/GetAllRegionsComponent';
import { GetArchSiteLocationComponent } from '../../generated/components';
import GetASEntranceTypesComponent from '../../components/ArchSite/GetASEntranceTypesComponent';
import GetAllMuseumEntranceTypesComponent from '../../components/Museum/GetAllMuseumEntranceTypesComponent';
import GetASTypesComponent from '../../components/ArchSite/GetASTypesComponent';
import GetAllMuseumTypesComponent from '../../components/Museum/GetAllMuseumTypesComponent';
import { GetMuseumLocationComponent } from '../../generated/components';
import { OPENROUTE_API_KEY } from 'react-native-dotenv';
import { Tsp } from '../../hooks/Tsp';
import Timeline from 'react-native-timeline-flatlist';
export interface SearchMapComponentProps {
	navigation: any;
	route: any;
}

const SearchMapComponent: React.FC<SearchMapComponentProps> = (props) => {
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
	const [cityID, setCityID] = React.useState(0);
	const [regionID, setRegionID] = React.useState(0);
	const [allPoints, setAllPoints] = React.useState([]);
	const [archSiteEntranceTypeID, setArchSiteEntranceTypeID] = React.useState(0);
	const [museumEntranceTypeID, setMuseumEntranceTypeID] = React.useState(0);
	const [archSiteTypesIDs, setArchSiteTypesIDs] = React.useState([]);
	const [museumTypesIDs, setMuseumTypesIDs] = React.useState([]);
	const [errorMessage, setErrorMessage] = React.useState('');
	const [isTravelAll, setIsTravelAll] = React.useState(true);
	const [userLoc, setUserLoc] = React.useState(null);
	const [archSiteVariables, setArchSiteVariables] = React.useState(null);
	const [museumVariables, setMuseumVariables] = React.useState(null);

	const [markers, setMarkers] = React.useState([]);
	const [archSiteMarkers, setArchSiteMarkers] = React.useState([]);
	const [museumMarkers, setMuseumMarkers] = React.useState([]);
	const [polyCoords, setPolyCoords] = React.useState([]);
	const [isRouteLoading, setIsRouteLoading] = React.useState(false);
	const [priceFromUser, setPriceFromUser] = React.useState(250);
	const [nodeDistances, setNodeDistances] = React.useState([]);
	const [routeOption, setRouteOption] = React.useState(routeOptions[0]);
	const [timelineData, setTimelineData] = React.useState([]);
	const [showSaveButton, setShowSaveButton] = React.useState(false);
	const HotelIcon = (style) => <Icon {...style} name="moon-outline" />;
	const RestaurantIcon = (style) => <Icon {...style} name="droplet-outline" />;
	const accessoryItemIcon = (style) => <Icon {...style} name="plus-circle-outline" />;
	useEffect(() => {
		if (markers.length == 2) {
			setIsRouteLoading(false);
			generateMainRoute(markers[0], markers[1]);
			setShowSaveButton(true);
		} else if (markers.length < 2) {
			setTimelineData([]);
			setNodeDistances([]);
			setShowSaveButton(false);
		}
	}, [markers]);
	useEffect(() => {}, [timelineData]);
	const memoizedHandleClick = React.useCallback(
		() => {
			props.navigation.navigate('AddTravelGuideScreen', {
				listDataFromSearch: allPoints,
				costFromSearch: priceFromUser,
			});
		},
		[] // Tells React to memoize regardless of arguments.
	);

	function _onMarkerPress(markerData) {
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
	async function generateMainRoute(startPoint, endPoint) {
		setAllPoints([]);

		allPoints.push(startPoint);
		archSiteMarkers.map((marker, index) => {
			allPoints.push({
				id: marker.id + marker.type,
				title: marker.title,
				price: marker.price,
				description: marker.description,
				diameter: marker.diameter,
				averageTime: marker.averageTime,
				coordinates: marker.coordinates,
				type: marker.type,
			});
		});
		museumMarkers.map((marker, index) => {
			allPoints.push({
				id: marker.id + marker.type,
				title: marker.title,
				price: marker.price,
				description: marker.description,
				averageTime: marker.averageTime,
				coordinates: marker.coordinates,
				type: marker.type,
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
			edges = edges.substring(0, edges.length - 1);
			edges += '}';
			nodeDistances.push(JSON.parse(edges)); //for timeline
			let tspResult = new Tsp(vertex, JSON.parse(edges), startPoint.id).shortestPath();

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
				tmpArry.push(data);
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
				if (
					(data.time.split(':')[0] == '16' ||
						data.time.split(':')[0] == '17' ||
						data.time.split(':')[0] == '18' ||
						data.time.split(':')[0] == '19') &&
					!isAddedSleep
				) {
					isAddedSleep = true;
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
			});
			console.log(tmpArry);
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

	const travelCheckboxChanges = (value) => {
		setIsTravelAll(value);
	};

	let archSiteMarkersRef = [];
	let museumMarkersRef = [];
	let totalPrice = archSiteMarkers.length > 0 || museumMarkers.length > 0 ? 9999 : 0;
	return (
		<Layout style={{ paddingBottom: -25, flex: 1 }}>
			<ScrollView style={{ flex: 1 }}>
				{showSaveButton ? (
					<Button icon={accessoryItemIcon} status="success" onPress={memoizedHandleClick}>
						Save Guide
					</Button>
				) : null}
				<Input
					label="Place your Price(TL)"
					value={priceFromUser.toString()}
					onChangeText={(value) => {
						setPriceFromUser(parseInt(value));
						setArchSiteMarkers([]);
						setMuseumMarkers([]);
						if (cityID != 0) {
							setArchSiteVariables({ cityID: cityID, archSiteEntranceTypeID: archSiteEntranceTypeID });
							setMuseumVariables({ cityID: cityID, museumEntranceTypeID: museumEntranceTypeID });
						} else {
							setArchSiteVariables({ archSiteEntranceTypeID: archSiteEntranceTypeID, regionID: regionID });
							setMuseumVariables({ museumEntranceTypeID: museumEntranceTypeID, regionID: regionID });
						}
					}}
				/>
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
				<Layout style={styles.cityRegion}>
					<GetAllCitiesComponent
						label="Select City"
						disable={regionID > 0 ? true : false}
						parentReference={(value) => {
							setCityID(value.id);
							setArchSiteMarkers([]);
							setMuseumMarkers([]);
							setArchSiteVariables({ cityID: value.id, archSiteEntranceTypeID: archSiteEntranceTypeID });
							setMuseumVariables({ cityID: value.id, museumEntranceTypeID: museumEntranceTypeID });
						}}
					/>
					<Text style={{ paddingTop: 10, paddingLeft: 5, paddingRight: 5 }}>or</Text>
					<GetAllRegionsComponent
						label="Select Region"
						disable={cityID > 0 ? true : false}
						parentReference={(value) => {
							setRegionID(value.id);
							setArchSiteMarkers([]);
							setMuseumMarkers([]);
							setArchSiteVariables({ archSiteEntranceTypeID: archSiteEntranceTypeID, regionID: value.id });
							setMuseumVariables({ museumEntranceTypeID: museumEntranceTypeID, regionID: value.id });
						}}
					/>
				</Layout>
				<Layout style={styles.cityRegion}>
					<GetASEntranceTypesComponent
						label="Select Entrance Type"
						parentReference={(value) => {
							setArchSiteEntranceTypeID(value);
							setArchSiteMarkers([]);
							setMuseumMarkers([]);
							if (cityID != 0) {
								setArchSiteVariables({ cityID: cityID, archSiteEntranceTypeID: value });
							} else {
								setArchSiteVariables({ archSiteEntranceTypeID: value, regionID: regionID });
							}
						}}
					/>
					<Text style={{ paddingTop: 10, paddingLeft: 5, paddingRight: 5 }}>and</Text>
					<GetAllMuseumEntranceTypesComponent
						label="Select Museum Entrance Type"
						parentReference={(value) => {
							setMuseumEntranceTypeID(value);
							setArchSiteMarkers([]);
							setMuseumMarkers([]);
							if (cityID != 0) {
								setMuseumVariables({ cityID: cityID, museumEntranceTypeID: value });
							} else {
								setMuseumVariables({ museumEntranceTypeID: value, regionID: regionID });
							}
						}}
					/>
				</Layout>
				<Layout style={styles.cityRegion}>
					<Text style={{ paddingTop: 15 }} category="c2">
						Please Select a start point and end point on the map
					</Text>
					<Text style={{ paddingTop: 13, paddingLeft: 5, paddingRight: 5 }}>or select</Text>
					<GetAllCitiesComponent
						label="From"
						parentReference={(value) => {
							let id = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
							let newArray = [...markers];
							newArray[0] = {
								id: id,
								title: 'Start Point',
								price: 0,
								coordinates: { latitude: value.location.latitude, longitude: value.location.longtitude },
							};
							setTimelineData([]);
							setNodeDistances([]);
							setMarkers(newArray);
						}}
					/>
					<Text style={{ paddingTop: 10, paddingLeft: 5, paddingRight: 5 }}> and </Text>
					<GetAllCitiesComponent
						label="To"
						parentReference={(value) => {
							let id = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
							let newArray = [...markers];
							newArray[1] = {
								id: id,
								title: 'End Point',
								price: 0,
								coordinates: { latitude: value.location.latitude, longitude: value.location.longtitude },
							};
							setTimelineData([]);
							setNodeDistances([]);
							setMarkers(newArray);
						}}
					/>
				</Layout>
				{!isTravelAll ? (
					<GetASTypesComponent
						label="Select ArchSite Type"
						parentReference={(value) => {
							let tmp = [];
							setArchSiteMarkers([]);
							setMuseumMarkers([]);
							if (value.length > 0) {
								tmp = value.map((dat) => {
									return dat.id;
								});
								setArchSiteTypesIDs(tmp);
								if (cityID != 0) {
									setArchSiteVariables({
										cityID: cityID,
										archSiteEntranceTypeID: archSiteEntranceTypeID,
										archSiteTypeIDs: tmp,
									});
								} else {
									setArchSiteVariables({
										archSiteEntranceTypeID: archSiteEntranceTypeID,
										archSiteTypeIDs: tmp,
										regionID: regionID,
									});
								}
							}
						}}
					/>
				) : null}
				{!isTravelAll ? (
					<GetAllMuseumTypesComponent
						label="Select Museum Type"
						parentReference={(value) => {
							let tmp = [];
							setArchSiteMarkers([]);
							setMuseumMarkers([]);
							if (value.length > 0) {
								tmp = value.map((dat) => {
									return dat.id;
								});
								setMuseumTypesIDs(tmp);
								if (cityID != 0) {
									setMuseumVariables({
										cityID: cityID,
										museumEntranceTypeID: museumEntranceTypeID,
										museumTypeIDs: tmp,
									});
								} else {
									setMuseumVariables({
										museumEntranceTypeID: museumEntranceTypeID,
										museumTypeIDs: tmp,
										regionID: regionID,
									});
								}
							}
						}}
					/>
				) : null}
				<Button
					icon={HotelIcon}
					appearance="ghost"
					onPress={() => {
						props.navigation.navigate('GetHotelListByCity');
					}}
				>
					Show Hotels
				</Button>
				<Button
					icon={RestaurantIcon}
					appearance="ghost"
					onPress={() => {
						props.navigation.navigate('GetRestaurantListByCity');
					}}
				>
					Show Restaurants
				</Button>
				<CheckBox
					style={styles.checkbox}
					status="info"
					text="Travel All"
					checked={isTravelAll}
					onChange={travelCheckboxChanges}
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
					{cityID != 0 || regionID != 0 ? (
						<GetArchSiteLocationComponent variables={archSiteVariables}>
							{({ loading, error, data }) => {
								if (loading) return <Spinner size="giant" />;
								if (error) return <Text></Text>;

								if (data) {
									data.ArchSite.map((dat) => {
										if (archSiteMarkers.length > 0) {
											if (archSiteMarkers.every((item) => item.id !== dat.archSiteID)) {
												if (totalPrice + dat.ArchSitePrices[0].price < priceFromUser) {
													archSiteMarkers.push({
														id: dat.archSiteID,
														title: dat.name,
														price: dat.ArchSitePrices[0].price, //burası böyle olmaz!!!
														description: dat.Location.Address.address,
														diameter: dat.diameter,
														averageTime: dat.averageTime,
														coordinates: { latitude: dat.Location.latitude, longitude: dat.Location.longtitude },
														type: 'archsite',
													});
													//console.log(dat.ArchSitePrices[0]);
													totalPrice += dat.ArchSitePrices[0].price;
												}
											}
										} else {
											if (totalPrice + dat.ArchSitePrices[0].price < priceFromUser) {
												archSiteMarkers.push({
													id: dat.archSiteID,
													title: dat.name,
													description: dat.Location.Address.address,
													diameter: dat.diameter,
													price: dat.ArchSitePrices[0].price, //burası böyle olmaz!!!
													coordinates: { latitude: dat.Location.latitude, longitude: dat.Location.longtitude },
													type: 'archsite',
												});
												//console.log(dat.ArchSitePrices[0]);
												totalPrice += dat.ArchSitePrices[0].price;
											}
										}
									});
									return (
										<Layout>
											{archSiteMarkers.map((marker, index) => (
												<MapView.Marker
													key={marker.id + 'archsite'}
													coordinate={marker.coordinates}
													description={marker.description}
													ref={(marker) => (archSiteMarkersRef[index] = marker)}
													title={marker.title}
													onPress={() => {
														archSiteMarkersRef[index].showCallout();
													}}
												>
													<MapView.Callout onPress={console.log('clicked')}>
														<View style={{ padding: 10 }}>
															<Text>{marker.title}</Text>
															<Text>{marker.description}</Text>
														</View>
													</MapView.Callout>
												</MapView.Marker>
											))}
										</Layout>
									);
								}
							}}
						</GetArchSiteLocationComponent>
					) : null}
					{cityID != 0 || regionID != 0 ? (
						<GetMuseumLocationComponent variables={museumVariables}>
							{({ loading, error, data }) => {
								if (loading) return <Spinner size="giant" />;
								if (error) return <Text></Text>;

								if (data) {
									data.Museum.map((dat) => {
										if (museumMarkers.length > 0) {
											if (museumMarkers.every((item) => item.id !== dat.museumID)) {
												if (totalPrice + dat.MuseumPrices[0].price < priceFromUser) {
													museumMarkers.push({
														id: dat.museumID,
														title: dat.name,
														description: dat.Location.Address.address,
														price: dat.MuseumPrices[0].price, //burası böyle olmaz!!!
														averageTime: dat.averageTime,
														coordinates: { latitude: dat.Location.latitude, longitude: dat.Location.longtitude },
														type: 'museum',
													});
													totalPrice += dat.MuseumPrices[0].price;
												}
											}
										} else {
											if (totalPrice + dat.MuseumPrices[0].price < priceFromUser) {
												museumMarkers.push({
													id: dat.museumID,
													title: dat.name,
													description: dat.Location.Address.address,
													price: dat.MuseumPrices[0].price, //burası böyle olmaz!!!
													coordinates: { latitude: dat.Location.latitude, longitude: dat.Location.longtitude },
													type: 'museum',
												});
												totalPrice += dat.MuseumPrices[0].price;
											}
										}
									});
									return (
										<Layout>
											{museumMarkers.map((marker, index) => (
												<MapView.Marker
													key={marker.id + 'museum'}
													coordinate={marker.coordinates}
													description={marker.description}
													ref={(marker) => (museumMarkersRef[index] = marker)}
													title={marker.title}
													onPress={(event) => {
														museumMarkersRef[index].showCallout();
													}}
												>
													<MapView.Callout onPress={console.log('clicked')}>
														<View style={{ padding: 10 }}>
															<Text>{marker.title}</Text>
															<Text>{marker.description}</Text>
														</View>
													</MapView.Callout>
												</MapView.Marker>
											))}
										</Layout>
									);
								}
							}}
						</GetMuseumLocationComponent>
					) : null}
					{markers.length == 2 && isRouteLoading ? (
						<MapView.Polyline coordinates={polyCoords} strokeWidth={5} strokeColor="#00a8ff" />
					) : null}
				</MapView>
			</ScrollView>
		</Layout>
	);
};

const styles: any = StyleSheet.create({
	mapStyle: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height / 1.5,
	},
	cityRegion: {
		flexDirection: 'row',
	},
});
export default SearchMapComponent;
