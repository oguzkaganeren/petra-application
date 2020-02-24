import * as React from 'react';
import { Button, Layout } from '@ui-kitten/components';

/**
 * Home props
 */
export interface HomeProps {
	navigation: any;
}
/**
 * Home state
 */
export interface HomeState {}

/**
 * Home
 */
export class HomeScreen extends React.Component<HomeProps, HomeState> {
	constructor(props: HomeProps) {
		super(props);
		this.state = {};
	}
	/**
	 * Renders home
	 * @returns
	 */
	render() {
		const userID = this.props.navigation.getParam('userID', 'NO-ID');
		return (
			<Layout style={{ flex: 1 }}>
					<Button
						onPress={() => {
							this.props.navigation.navigate('AddCompanyScreen', {
								userID: userID
							});
						}}
					>
						Add Company
					</Button>
				
			</Layout>
		);
	}
}

