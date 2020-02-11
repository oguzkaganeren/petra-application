import * as React from 'react';
import { StyleSheet, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { Button, Layout, Input, Spinner } from '@ui-kitten/components';
import { ArchSiteLocationComponent } from '../../../components/ArchSite/ArchSiteLocationComponent';
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
}

/**
 * Home
 */
export class AddTravelGuideScreen extends React.Component<AddTravelGuideProps, AddTravelGuideState> {
	constructor(props: AddTravelGuideProps) {
		super(props);
		this.state = {
			longtitude: 0,
			latitude: 0
		};
	}
	/**
	 * Renders home
	 * @returns
	 */
	render() {
		const userID = this.props.navigation.getParam('userID', 'NO-ID');
		const travelGuideTest = '';
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
										console.log(values.name + ' ' + values.price + ' ' + values.foodTypeID);
										AddTravelGuideMutation({
											variables: {
												travelGuide: [
													{ title: values.title, userID: userID, creationDate: new Date(), cost: values.cost }
												]
											}
										})
											.then(res => {
												alert(JSON.stringify(res));

												//this.props.navigation.navigate('Home');
											})
											.catch(err => {
												alert(err);
												console.log('name:' + values.name);
												console.log('price:' + values.price);
												console.log('foodTypeId:' + values.foodTypeID);
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
										<ArchSiteLocationComponent
											latitude={value => {
												this.setState({
													latitude: value
												});
												console.log(value);
											}}
											longitude={value => {
												this.setState({
													longtitude: value
												});
												console.log(value);
											}}
										/>
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
