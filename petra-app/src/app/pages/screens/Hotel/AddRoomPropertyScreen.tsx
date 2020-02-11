import * as React from 'react';
import { StyleSheet, View, ToastAndroid } from 'react-native';
import { Button, Layout, Input, Text, Spinner } from '@ui-kitten/components';
import { AddRoomPropertyComponent } from '../../../generated/components';
import { Formik } from 'formik';
import * as Yup from 'yup';
/**
 * AddRestaurant props
 */
export interface AddRoomPropertyProps {
	navigation: any;
}
/**
 * Location state
 */
export interface AddRoomPropertyState {}

/**
 * Location
 */
export class AddRoomPropertyScreen extends React.Component<AddRoomPropertyProps, AddRoomPropertyState> {
	constructor(props: AddRoomPropertyProps) {
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
				<AddRoomPropertyComponent>
					{AddRoomProperyMutation => (
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
									console.log(values.content + ' ');
									AddRoomProperyMutation({
										variables: {
											content: values.content.toString()
										}
									})
										.then(res => {
											alert(JSON.stringify(res));
											ToastAndroid.show('Room property has been added successfully', ToastAndroid.SHORT);

											//this.props.navigation.navigate('Home');
										})
										.catch(err => {
											alert(err);
											console.log('roomProp:' + values.content);
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
										label="Room Property Type"
										placeholder="Enter a Room Property Type"
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
										Add Room Property
									</Button>
								</Layout>
							)}
						</Formik>
					)}
				</AddRoomPropertyComponent>
			</Layout>
		);
	}
}

const styles: any = StyleSheet.create({});
