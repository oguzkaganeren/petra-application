import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Layout, Input, Text, Spinner } from '@ui-kitten/components';
import { AddFoodTypeComponent } from '../../../generated/components';
import { Formik } from 'formik';
import Toast from 'react-native-easy-toast';
import * as Yup from 'yup';

export interface AddFoodTypeProps {
	navigation: any;
	route: any;
}

const AddFoodTypeScreen: React.FC<AddFoodTypeProps> = (props) => {
	const toastRef = React.useRef();
	return (
		<Layout style={{ flex: 1 }}>
			<AddFoodTypeComponent>
				{(AddFoodTypeMutation) => (
					<Formik
						//değişkenlerin başlangıç değerleri
						initialValues={{
							foodType: '',
						}}
						//Burada girilen değerlerin controlleri sağlanır
						validationSchema={Yup.object({
							foodType: Yup.string()
								.min(2, 'Too Short!')
								.max(50, 'Too Long!')
								.required('Required'),
						})}
						//Kaydet butonuna tıklandığında bu fonksiyon çalışır
						onSubmit={(values, formikActions) => {
							setTimeout(() => {
								console.log(values.foodType + ' ');
								AddFoodTypeMutation({
									variables: {
										foodType: [{ type: values.foodType.toString() }],
									},
								})
									.then((res) => {
										//alert(JSON.stringify(res));
										toastRef.current.show(values.foodType + ' added. Redirecting to the previous page...', 500, () => {
											props.navigation.goBack();
										});
									})
									.catch((err) => {
										alert(err);
										console.log('foodType:' + values.foodType);
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
									label="Food Type"
									placeholder="Enter a Food Type"
									status={props.touched.foodType && props.errors.foodType ? 'danger' : 'success'}
									caption={props.touched.foodType && props.errors.foodType ? props.errors.foodType : ''}
									onChangeText={props.handleChange('foodType')}
									onBlur={props.handleBlur('foodType')}
									value={props.values.foodType}
									autoFocus
								/>
								<Toast ref={toastRef} />
								<Button
									onPress={() => {
										props.handleSubmit();
									}}
									disabled={props.isSubmitting}
								>
									Add Food Type
								</Button>
							</Layout>
						)}
					</Formik>
				)}
			</AddFoodTypeComponent>
		</Layout>
	);
};

const styles: any = StyleSheet.create({});
export default AddFoodTypeScreen;
