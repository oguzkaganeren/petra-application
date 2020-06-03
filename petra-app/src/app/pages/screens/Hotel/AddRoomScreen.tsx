import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Layout, Input, Text, Spinner } from '@ui-kitten/components';
import { AddRoomComponent, GetUserHotelComponent } from '../../../generated/components';
import GetAllRoomPropertyComponent from '../../../components/Hotel/GetAllRoomProperty';
import { Formik } from 'formik';
import Toast from 'react-native-easy-toast';
import * as Yup from 'yup';

export interface AddRoomProps {
	navigation: any;
	route: any;
}

const AddRoomScreen: React.FC<AddRoomProps> = (props) => {
	const { userID } = props.route.params;
	const { hotelID } = props.route.params;
	const toastRef = React.useRef();
	return (
		<Layout style={{ flex: 1 }}>
			<AddRoomComponent>
				{(AddRoomMutation) => (
					<Formik
						//değişkenlerin başlangıç değerleri
						initialValues={{
							roomNo: '',
							roomPropRoom: [],
						}}
						//Burada girilen değerlerin controlleri sağlanır
						validationSchema={Yup.object({
							roomNo: Yup.string()
								.min(1, 'Too Short!')
								.max(50, 'Too Long!')
								.required('Required'),
						})}
						//Kaydet butonuna tıklandığında bu fonksiyon çalışır
						onSubmit={(values, formikActions) => {
							setTimeout(() => {
								AddRoomMutation({
									variables: {
										roomNo: values.roomNo,
										roomPropRoom: values.roomPropRoom,
										hotelID: hotelID,
									},
								})
									.then((res) => {
										//alert(JSON.stringify(res));
										toastRef.current.show(values.roomNo + ' added. Redirecting to the previous page...', 500, () => {
											props.navigation.goBack();
										});
										//this.props.navigation.navigate('Home');
									})
									.catch((err) => {
										alert(err);
										console.log('roomProp:' + values.roomPropRoom);
									});
								formikActions.setSubmitting(false);
							}, 500);
						}}
					>
						{/* Bu kısımda görsel parçalar eklenir */}
						{(props) => (
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
									parentReference={(value) => {
										props.values.roomPropRoom = value;
									}}
								/>
								<Toast ref={toastRef} />
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
};

const styles: any = StyleSheet.create({});
export default AddRoomScreen;
