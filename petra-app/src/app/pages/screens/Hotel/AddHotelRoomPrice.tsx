import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Layout, Input, RangeDatepicker, Spinner } from '@ui-kitten/components';
import { AddHotelRoomPriceComponent } from '../../../generated/components';
import { GetAllHotelRoomComponent } from '../../../components/Hotel/GetAllHotelRoom';
import { GetAllUserHotelComponent } from '../../../components/Hotel/GetAllUserHotel';
import { Formik } from 'formik';
import * as Yup from 'yup';
/**
 * AddRestaurant props
 */
export interface AddHotelRoomPriceProps {
	navigation: any;
	route: any;
}
/**
 * Location state
 */
export interface AddHotelRoomPriceState {
	hotelID: number;
	theDate: any;
}

/**
 * Location
 */
export class AddHotelRoomPriceScreen extends React.Component<AddHotelRoomPriceProps, AddHotelRoomPriceState> {
	constructor(props: AddHotelRoomPriceProps) {
		super(props);
		this.state = {
			hotelID: 0,
			theDate: {}
		};
		/**
		 * {"roomPropRoom": [{"roomPropertyID": 1},{"roomPropertyID": 2}]}
		 */
	}
	onSelect = value => {
		this.setState({ theDate: value });
	};
	/**
	 * Renders
	 * @returns
	 */
	render() {
		const { userID } = this.props.route.params;
		return (
			<Layout style={{ flex: 1 }}>
				<AddHotelRoomPriceComponent>
					{AddHotelRoomPriceMutation => (
						<Formik
							//değişkenlerin başlangıç değerleri
							initialValues={{
								roomID: 0,
								price: 0,
								hotelID: 0
							}}
							//Burada girilen değerlerin controlleri sağlanır
							validationSchema={Yup.object({
								price: Yup.number().required('Required')
							})}
							//Kaydet butonuna tıklandığında bu fonksiyon çalışır
							onSubmit={(values, formikActions) => {
								setTimeout(() => {
									console.log(this.state.theDate.endDate);
									console.log(this.state.theDate.startDate);
									AddHotelRoomPriceMutation({
										variables: {
											roomID: values.roomID,
											finishDate: this.state.theDate.endDate,
											startDate: this.state.theDate.startDate,
											price: values.price
										}
									})
										.then(res => {
											alert(JSON.stringify(res));

											//this.props.navigation.navigate('Home');
										})
										.catch(err => {
											alert(err);
											//console.log('roomProp:' + values.roomPropRoom);
										});
									formikActions.setSubmitting(false);
								}, 500);
							}}
						>
							{/* Bu kısımda görsel parçalar eklenir */}
							{props => (
								<Layout>
									{props.isSubmitting && <Spinner />}
									<GetAllUserHotelComponent
										label="Select Your Company"
										parentReference={value => {
											props.values.hotelID = value;
											this.setState({ hotelID: value });
										}}
										userID={parseInt(userID)}
									/>
									<GetAllHotelRoomComponent
										label="Select Hotel Room"
										parentReference={value => {
											props.values.roomID = value;
										}}
										hotelID={this.state.hotelID}
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
									<RangeDatepicker range={this.state.theDate} onSelect={this.onSelect} />
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
	}
}

const styles: any = StyleSheet.create({});
