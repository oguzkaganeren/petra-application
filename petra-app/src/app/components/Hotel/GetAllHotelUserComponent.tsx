import React from 'react';
import { Layout, Select, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { GetUserHotelComponent } from '../../generated/components';

export interface GetAllHotelUserProps {
	label: string;
	parentReference: any;
	userID: number;
}

const GetAllHotelUserComponent: React.FC<GetAllHotelUserProps> = props => {
	const [selected, setSelected] = React.useState([]);
	const [datam, setDatam] = React.useState([]);

	function onValueChange(value) {
		const id = value.id;
		this.props.parentReference(id);
		setSelected(value);
	}

	return (
		<Layout>
			<GetUserHotelComponent variables={{ userID: this.props.userID }}>
				{({ loading, error, data }) => {
					if (loading) return <Text>Loading</Text>;
					if (error) return <Text>error</Text>;

					if (data) {
						data.Hotel.map(dat => {
							if (datam.length > 0) {
								if (datam.every(item => item.id !== dat.hotelID)) {
									datam.push({ id: dat.hotelID, text: dat.name });
								}
							} else {
								datam.push({ id: dat.hotelID, text: dat.name });
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
			</GetUserHotelComponent>
		</Layout>
	);
};

const styles: any = StyleSheet.create({});
export default GetAllHotelUserComponent;
