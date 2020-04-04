import React from 'react';
import { Layout, Select, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { GetCityDistrictsComponent } from '../../generated/components';
/**
 *  props
 */
export interface GetAllCityDistrictsProps {
	label: string;
	parentReference: any;
	cityID: number;
}

/**
 *  state
 */
export interface GetAllCityDistrictsState {
	selected: any;
	setSelectedOption: any;
	datam: any;
}

/**
 *  component
 */
export class GetAllCityDistrictsComponent extends React.Component<GetAllCityDistrictsProps, GetAllCityDistrictsState> {
	/**
	 * Creates an instance of the component.
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
			selected: value
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
				<GetCityDistrictsComponent variables={{ cityID: this.props.cityID }}>
					{({ loading, error, data }) => {
						if (loading) return <Text>Loading</Text>;
						if (error) return <Text>error</Text>;

						if (data) {
							data.District.map(dat => {
								if (this.state.datam.length > 0) {
									if (this.state.datam.every(item => item.id !== dat.districtID)) {
										this.state.datam.push({ id: dat.districtID, text: dat.district });
									}
								} else {
									this.state.datam.push({ id: dat.districtID, text: dat.district });
								}
							});
							return (
								//keyEx. Ekle
								<Select
									data={this.state.datam}
									placeholder={this.props.label}
									selectedOption={this.state.selected}
									keyExtractor={this.keyExtractor.bind(this)}
									onSelect={value => this.onValueChange(value)}
								/>
							);
						}
					}}
				</GetCityDistrictsComponent>
			</Layout>
		);
	}
}

const styles: any = StyleSheet.create({});
