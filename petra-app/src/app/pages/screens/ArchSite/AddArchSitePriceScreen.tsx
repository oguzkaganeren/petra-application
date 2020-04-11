import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Layout, Input, RangeDatepicker, Spinner } from '@ui-kitten/components';
import { AddArchSitePriceComponent } from '../../../generated/components';
import { GetAllArchSiteEntranceTypesComponent } from '../../../components/ArchSite/GetAllArchSiteEntranceTypes';
import { GetAllUserArchSiteComponent } from '../../../components/ArchSite/GetAllUserArchSite';
import { Formik } from 'formik';
import * as Yup from 'yup';
/**
 * AddRestaurant props
 */
export interface AddArchSitePriceProps {
	navigation: any;
	route: any;
}
/**
 * Location state
 */
export interface AddArchSitePriceState {
	archSiteID: number;
	entranceTypeID: number;
	theDate: any;
}

/**
 * Location
 */
export class AddArchSitePriceScreen extends React.Component<AddArchSitePriceProps, AddArchSitePriceState> {
	constructor(props: AddArchSitePriceProps) {
		super(props);
		this.state = {
			archSiteID: 0,
			entranceTypeID: 0,
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
		const { archSiteID } = this.props.route.params;
		return (
			<Layout style={{ flex: 1 }}>
				<AddArchSitePriceComponent>
					{AddArchSitePriceMutation => (
						<Formik
							//değişkenlerin başlangıç değerleri
							initialValues={{
								archSiteID: 0,
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
									console.log(this.state.theDate.endDate);
									console.log(this.state.theDate.startDate);
									AddArchSitePriceMutation({
										variables: {
											ArchSitePrice: [
												{
													archSiteID: archSiteID,
													finishDate: this.state.theDate.endDate,
													startDate: this.state.theDate.startDate,
													price: values.price,
													archSiteEntranceTypeID: values.entranceTypeID
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

									<GetAllArchSiteEntranceTypesComponent
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
				</AddArchSitePriceComponent>
			</Layout>
		);
	}
}

const styles: any = StyleSheet.create({});
