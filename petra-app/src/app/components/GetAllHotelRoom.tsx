import React from 'react';
import { Layout, Select, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { GetHotelRoomComponent } from '../generated/components';
/**
 * Location props
 */
export interface GetAllHotelRoomProps {
	label: string;
	parentReference: any;
	hotelID: number;
}

/**
 * Location state
 */
export interface GetAllHotelRoomState {
	selected: any;
	setSelectedOption: any;
	datam: any;
}

/**
 * Location component
 */
export class GetAllHotelRoomComponent extends React.Component<GetAllHotelRoomProps, GetAllHotelRoomState> {
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
			selected: value.id
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
				<GetHotelRoomComponent variables={{ hotelID: this.props.hotelID }}>
					{({ loading, error, data }) => {
						if (loading) return <Text>Loading</Text>;
						if (error) return <Text>error</Text>;

						if (data) {
							data.HotelRoom.map(dat => {
								if (this.state.datam.length > 0) {
									if (this.state.datam.every(item => item.id !== dat.roomID)) {
										this.state.datam.push({ id: dat.roomID, text: dat.Room.roomNo });
									}
								} else {
									this.state.datam.push({ id: dat.roomID, text: dat.Room.roomNo });
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
				</GetHotelRoomComponent>
			</Layout>
		);
	}
}

const styles: any = StyleSheet.create({});
