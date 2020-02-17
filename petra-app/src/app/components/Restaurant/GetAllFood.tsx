import React from 'react';
import { Layout, Select, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { GetFoodComponent } from '../../generated/components';
/**
 * Location props
 */
export interface GetAllFoodProps {
	label: string;
	parentReference: any;
}

/**
 * Location state
 */
export interface GetAllFoodState {
	selected: any;
	datam: any;
	idSelected: any;
}

/**
 * Location component
 */
export class GetAllFoodComponent extends React.Component<GetAllFoodProps, GetAllFoodState> {
	/**
	 * Creates an instance of Location component.
	 * @param props
	 */
	constructor(props) {
		super(props);
		this.state = {
			selected: [],
			datam: [],
			idSelected: []
		};
		this.onValueChange = this.onValueChange.bind(this);
	}

	/**
	 * Determines whether value change on
	 * @param value
	 */
	onValueChange(value) {
		this.setState({
			selected: value.text
		});

		const filter = Object.keys(value).reduce((result, key) => {
			return result.concat({ restaurantFoodID: value[key].restaurantFoodID });
		}, []);
		this.props.parentReference(filter);
	}
	private keyExtractor = (item, index): string => {
		return item.restaurantFoodID.toString();
	};
	/**
	 * Renders Location component
	 * @returns
	 */
	render() {
		return (
			<Layout>
				<GetFoodComponent>
					{({ loading, error, data }) => {
						if (loading) return <Text>Loading</Text>;
						if (error) return <Text>error</Text>;

						if (data) {
							data.RestaurantFood.map(dat => {
								if (this.state.datam.length > 0) {
									if (this.state.datam.every(item => item.restaurantFoodID !== dat.restaurantFoodID)) {
										this.state.datam.push({ restaurantFoodID: dat.restaurantFoodID, text: dat.name });
									}
								} else {
									this.state.datam.push({ restaurantFoodID: dat.restaurantFoodID, text: dat.name });
								}
							});
							return (
								<Select
									data={this.state.datam}
									placeholder={this.props.label}
									multiSelect={true}
									selectedOption={this.state.selected}
									keyExtractor={this.keyExtractor.bind(this)}
									onSelect={this.onValueChange}
								/>
							);
						}
					}}
				</GetFoodComponent>
			</Layout>
		);
	}
}

const styles: any = StyleSheet.create({});
