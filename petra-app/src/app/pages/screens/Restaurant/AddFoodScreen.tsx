import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Layout, Input, Text, Spinner } from '@ui-kitten/components';
import { AddFoodComponent } from '../../../generated/components';
import { GetAllFoodTypesComponent } from '../../../components/Restaurant/GetAllFoodTypes';
import { Formik } from 'formik';
import * as Yup from 'yup';
/**
 * AddRestaurant props
 */
export interface AddFoodProps {
	navigation: any;
	route: any;
}
/**
 * Location state
 */
export interface AddFoodState {}

/**
 * Location
 */
export class AddFoodScreen extends React.Component<AddFoodProps, AddFoodState> {
	constructor(props: AddFoodProps) {
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
				<AddFoodComponent>
					{AddFoodMutation => (
						<Formik
							//değişkenlerin başlangıç değerleri
							initialValues={{
								foodTypeID: 0, //Sonra düzeltilecek
								name: '',
								price: 0
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
									console.log(values.name + ' ' + values.price + ' ' + values.foodTypeID);
									AddFoodMutation({
										variables: {
											food:[
												{
													name: values.name,
													price: values.price,
													restaurantFoodTypeID: values.foodTypeID
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

									<Input
										label="Food Name"
										placeholder="Enter a Food Name"
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
									<GetAllFoodTypesComponent
										label="Select Food Type"
										parentReference={value => {
											props.values.foodTypeID = value;
										}}
									/>
									<Button
										onPress={() => {
											props.handleSubmit();
										}}
										disabled={props.isSubmitting}
									>
										Add Food
									</Button>
								</Layout>
							)}
						</Formik>
					)}
				</AddFoodComponent>
			</Layout>
		);
	}
}

const styles: any = StyleSheet.create({});
