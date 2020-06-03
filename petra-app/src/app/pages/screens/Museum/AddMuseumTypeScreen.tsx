import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Layout, Input, Text, Spinner } from '@ui-kitten/components';
import { AddMuseumTypeComponent } from '../../../generated/components';
import Toast from 'react-native-easy-toast';
import { Formik } from 'formik';
import * as Yup from 'yup';

export interface AddMuseumTypeProps {
	navigation: any;
	route: any;
}

const AddMuseumTypeScreen: React.FC<AddMuseumTypeProps> = (props) => {
	const toastRef = React.useRef();
	return (
		<Layout style={{ flex: 1 }}>
			<AddMuseumTypeComponent>
				{(AddMuseumTypeMutation) => (
					<Formik
						//değişkenlerin başlangıç değerleri
						initialValues={{
							typeName: '',
						}}
						//Burada girilen değerlerin controlleri sağlanır
						validationSchema={Yup.object({
							typeName: Yup.string()
								.min(2, 'Too Short!')
								.max(50, 'Too Long!')
								.required('Required'),
						})}
						//Kaydet butonuna tıklandığında bu fonksiyon çalışır
						onSubmit={(values, formikActions) => {
							setTimeout(() => {
								console.log(values.typeName + ' ');
								AddMuseumTypeMutation({
									variables: {
										MuseumType: [
											{
												type: values.typeName.toString(),
											},
										],
									},
								})
									.then((res) => {
										//alert(JSON.stringify(res));
										toastRef.current.show(values.typeName + ' added. Redirecting to the previous page...', 500, () => {
											props.navigation.goBack();
										});
									})
									.catch((err) => {
										alert(err);
										console.log('ArchSiteType:' + values.typeName);
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
									label="Museum Type"
									placeholder="Enter a Museum Type"
									status={props.touched.typeName && props.errors.typeName ? 'danger' : 'success'}
									caption={props.touched.typeName && props.errors.typeName ? props.errors.typeName : ''}
									onChangeText={props.handleChange('typeName')}
									onBlur={props.handleBlur('typeName')}
									value={props.values.typeName}
									autoFocus
								/>
								<Toast ref={toastRef} />
								<Button
									onPress={() => {
										props.handleSubmit();
									}}
									disabled={props.isSubmitting}
								>
									Add Museum Type
								</Button>
							</Layout>
						)}
					</Formik>
				)}
			</AddMuseumTypeComponent>
		</Layout>
	);
};

const styles: any = StyleSheet.create({});
export default AddMuseumTypeScreen;
