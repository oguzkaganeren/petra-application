import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Layout, Input, RangeDatepicker, Spinner } from '@ui-kitten/components';
import { AddHotelRoomPriceComponent } from '../../../generated/components';
import GetAllHotelRoomComponent from '../../../components/Hotel/GetAllHotelRoomComponent';
import { Formik } from 'formik';
import * as Yup from 'yup';

export interface AddHotelRoomPriceProps {
	navigation: any;
	route: any;
}

const AddHotelRoomPriceScreen: React.FC<AddHotelRoomPriceProps> = props => {
	const [theDate, setTheDate] = React.useState({});
	const onSelect = value => {
		setTheDate(value);
	};

	const { userID } = props.route.params;
	const { hotelID } = props.route.params;
	return (
		<Layout style={{ flex: 1 }}>
			<AddHotelRoomPriceComponent>
				{AddHotelRoomPriceMutation => (
					<Formik
						//değişkenlerin başlangıç değerleri
						initialValues={{
							roomID: 0,
							price: 0,
							hotelID: hotelID
						}}
						//Burada girilen değerlerin controlleri sağlanır
						validationSchema={Yup.object({
							price: Yup.number().required('Required')
						})}
						//Kaydet butonuna tıklandığında bu fonksiyon çalışır
						onSubmit={(values, formikActions) => {
							setTimeout(() => {
								AddHotelRoomPriceMutation({
									variables: {
										RoomPrice: [
											{
												roomID: values.roomID,
												finishDate: theDate.endDate,
												startDate: theDate.startDate,
												price: values.price
											}
										]
									}
								})
									.then(res => {
										alert(JSON.stringify(res));
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

								<GetAllHotelRoomComponent
									label="Select Hotel Room"
									parentReference={value => {
										props.values.roomID = value;
									}}
									hotelID={hotelID}
								/>
								<Input
									label="Price"
									placeholder="Enter price"
									status={props.touched.price && props.errors.price ? 'danger' : 'success'}
									caption={props.touched.price && props.errors.price ? props.errors.price : ''}
									onChangeText={props.handleChange('price')}
									onBlur={props.handleBlur('price')}
									value={props.values.price.toString()}
								/>
								<RangeDatepicker range={theDate} onSelect={value => onSelect(value)} />
								<Button
									onPress={() => {
										props.handleSubmit();
									}}
									disabled={props.isSubmitting}
								>
									Add Room Price
								</Button>
							</Layout>
						)}
					</Formik>
				)}
			</AddHotelRoomPriceComponent>
		</Layout>
	);
};

const styles: any = StyleSheet.create({});
export default AddHotelRoomPriceScreen;
