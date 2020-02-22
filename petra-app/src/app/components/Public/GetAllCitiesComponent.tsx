import React from 'react';
import { Layout, Select, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { GetCitiesComponent } from '../../generated/components';
/**
 *  props
 */
export interface GetAllCitiesProps {
	label: string;
	parentReference: any;
}

/**
 *  state
 */
export interface GetAllCitiesState {
	selected: any;
	setSelectedOption: any;
	datam: any;
}

/**
 *  component
 */
export class GetAllCitiesComponent extends React.Component<GetAllCitiesProps, GetAllCitiesState> {
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
				<GetCitiesComponent>
					{({ loading, error, data }) => {
						if (loading) return <Text>Loading</Text>;
						if (error) return <Text>error</Text>;

						if (data) {
							data.City.map(dat => {
								if (this.state.datam.length > 0) {
									if (this.state.datam.every(item => item.id !== dat.cityID)) {
										this.state.datam.push({ id: dat.cityID, text: dat.city });
									}
								} else {
									this.state.datam.push({ id: dat.cityID, text: dat.city });
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
				</GetCitiesComponent>
			</Layout>
		);
	}
}

const styles: any = StyleSheet.create({});
