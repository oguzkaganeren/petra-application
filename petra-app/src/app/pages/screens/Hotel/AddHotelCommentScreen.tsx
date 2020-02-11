import * as React from 'react';
import { StyleSheet, View, ToastAndroid } from 'react-native';
import { Button, Layout, Input, Text, Spinner } from '@ui-kitten/components';
import { AddHotelCommentComponent } from '../../../generated/components';
import { Formik } from 'formik';
import * as Yup from 'yup';
/**
 * AddHotel props
 */
export interface AddHotelCommentProps {
	navigation: any;
}
/**
 * AddHotel state
 */
export interface AddHotelCommentState {}

/**
 * AddHotel
 */
export class AddHotelCommentScreen extends React.Component<AddHotelCommentProps, AddHotelCommentState> {
	constructor(props: AddHotelCommentProps) {
		super(props);
		this.state = {};
	}
	/**
	 * Renders
	 * @returns
	 */
	render() {
		const userID = this.props.navigation.getParam('userID', 'NO-ID');
		const hotelID = this.props.navigation.getParam('hotelID', 'NO-ID');
		return (
			<Layout style={{ flex: 1 }}>
				<AddHotelCommentComponent>
					{AddHotelCommentMutation => (
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
									AddHotelCommentMutation({
										variables: {
											content: values.content,
											date: new Date(),
											hotelID: hotelID,
											star: values.star,
											userID: userID
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
											console.log('star:' + values.star);
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
									<Input
										label="Star"
										status={props.touched.star && props.errors.star ? 'danger' : 'success'}
										caption={props.touched.star && props.errors.star ? props.errors.star : ''}
										placeholder="3"
										onChangeText={props.handleChange('star')}
										onBlur={props.handleBlur('star')}
										value={props.values.star.toString()}
									/>
									<Button
										onPress={() => {
											props.handleSubmit();
										}}
										disabled={props.isSubmitting}
									>
										Add Hotel Comment
									</Button>
								</Layout>
							)}
						</Formik>
					)}
				</AddHotelCommentComponent>
			</Layout>
		);
	}
}

const styles: any = StyleSheet.create({});
