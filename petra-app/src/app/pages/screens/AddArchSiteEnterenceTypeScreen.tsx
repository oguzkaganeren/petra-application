import * as React from 'react';
import { StyleSheet, View, ToastAndroid } from 'react-native';
import { Button, Layout, Input, Text, Spinner } from '@ui-kitten/components';
import { AddArchSiteEntranceTypeComponent } from '../../generated/components';
import { Formik } from 'formik';
import * as Yup from 'yup';
/**
 * AddHotel props
 */
export interface AddArchSiteEntranceTypeProps {
	navigation: any;
}
/**
 * AddHotel state
 */
export interface AddArchSiteEntranceTypeState {}

/**
 * AddHotel
 */
export class AddArchSiteEntranceTypeScreen extends React.Component<
	AddArchSiteEntranceTypeProps,
	AddArchSiteEntranceTypeState
> {
	constructor(props: AddArchSiteEntranceTypeProps) {
		super(props);
		this.state = {};
	}
	/**
	 * Renders
	 * @returns
	 */
	render() {
		const userID = this.props.navigation.getParam('userID', 'NO-ID');
		const archSiteID = this.props.navigation.getParam('archSiteID', 'NO-ID');
		return (
			<Layout style={{ flex: 1 }}>
				<AddArchSiteEntranceTypeComponent>
					{AddArchSiteEntranceTypeMutation => (
						<Formik
							//değişkenlerin başlangıç değerleri
							initialValues={{
								content: '',
								star: 0
							}}
							//Burada girilen değerlerin controlleri sağlanır
							validationSchema={Yup.object({
								content: Yup.string()
									.min(2, 'Too Short!')
									.max(50, 'Too Long!')
									.required('Required'),
								star: Yup.number().required('Required')
							})}
							//Kaydet butonuna tıklandığında bu fonksiyon çalışır
							onSubmit={(values, formikActions) => {
								setTimeout(() => {
									AddArchSiteEntranceTypeMutation({
										variables: {
											content: values.content
										}
									})
										.then(res => {
											alert(JSON.stringify(res));
											ToastAndroid.show('Company has been added successfully', ToastAndroid.SHORT);

											//this.props.navigation.navigate('Home');
										})
										.catch(err => {
											alert(err);
											console.log('content:' + values.content);
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
										label="Content"
										placeholder="Enter your comment"
										status={props.touched.content && props.errors.content ? 'danger' : 'success'}
										caption={props.touched.content && props.errors.content ? props.errors.content : ''}
										onChangeText={props.handleChange('content')}
										onBlur={props.handleBlur('content')}
										value={props.values.content}
										autoFocus
									/>

									<Button
										onPress={() => {
											props.handleSubmit();
										}}
										disabled={props.isSubmitting}
									>
										Add ArchSite Entrance Type
									</Button>
								</Layout>
							)}
						</Formik>
					)}
				</AddArchSiteEntranceTypeComponent>
			</Layout>
		);
	}
}
