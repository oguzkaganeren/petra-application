import React from 'react';
import { Layout, Select, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { GetHotelRoomComponent } from '../../generated/components';

export interface GetAllHotelRoomProps {
	label: string;
	parentReference: any;
	hotelID: number;
}

const GetAllHotelRoomComponent: React.FC<GetAllHotelRoomProps> = props => {
	const [selected, setSelected] = React.useState(null);
	const [datam, setDatam] = React.useState([]);

	function onValueChange(value) {
		const id = value.id;
		props.parentReference(id);
		setSelected(value);
	}

	return (
		<Layout>
			<GetHotelRoomComponent variables={{ hotelID: this.props.hotelID }}>
				{({ loading, error, data }) => {
					if (loading) return <Text>Loading</Text>;
					if (error) return <Text>error</Text>;

					if (data) {
						data.HotelRoom.map(dat => {
							if (datam.length > 0) {
								if (datam.every(item => item.id !== dat.roomID)) {
									datam.push({ id: dat.roomID, text: dat.Room.roomNo });
								}
							} else {
								datam.push({ id: dat.roomID, text: dat.Room.roomNo });
							}
						});
						return (
							<Select
								data={datam}
								placeholder={props.label}
								selectedOption={selected}
								onSelect={value => onValueChange(value)}
							/>
						);
					}
				}}
			</GetHotelRoomComponent>
		</Layout>
	);
};

const styles: any = StyleSheet.create({});
export default GetAllHotelRoomComponent;
