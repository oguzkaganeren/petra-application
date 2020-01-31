import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Button, Layout, Input } from '@ui-kitten/components';
import { AddCompanyComponent } from '../../generated/components';
import { Formik } from 'formik';
import * as Yup from 'yup';
/**
 * AddCompany props
 */
export interface AddCompanyProps {
	navigation: any;
}
/**
 * Location state
 */
export interface AddCompanyState {}

/**
 * Location
 */
export class AddLocationScreen extends React.Component<AddCompanyProps, AddCompanyState> {
	constructor(props: AddCompanyProps) {
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
				<AddCompanyComponent>
					{AddCompanyMutation => (
						<Formik
							initialValues={{
								name: '',
								taxNumber: '',
								registerDate: '',
								mail: '',
								locationID: 1 //geçici süreliğine 1 verdim(sonra değişecek)
							}}
							validationSchema={Yup.object({
								eventName: Yup.string().required('Required'),
								category: Yup.string().required('Required'),
								limitOfParticipant: Yup.number()
									.positive('Only positive numbers')
									.max(50)
							})}
							onSubmit={(values, formikActions) => {
								setTimeout(() => {
									AddCompanyMutation({
										refetchQueries: [
											{
												query: GetEventsDocument,
												variables: {
													userId: userId,
													page: 1,
													limit: 4,
													dateNow: this.convertDateFormatForQuery(new Date())
												}
											}
										],
										variables: {}
									})
										.then(res => {
											//alert(JSON.stringify(res));

											this.props.navigation.navigate('Home');
										})
										.catch(err => {
											alert(err);
										});
									//alert(values.startDate + ', ' + this.state.startDateTime.split(',')[1]);
									//alert(JSON.stringify(values) + ' ' + this.state.startDateTime);
									// Important: Make sure to setSubmitting to false so our loading indicator
									// goes away.
									formikActions.setSubmitting(false);
								}, 500);
							}}
						>
							{props => (
								<Layout>
									<Input
										onChangeText={props.handleChange('name')}
										onBlur={props.handleBlur('name')}
										value={props.values.name}
										autoFocus
									/>
									<Input
										onChangeText={props.handleChange('taxNumber')}
										onBlur={props.handleBlur('taxNumber')}
										value={props.values.taxNumber}
									/>
									<Input
										onChangeText={props.handleChange('mail')}
										onBlur={props.handleBlur('mail')}
										value={props.values.taxNumber}
									/>
									<Button
										onPress={() => {
											props.handleSubmit();
										}}
									>
										Add
									</Button>
								</Layout>
							)}
						</Formik>
					)}
				</AddCompanyComponent>
			</Layout>
		);
	}
}

const styles: any = StyleSheet.create({
	mapStyle: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height / 2
	}
});
