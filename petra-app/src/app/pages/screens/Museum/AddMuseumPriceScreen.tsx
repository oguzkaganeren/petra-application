import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Layout, Input, RangeDatepicker, Spinner } from '@ui-kitten/components';
import { AddMuseumPriceComponent } from '../../../generated/components';
import GetAllMuseumEntranceTypesComponent from '../../../components/Museum/GetAllMuseumEntranceTypesComponent';
import GetAllUserMuseumComponent from '../../../components/Museum/GetAllUserMuseumComponent';
import { Formik } from 'formik';
import * as Yup from 'yup';

export interface AddMuseumPriceProps {
	navigation: any;
	route: any;
}

const AddMuseumPriceScreen: React.FC<AddMuseumPriceProps> = props => {
	const [theDate, setTheDate] = React.useState({});

	const onSelect = value => {
		setTheDate(value);
	};

	const { userID } = props.route.params;
	const { museumID } = props.route.params;
	return (
		<Layout style={{ flex: 1 }}>
			<AddMuseumPriceComponent>
				{AddMuseumPriceMutation => (
					<Formik
						//değişkenlerin başlangıç değerleri
						initialValues={{
							museumID: 0,
							price: 0,
							entranceTypeID: 0
						}}
						//Burada girilen değerlerin controlleri sağlanır
						validationSchema={Yup.object({
							price: Yup.number().required('Required')
						})}
						//Kaydet butonuna tıklandığında bu fonksiyon çalışır
						onSubmit={(values, formikActions) => {
							setTimeout(() => {
								AddMuseumPriceMutation({
									variables: {
										MuseumPrice: [
											{
												museumID: museumID,
												finishDate: theDate.endDate,
												startDate: theDate.startDate,
												price: values.price,
												entranceTypeID: values.entranceTypeID
											}
										]
									}
								})
									.then(res => {
										alert(JSON.stringify(res));
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

								<GetAllMuseumEntranceTypesComponent
									label="Select EntranceType"
									parentReference={value => {
										props.values.entranceTypeID = value;
									}}
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
									Add Museum Price
								</Button>
							</Layout>
						)}
					</Formik>
				)}
			</AddMuseumPriceComponent>
		</Layout>
	);
};

const styles: any = StyleSheet.create({});
export default AddMuseumPriceScreen;
