import React from 'react';
import { Layout, Select, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { GetHotelServicePropertyComponent } from '../../generated/components';
/**
 * Location props
 */
export interface GetAllHotelServicePropertyProps {
	label: string;
	parentReference: any;
}

/**
 * Location state
 */
export interface GetAllHotelServicePropertyState {
	selected: any;
	datam: any;
}

/**
 * Location component
 */
export class GetAllHotelServicePropertyComponent extends React.Component<
	GetAllHotelServicePropertyProps,
	GetAllHotelServicePropertyState
> {
	/**
	 * Creates an instance of Location component.
	 * @param props
	 */
	constructor(props) {
		super(props);
		this.state = {
			selected: [],
			datam: []
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
			return result.concat({ hotelServicePropertyID: value[key].hotelServicePropertyID });
		}, []);
		this.props.parentReference(filter);
	}
	private keyExtractor = (item, index): string => {
		return item.hotelServicePropertyID.toString();
	};
	/**
	 * Renders Location component
	 * @returns
	 */
	render() {
		return (
			<Layout>
				<GetHotelServicePropertyComponent>
					{({ loading, error, data }) => {
						if (loading) return <Text>Loading</Text>;
						if (error) return <Text>error</Text>;

						if (data) {
							data.HotelServiceProperty.map(dat => {
								if (this.state.datam.length > 0) {
									if (this.state.datam.every(item => item.hotelServicePropertyID !== dat.hotelServicePropertyID)) {
										this.state.datam.push({ hotelServicePropertyID: dat.hotelServicePropertyID, text: dat.content });
									}
								} else {
									this.state.datam.push({ hotelServicePropertyID: dat.hotelServicePropertyID, text: dat.content });
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
				</GetHotelServicePropertyComponent>
			</Layout>
		);
	}
}

const styles: any = StyleSheet.create({});
