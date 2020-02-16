import * as React from 'react';
import { StyleSheet, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { Button, Layout, Input, Spinner, TabView, Tab, ListItem, Icon, List } from '@ui-kitten/components';
import { ArchSiteLocationComponent } from '../../../components/ArchSite/ArchSiteLocationComponent';
import { MuseumLocationComponent } from '../../../components/Museum/MuseumLocationComponent';
import { RestaurantLocationComponent } from '../../../components/Restaurant/RestaurantLocationComponent';
import { HotelLocationComponent } from '../../../components/Hotel/HotelLocationComponent';
import { AddTravelGuideComponent } from '../../../generated/components';
import { Formik } from 'formik';
import * as Yup from 'yup';
/**
 * Home props
 */
export interface AddTravelGuideProps {
	navigation: any;
}
/**
 * Home state
 */
export interface AddTravelGuideState {
	latitude: number;
	longtitude: number;
	selectedIndex: number;
	setSelectedIndex: number;
	listData: any;
}

/**
 * Home
 */
export class AddTravelGuideScreen extends React.Component<AddTravelGuideProps, AddTravelGuideState> {
	constructor(props: AddTravelGuideProps) {
		super(props);
		this.state = {
			longtitude: 0,
			latitude: 0,
			selectedIndex: 0,
			setSelectedIndex: 0,
			listData: []
		};
	}
	addItem(item) {
		// only add if the item doesn't exist in the list
		console.log(this.state.listData);
		if (!(this.state.listData.filter(e => e.id === item.id).length > 0)) {
			this.setState(state => ({
				listData: state.listData.concat([item])
			}));
		}
	}
	/**
	 * Renders home
	 * @returns
	 */
	render() {
		const userID = this.props.navigation.getParam('userID', 'NO-ID');

		const renderItemArcIcon = style => <Icon {...style} name="globe-2-outline" />;
		const renderItemMuseumIcon = style => <Icon {...style} name="archive-outline" />;
		const renderItemHotelIcon = style => <Icon {...style} name="briefcase-outline" />;
		const renderItemRestIcon = style => <Icon {...style} name="award-outline" />;
		const renderItem = ({ item, index }) => (
			<ListItem
				title={item.title}
				description={item.description}
				icon={
					item.type == 'hotel'
						? renderItemHotelIcon
						: item.type == 'restaurant'
						? renderItemRestIcon
						: item.type == 'archsite'
						? renderItemArcIcon
						: item.type == 'museum'
						? renderItemMuseumIcon
						: null
				}
			/>
		);

		return (
			<Layout style={{ flex: 1 }}>
				<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
					<AddTravelGuideComponent>
						{AddTravelGuideMutation => (
							<Formik
								//değişkenlerin başlangıç değerleri
								initialValues={{
									foodTypeID: 0, //Sonra düzeltilecek
									title: '',
									cost: 0
								}}
								//Burada girilen değerlerin controlleri sağlanır
								validationSchema={Yup.object({
									title: Yup.string()
										.min(2, 'Too Short!')
										.max(50, 'Too Long!')
										.required('Required'),
									cost: Yup.number().required('Required')
								})}
								//Kaydet butonuna tıklandığında bu fonksiyon çalışır
								onSubmit={(values, formikActions) => {
									setTimeout(() => {
										AddTravelGuideMutation({
											variables: {
												travelGuide: [
													{
														title: values.title,
														userID: userID,
														creationDate: new Date(),
														cost: values.cost,
														TravelGuideHotels: { data: this.state.listData } //değiştir
													}
												]
											}
										})
											.then(res => {
												alert(JSON.stringify(res));

												//this.props.navigation.navigate('Home');
											})
											.catch(err => {
												alert(err);
											});
										formikActions.setSubmitting(false);
									}, 500);
								}}
							>
								{/* Bu kısımda görsel parçalar eklenir */}
								{props => (
									<Layout>
										{props.isSubmitting && <Spinner />}

										<Input
											label="Title"
											placeholder="Enter a title for your travel guide"
											status={props.touched.title && props.errors.title ? 'danger' : 'success'}
											caption={props.touched.title && props.errors.title ? props.errors.title : ''}
											onChangeText={props.handleChange('title')}
											onBlur={props.handleBlur('title')}
											value={props.values.title}
											autoFocus
										/>
										<Input
											label="Cost"
											placeholder="Enter cost"
											status={props.touched.cost && props.errors.cost ? 'danger' : 'success'}
											caption={props.touched.cost && props.errors.cost ? props.errors.cost : ''}
											onChangeText={props.handleChange('cost')}
											onBlur={props.handleBlur('cost')}
											value={props.values.cost.toString()}
											autoFocus
										/>

										<TabView
											selectedIndex={this.state.selectedIndex}
											onSelect={value => {
												this.setState({ setSelectedIndex: value });
											}}
										>
											<Tab title="Add yours">
												<Layout style={styles.tabContainer}></Layout>
											</Tab>
											<Tab title="Arch. Sites">
												<Layout style={styles.tabContainer}>
													<ArchSiteLocationComponent
														marker={value => {
															/*this.setState({
																latitude: value
															});*/
															//console.log(value);
															let item = {
																id: value.id,
																title: value.title,
																description: value.description,
																type: value.type
															};
															this.addItem(item);
														}}
													/>
												</Layout>
											</Tab>
											<Tab title="Museums">
												<Layout style={styles.tabContainer}>
													<MuseumLocationComponent
														marker={value => {
															/*this.setState({
																	latitude: value
																});*/
															//console.log(value);
															let item = {
																id: value.id,
																title: value.title,
																description: value.description,
																type: value.type
															};
															this.addItem(item);
														}}
													/>
												</Layout>
											</Tab>
											<Tab title="Restaurants">
												<Layout style={styles.tabContainer}>
													<RestaurantLocationComponent
														marker={value => {
															/*this.setState({
																latitude: value
															});*/
															//console.log(value);
															let item = {
																id: value.id,
																title: value.title,
																description: value.description,
																type: value.type
															};
															this.addItem(item);
														}}
													/>
												</Layout>
											</Tab>
											<Tab title="Hotels">
												<Layout style={styles.tabContainer}>
													<HotelLocationComponent
														marker={value => {
															/*this.setState({
																	latitude: value
																});*/
															//console.log(value);
															let item = {
																id: value.id,
																title: value.title,
																description: value.description,
																type: value.type
															};
															this.addItem(item);
														}}
													/>
												</Layout>
											</Tab>
										</TabView>
										<List data={this.state.listData} renderItem={renderItem} />
										<Button
											onPress={() => {
												props.handleSubmit();
											}}
											disabled={props.isSubmitting}
										>
											Add Travel Guide
										</Button>
									</Layout>
								)}
							</Formik>
						)}
					</AddTravelGuideComponent>
				</ScrollView>
			</Layout>
		);
	}
}

const styles: any = StyleSheet.create({
	mapStyle: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height / 2
	}
});
