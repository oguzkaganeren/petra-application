import React from 'react';
import { Layout, Select, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { GetUserCompanyComponent } from '../generated/components';
/**
 * Location props
 */
export interface GetAllUserCompanyProps {
	label: string;
	parentReference: any;
	userID: number;
}

/**
 * Location state
 */
export interface GetAllUserCompanyState {
	selected: any;
	setSelectedOption: any;
	datam: any;
}

/**
 * Location component
 */
export class GetAllUserCompanyComponent extends React.Component<GetAllUserCompanyProps, GetAllUserCompanyState> {
	/**
	 * Creates an instance of Location component.
	 * @param props
	 */
	constructor(props) {
		super(props);
		this.state = {
			selected: null,
			setSelectedOption: null,
			datam: []
		};
		this.onValueChange = this.onValueChange.bind(this);
	}

	/**
	 * Determines whether value change on
	 * @param value
	 */
	onValueChange(value) {
		const id = value.id;
		this.props.parentReference(id);
		this.setState({
			selected: value.text
		});
	}
	private keyExtractor = (item, index): string => {
		return item.id.toString();
	};
	/**
	 * Renders Location component
	 * @returns
	 */
	render() {
		return (
			<Layout>
				<GetUserCompanyComponent variables={{ userID: this.props.userID }}>
					{({ loading, error, data }) => {
						if (loading) return <Text>Loading</Text>;
						if (error) return <Text>error</Text>;

						if (data) {
							data.CompanyUser.map(dat => {
								if (this.state.datam.length > 0) {
									if (this.state.datam.every(item => item.id !== dat.companyID)) {
										this.state.datam.push({ id: dat.companyID, text: dat.Company.name });
									}
								} else {
									this.state.datam.push({ id: dat.companyID, text: dat.Company.name });
								}
							});
							return (
								//keyEx. Ekle
								<Select
									data={this.state.datam}
									placeholder={this.props.label}
									selectedOption={this.state.selected}
									keyExtractor={this.keyExtractor.bind(this)}
									onSelect={this.onValueChange}
								/>
							);
						}
					}}
				</GetUserCompanyComponent>
			</Layout>
		);
	}
}

const styles: any = StyleSheet.create({});
