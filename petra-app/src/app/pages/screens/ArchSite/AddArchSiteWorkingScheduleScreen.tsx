import * as React from 'react';
import { StyleSheet, View, ToastAndroid } from 'react-native';
import { Button, Layout, Input, RangeDatepicker, Spinner } from '@ui-kitten/components';
import { AddArchSiteWorkingScheduleComponent } from '../../../generated/components';
import { GetAllDayComponent } from '../../../components/Public/GetAllDayComponent';
import { GetAllUserArchSiteComponent } from '../../../components/ArchSite/GetAllUserArchSite';
import { Formik } from 'formik';
import * as Yup from 'yup';
/**
 * AddRestaurant props
 */
export interface AddArchSiteWorkingScheduleProps {
	navigation: any;
}
/**
 * Location state
 */
export interface AddArchSiteWorkingScheduleState {
	theDate: any;
	showOpenHour: boolean;
	showCloseHour: boolean;
}

/**
 * Location
 */
export class AddArchSiteWorkingScheduleScreen extends React.Component<
	AddArchSiteWorkingScheduleProps,
	AddArchSiteWorkingScheduleState
> {
	constructor(props: AddArchSiteWorkingScheduleProps) {
		super(props);
		this.state = {
			theDate: {},
			showCloseHour: false,
			showOpenHour: false
		};
		/**
		 * {"roomPropRoom": [{"roomPropertyID": 1},{"roomPropertyID": 2}]}
		 */
	}
	onSelect = value => {
		this.setState({ theDate: value });
	};
	convertDateFormatForQuery = (date: Date) => {
		console.log('A date has been picked: ', date);
		let formattedDate = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
		return formattedDate;
	};
	/**
	 * Renders
	 * @returns
	 */
	render() {
		const userID = this.props.navigation.getParam('userID', 'NO-ID');
		const hotelID = this.props.navigation.getParam('hotelID', 'NO-ID');
		return (
			<Layout style={{ flex: 1 }}>
				<AddArchSiteWorkingScheduleComponent>
					{AddArchSiteWorkingScheduleMutation => (
						<Formik
							//değişkenlerin başlangıç değerleri
							initialValues={{
								archSiteID: 0,
								dayID: 0,
								openHour: new Date(),
								closeHour: new Date()
							}}
							//Burada girilen değerlerin controlleri sağlanır
							validationSchema={Yup.object({
								dayID: Yup.number().required('Required')
							})}
							//Kaydet butonuna tıklandığında bu fonksiyon çalışır
							onSubmit={(values, formikActions) => {
								setTimeout(() => {
									console.log(this.state.theDate.endDate);
									console.log(this.state.theDate.startDate);
									console.log();
									console.log(values.openHour);
									console.log(values.closeHour);
									AddArchSiteWorkingScheduleMutation({
										variables: {
											archSiteID: values.archSiteID,
											startDate: this.state.theDate.startDate,
											finishDate: this.state.theDate.endDate,
											dayID: values.dayID,
											openHour: this.convertDateFormatForQuery(values.openHour),
											closeHour: this.convertDateFormatForQuery(values.closeHour)
										}
									})
										.then(res => {
											alert(JSON.stringify(res));
											ToastAndroid.show('Room property has been added successfully', ToastAndroid.SHORT);

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
									<GetAllUserArchSiteComponent
										label="Select Your Company"
										parentReference={value => {
											props.values.archSiteID = value;
										}}
										userID={parseInt(userID)}
									/>
									<RangeDatepicker range={this.state.theDate} onSelect={this.onSelect} />
									<GetAllDayComponent
										label="Select Day"
										parentReference={value => {
											props.values.dayID = value;
										}}
									/>
									<Button
										onPress={() => {
											this.setState({
												showOpenHour: true,
												showCloseHour: false
											});
										}}
										disabled={props.isSubmitting}
									>
										Set Open Hour
									</Button>
									<Button
										onPress={() => {
											this.setState({
												showCloseHour: true,
												showOpenHour: false
											});
										}}
										disabled={props.isSubmitting}
									>
										Set Close Hour
									</Button>
									<Button
										onPress={() => {
											props.handleSubmit();
										}}
										disabled={props.isSubmitting}
									>
										Add Working Schedule
									</Button>
								</Layout>
							)}
						</Formik>
					)}
				</AddArchSiteWorkingScheduleComponent>
			</Layout>
		);
	}
}

const styles: any = StyleSheet.create({});
