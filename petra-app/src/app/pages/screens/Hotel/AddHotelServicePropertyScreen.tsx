import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Layout, Input, Text, Spinner } from '@ui-kitten/components';
import { AddHotelServicePropertyComponent } from '../../../generated/components';
import { Formik } from 'formik';
import * as Yup from 'yup';
/**
 * AddRestaurant props
 */
export interface AddHotelServicePropertyProps {
	navigation: any;
	route: any;
}
/**
 * Location state
 */
export interface AddHotelServicePropertyState {}

/**
 * Location
 */
export class AddHotelServicePropertyScreen extends React.Component<
	AddHotelServicePropertyProps,
	AddHotelServicePropertyState
> {
	constructor(props: AddHotelServicePropertyProps) {
		super(props);
		this.state = {};
	}

	/**
	 * Renders
	 * @returns
	 */
	render() {
		return (
			<Layout style={{ flex: 1 }}>
				<AddHotelServicePropertyComponent>
					{AddHotelServicePropertyMutation => (
						<Formik
							//değişkenlerin başlangıç değerleri
							initialValues={{
								content: ''
							}}
							//Burada girilen değerlerin controlleri sağlanır
							validationSchema={Yup.object({
								content: Yup.string()
									.min(2, 'Too Short!')
									.max(50, 'Too Long!')
									.required('Required')
							})}
							//Kaydet butonuna tıklandığında bu fonksiyon çalışır
							onSubmit={(values, formikActions) => {
								setTimeout(() => {
									AddHotelServicePropertyMutation({
										variables: {
											HotelServiceProperty:[
												{
													content: values.content.toString()
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
											console.log('foodType:' + values.content);
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
										label="Service Property"
										placeholder="Enter a Service Property"
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
										Add Service Property
									</Button>
								</Layout>
							)}
						</Formik>
					)}
				</AddHotelServicePropertyComponent>
			</Layout>
		);
	}
}

const styles: any = StyleSheet.create({});
