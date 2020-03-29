import React from 'react';
import { Layout, Select, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { GetFoodTypesComponent } from '../../generated/components';
/**
 * Location props
 */
export interface GetAllFoodTypesProps {
	label: string;
	parentReference: any;
}

/**
 * Location state
 */
export interface GetAllFoodTypesState {
	selected: any;
	setSelectedOption: any;
	datam: any;
}

/**
 * Location component
 */
export class GetAllFoodTypesComponent extends React.Component<GetAllFoodTypesProps, GetAllFoodTypesState> {
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
		return String(item.id);
	};
	/**
	 * Renders Location component
	 * @returns
	 */
	render() {
		return (
			<Layout>
				<GetFoodTypesComponent>
					{({ loading, error, data }) => {
						if (loading) return <Text>Loading</Text>;
						if (error) return <Text>error</Text>;

						if (data) {
							data.RestaurantFoodType.map(dat => {
								if (this.state.datam.length > 0) {
									if (this.state.datam.every(item => item.id !== dat.restaurantFoodTypeID)) {
										this.state.datam.push({ id: dat.restaurantFoodTypeID, text: dat.type });
									}
								} else {
									this.state.datam.push({ id: dat.restaurantFoodTypeID, text: dat.type });
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
				</GetFoodTypesComponent>
			</Layout>
		);
	}
}

const styles: any = StyleSheet.create({});
