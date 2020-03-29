import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Layout, Text, RangeDatepicker, Spinner } from '@ui-kitten/components';
import { AddArchSiteWorkingScheduleComponent } from '../../../generated/components';
import { GetAllDayComponent } from '../../../components/Public/GetAllDayComponent';
import { GetAllUserArchSiteComponent } from '../../../components/ArchSite/GetAllUserArchSite';
import TimePicker from 'react-native-simple-time-picker';
import { Formik } from 'formik';
import * as Yup from 'yup';
/**
 * AddRestaurant props
 */
export interface AddArchSiteWorkingScheduleProps {
	navigation: any;
	route: any;
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
		const { userID } = this.props.route.params;
		return (
			<Layout style={{ flex: 1 }}>
				<AddArchSiteWorkingScheduleComponent>
					{AddArchSiteWorkingScheduleMutation => (
						<Formik
							//değişkenlerin başlangıç değerleri
							initialValues={{
								archSiteID: 0,
								dayID: 0,
								openHour: 0,
								openMinute: 0,
								closeHour: 0,
								closeMinute: 0
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
									console.log(values.openHour + ':' + values.openMinute + ':' + '00');
									AddArchSiteWorkingScheduleMutation({
										variables: {
											ArchSiteWorkingSchedule: [
												{
													archSiteID: values.archSiteID,
													startDate: this.state.theDate.startDate,
													finishDate: this.state.theDate.endDate,
													ArchSiteWorkingDaySchedules: {
														data: [
															{
																ArchSiteWorkingDay: {
																	data: {
																		closeHour: values.closeHour + ':' + values.closeMinute + ':' + '00',
																		openHour: values.openHour + ':' + values.openMinute + ':' + '00',
																		dayID: values.dayID
																	}
																}
															}
														]
													}
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
									<Text>Open Hours</Text>
									<TimePicker
										selectedHours={props.values.openHour}
										selectedMinutes={props.values.openMinute}
										onChange={(hours, minutes) => {
											props.values.openHour = hours;
											props.values.openMinute = minutes;
										}}
									/>
									<Text>Close Hours</Text>
									<TimePicker
										selectedHours={props.values.closeHour}
										selectedMinutes={props.values.closeMinute}
										onChange={(hours, minutes) => {
											props.values.closeHour = hours;
											props.values.closeMinute = minutes;
										}}
									/>
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
