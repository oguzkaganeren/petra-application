import React from 'react';
import { Layout, Select, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { GetRoomPropertyComponent } from '../../generated/components';
/**
 * Location props
 */
export interface GetAllRoomPropertyProps {
	label: string;
	parentReference: any;
}

/**
 * Location state
 */
export interface GetAllRoomPropertyState {
	selected: any;
	datam: any;
	idSelected: any;
}

/**
 * Location component
 */
export class GetAllRoomPropertyComponent extends React.Component<GetAllRoomPropertyProps, GetAllRoomPropertyState> {
	/**
	 * Creates an instance of Location component.
	 * @param props
	 */
	constructor(props) {
		super(props);
		this.state = {
			selected: [],
			datam: [],
			idSelected: [],
		};
		this.onValueChange = this.onValueChange.bind(this);
	}

	/**
	 * Determines whether value change on
	 * @param value
	 */
	onValueChange(value) {
		this.setState({
			selected: value,
		});

		const filter = Object.keys(value).reduce((result, key) => {
			return result.concat({ roomPropertyID: value[key].roomPropertyID });
		}, []);
		this.props.parentReference(filter);
	}
	private keyExtractor = (item, index): string => {
		return item.roomPropertyID.toString();
	};
	/**
	 * Renders Location component
	 * @returns
	 */
	render() {
		return (
			<Layout>
				<GetRoomPropertyComponent>
					{({ loading, error, data }) => {
						if (loading) return <Text>Loading</Text>;
						if (error) return <Text>error</Text>;

						if (data) {
							data.RoomProperty.map((dat) => {
								if (this.state.datam.length > 0) {
									if (this.state.datam.every((item) => item.roomPropertyID !== dat.roomPropertyID)) {
										this.state.datam.push({ roomPropertyID: dat.roomPropertyID, text: dat.content });
									}
								} else {
									this.state.datam.push({ roomPropertyID: dat.roomPropertyID, text: dat.content });
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
				</GetRoomPropertyComponent>
			</Layout>
		);
	}
}

const styles: any = StyleSheet.create({});
