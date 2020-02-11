import * as React from 'react';
import { StyleSheet, ScrollView, ToastAndroid } from 'react-native';
import { Button, Layout, Input, Text, Spinner, Datepicker } from '@ui-kitten/components';
import { AddMuseumComponent, GetUserCompanyComponent } from '../../../generated/components';
import { LocationComponent } from '../../../components/Public/LocationComponent';
import { GetAllUserCompanyComponent } from '../../../components/Company/GetAllUserCompany';
import { GetAllMuseumTypesComponent } from '../../../components/Museum/GetAllMuseumTypes';
import { Formik } from 'formik';
import * as Yup from 'yup';
/**
 * AddRestaurant props
 */
export interface AddMuseumProps {
	navigation: any;
}
/**
 * Location state
 */
export interface AddMuseumState {}

/**
 * Location
 */
export class AddMuseumScreen extends React.Component<AddMuseumProps, AddMuseumState> {
	constructor(props: AddMuseumProps) {
		super(props);
		this.state = {};
	}
	convertDateFormatForQuery = (date: Date) => {
		console.log('A date has been picked: ', date);
		let formattedDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

		return formattedDate;
	};
	/**
	 * Renders
	 * @returns
	 */
	render() {
		const userID = this.props.navigation.getParam('userID', 'NO-ID');
		return (
			<Layout style={{ flex: 1 }}>
				<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
					<AddMuseumComponent>
						{AddMuseumMutation => (
							<Formik
								//değişkenlerin başlangıç değerleri
								initialValues={{
									MuseumTypeID: 0,
									altitude: 0.0,
									companyID: 0,
									description: '',
									name: '',
									address: '',
									latitude: '',
									longtitude: ''
								}}
								//Burada girilen değerlerin controlleri sağlanır
								validationSchema={Yup.object({
									name: Yup.string()
										.min(2, 'Too Short!')
										.max(50, 'Too Long!')
										.required('Required'),
									address: Yup.string()
										.min(5, 'Too Short!')
										.required('Required'),
									altitude: Yup.number().required('Required'),
									description: Yup.string()
										.min(5, 'Too Short!')
										.required('Required'),
									//sadece longtitude kontrol etsem yeterli
									longtitude: Yup.number().required('Required')
								})}
								//Kaydet butonuna tıklandığında bu fonksiyon çalışır
								onSubmit={(values, formikActions) => {
									setTimeout(() => {
										console.log(
											values.name + ' ' + values.address + ' ' + values.altitude + ' ' + values.description + ' '
										);
										AddMuseumMutation({
											variables: {
												name: values.name.toString(),
												description: values.description, //sonra utc ayarına bak!
												longtitude: parseFloat(values.longtitude),
												latitude: parseFloat(values.latitude),
												address: values.address.toString(),
												companyID: values.companyID,
												museumTypeID: values.MuseumTypeID
											}
										})
											.then(res => {
												alert(JSON.stringify(res));
												ToastAndroid.show('Company has been added successfully', ToastAndroid.SHORT);

												//this.props.navigation.navigate('Home');
											})
											.catch(err => {
												alert(err);
												console.log('name:' + values.name);
												console.log('address:' + values.address);
												console.log('altitude:' + values.altitude);
												console.log('archSiteTypeID:' + values.MuseumTypeID);
												console.log('description:' + values.description);
												console.log('long:' + values.longtitude);
												console.log('lat:' + values.latitude);
												console.log('address:' + values.address);
											});
										formikActions.setSubmitting(false);
									}, 500);
								}}
							>
								{/* Bu kısımda görsel parçalar eklenir */}
								{props => (
									<Layout>
										{props.isSubmitting && <Spinner />}

										<Button
											onPress={() => {
												props.handleSubmit();
											}}
											disabled={props.isSubmitting}
										>
											Add Museum
										</Button>
										<GetAllUserCompanyComponent
											label="Select Your Company"
											parentReference={value => {
												props.values.companyID = value;
											}}
											userID={parseInt(userID)}
										/>
										<Input
											label="Museum Name"
											placeholder="Enter Your Museum Name"
											status={props.touched.name && props.errors.name ? 'danger' : 'success'}
											caption={props.touched.name && props.errors.name ? props.errors.name : ''}
											onChangeText={props.handleChange('name')}
											onBlur={props.handleBlur('name')}
											value={props.values.name}
											autoFocus
										/>
										<Input
											label="Address"
											status={props.touched.address && props.errors.address ? 'danger' : 'success'}
											caption={props.touched.address && props.errors.address ? props.errors.address : ''}
											placeholder="your address"
											onChangeText={props.handleChange('address')}
											onBlur={props.handleBlur('address')}
											value={props.values.address}
										/>

										<GetAllMuseumTypesComponent
											label="Select Museum Type"
											parentReference={value => {
												props.values.MuseumTypeID = value;
											}}
										/>
										<Input
											label="Description"
											status={props.touched.description && props.errors.description ? 'danger' : 'success'}
											caption={props.touched.description && props.errors.description ? props.errors.description : ''}
											placeholder="Enter the Description of the Archsite"
											onChangeText={props.handleChange('description')}
											onBlur={props.handleBlur('description')}
											value={props.values.description}
										/>

										<LocationComponent
											latitude={value => {
												props.values.latitude = value;
											}}
											longitude={value => {
												props.values.longtitude = value;
											}}
										/>
										{props.touched.longtitude && props.errors.longtitude ? (
											<Text status="danger">{props.errors.longtitude}</Text>
										) : null}
									</Layout>
								)}
							</Formik>
						)}
					</AddMuseumComponent>
				</ScrollView>
			</Layout>
		);
	}
}

const styles: any = StyleSheet.create({});
