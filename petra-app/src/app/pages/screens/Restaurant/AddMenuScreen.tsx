import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Layout, Input, Text, Spinner } from '@ui-kitten/components';
import { AddRestaurantMenuComponent } from '../../../generated/components';
import { GetAllUserRestaurantComponent } from '../../../components/Restaurant/GetAllUserRestaurant';
import { GetAllFoodComponent } from '../../../components/Restaurant/GetAllFood';
import { Formik } from 'formik';
import * as Yup from 'yup';
/**
 * AddRestaurant props
 */
export interface AddMenuProps {
	navigation: any;
	route: any;
}
/**
 * Location state
 */
export interface AddMenuState {}

/**
 * Location
 */
export class AddMenuScreen extends React.Component<AddMenuProps, AddMenuState> {
	constructor(props: AddMenuProps) {
		super(props);
		this.state = {};
	}

	/**
	 * Renders
	 * @returns
	 */
	render() {
		const { userID } = this.props.route.params;
		return (
			<Layout style={{ flex: 1 }}>
				<AddRestaurantMenuComponent>
					{AddRestaurantMenuMutation => (
						<Formik
							//değişkenlerin başlangıç değerleri
							initialValues={{
								restaurantID: 0,
								name: '',
								price: 0,
								restaurantFoods: []
							}}
							//Burada girilen değerlerin controlleri sağlanır
							validationSchema={Yup.object({
								name: Yup.string()
									.min(2, 'Too Short!')
									.max(50, 'Too Long!')
									.required('Required'),
								price: Yup.number().required('Required')
							})}
							//Kaydet butonuna tıklandığında bu fonksiyon çalışır
							onSubmit={(values, formikActions) => {
								setTimeout(() => {
									console.log(values.restaurantFoods);
									AddRestaurantMenuMutation({
										variables: {
											restaurantMenu: [
												{
													name: values.name,
													price: values.price,
													restaurantID: values.restaurantID,
													RestaurantMenuFoods: { data: values.restaurantFoods }
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
									<GetAllUserRestaurantComponent
										label="Select Your Restaurant"
										parentReference={value => {
											props.values.restaurantID = value;
										}}
										userID={parseInt(userID)}
									/>
									<Input
										label="Menu Name"
										placeholder="Enter a Menu Name"
										status={props.touched.name && props.errors.name ? 'danger' : 'success'}
										caption={props.touched.name && props.errors.name ? props.errors.name : ''}
										onChangeText={props.handleChange('name')}
										onBlur={props.handleBlur('name')}
										value={props.values.name}
										autoFocus
									/>
									<Input
										label="Price"
										placeholder="Enter a Food Price"
										status={props.touched.price && props.errors.price ? 'danger' : 'success'}
										caption={props.touched.price && props.errors.price ? props.errors.price : ''}
										onChangeText={props.handleChange('price')}
										onBlur={props.handleBlur('price')}
										value={props.values.price.toString()}
									/>
									<GetAllFoodComponent
										label="Select Foods"
										parentReference={value => {
											props.values.restaurantFoods = value;
										}}
									/>
									<Button
										onPress={() => {
											props.handleSubmit();
										}}
										disabled={props.isSubmitting}
									>
										Add Menu
									</Button>
								</Layout>
							)}
						</Formik>
					)}
				</AddRestaurantMenuComponent>
			</Layout>
		);
	}
}

const styles: any = StyleSheet.create({});
