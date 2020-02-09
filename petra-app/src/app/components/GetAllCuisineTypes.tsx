import React from 'react';
import { Layout, Select, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { GetCuisineTypesComponent } from '../generated/components';
/**
 * Location props
 */
export interface GetAllCuisineTypeProps {
	label: string;
	parentReference: any;
}

/**
 * Location state
 */
export interface GetAllCuisineTypesState {
	selected: any;
	datam: any;
	idSelected: any;
}

/**
 * Location component
 */
export class GetAllCuisineTypesComponent extends React.Component<GetAllCuisineTypeProps, GetAllCuisineTypesState> {
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
			return result.concat({ restaurantCuisineTypeID: value[key].restaurantCuisineTypeID });
		}, []);
		this.props.parentReference(filter);
	}
	private keyExtractor = (item, index): string => {
		return item.restaurantCuisineTypeID.toString();
	};
	/**
	 * Renders Location component
	 * @returns
	 */
	render() {
		return (
			<Layout>
				<GetCuisineTypesComponent>
					{({ loading, error, data }) => {
						if (loading) return <Text>Loading</Text>;
						if (error) return <Text>error</Text>;

						if (data) {
							data.RestaurantCuisineType.map(dat => {
								if (this.state.datam.length > 0) {
									if (this.state.datam.every(item => item.restaurantCuisineTypeID !== dat.restaurantCuisineTypeID)) {
										this.state.datam.push({ restaurantCuisineTypeID: dat.restaurantCuisineTypeID, text: dat.name });
									}
								} else {
									this.state.datam.push({ restaurantCuisineTypeID: dat.restaurantCuisineTypeID, text: dat.name });
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
				</GetCuisineTypesComponent>
			</Layout>
		);
	}
}

const styles: any = StyleSheet.create({});
