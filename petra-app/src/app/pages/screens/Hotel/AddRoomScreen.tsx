import * as React from 'react';
import { StyleSheet, View, ToastAndroid } from 'react-native';
import { Button, Layout, Input, Text, Spinner } from '@ui-kitten/components';
import { AddRoomComponent, GetUserHotelComponent } from '../../../generated/components';
import { GetAllRoomPropertyComponent } from '../../../components/Hotel/GetAllRoomProperty';
import { GetAllUserHotelComponent } from '../../../components/Hotel/GetAllUserHotel';
import { Formik } from 'formik';
import * as Yup from 'yup';
/**
 * AddRestaurant props
 */
export interface AddRoomProps {
	navigation: any;
}
/**
 * Location state
 */
export interface AddRoomState {}

/**
 * Location
 */
export class AddRoomScreen extends React.Component<AddRoomProps, AddRoomState> {
	constructor(props: AddRoomProps) {
		super(props);
		this.state = {};
		/**
		 * {"roomPropRoom": [{"roomPropertyID": 1},{"roomPropertyID": 2}]}
		 */
	}

	/**
	 * Renders
	 * @returns
	 */
	render() {
		const userID = this.props.navigation.getParam('userID', 'NO-ID');
		return (
			<Layout style={{ flex: 1 }}>
				<AddRoomComponent>
					{AddRoomMutation => (
						<Formik
							//değişkenlerin başlangıç değerleri
							initialValues={{
								roomNo: '',
								roomPropRoom: [],
								hotelID: 0
							}}
							//Burada girilen değerlerin controlleri sağlanır
							validationSchema={Yup.object({
								roomNo: Yup.string()
									.min(1, 'Too Short!')
									.max(50, 'Too Long!')
									.required('Required')
							})}
							//Kaydet butonuna tıklandığında bu fonksiyon çalışır
							onSubmit={(values, formikActions) => {
								setTimeout(() => {
									AddRoomMutation({
										variables: {
											roomNo: values.roomNo,
											roomPropRoom: values.roomPropRoom,
											hotelID: values.hotelID
										}
									})
										.then(res => {
											alert(JSON.stringify(res));
											ToastAndroid.show('Room property has been added successfully', ToastAndroid.SHORT);

											//this.props.navigation.navigate('Home');
										})
										.catch(err => {
											alert(err);
											console.log('roomProp:' + values.roomPropRoom);
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
										label="Room No"
										placeholder="Enter a Room No"
										status={props.touched.roomNo && props.errors.roomNo ? 'danger' : 'success'}
										caption={props.touched.roomNo && props.errors.roomNo ? props.errors.roomNo : ''}
										onChangeText={props.handleChange('roomNo')}
										onBlur={props.handleBlur('roomNo')}
										value={props.values.roomNo}
										autoFocus
									/>
									<GetAllRoomPropertyComponent
										label="Select Room Properties"
										parentReference={value => {
											props.values.roomPropRoom = value;
										}}
									/>
									<GetAllUserHotelComponent
										label="Select Your Company"
										parentReference={value => {
											props.values.hotelID = value;
										}}
										userID={parseInt(userID)}
									/>
									<Button
										onPress={() => {
											props.handleSubmit();
										}}
										disabled={props.isSubmitting}
									>
										Add Room
									</Button>
								</Layout>
							)}
						</Formik>
					)}
				</AddRoomComponent>
			</Layout>
		);
	}
}

const styles: any = StyleSheet.create({});
