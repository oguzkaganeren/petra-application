import React from 'react';
import { Layout, Select, Text, Spinner } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { GetHotelServicePropertyComponent } from '../../generated/components';

export interface GetAllHotelServicePropertyProps {
	label: string;
	parentReference: any;
}

const GetAllHotelServicePropertyComponent: React.FC<GetAllHotelServicePropertyProps> = (props) => {
	const [selected, setSelected] = React.useState([]);
	const [datam, setDatam] = React.useState([]);

	function onValueChange(value) {
		setSelected(value);
		const filter = Object.keys(value).reduce((result, key) => {
			return result.concat({ hotelServicePropertyID: value[key].hotelServicePropertyID });
		}, []);
		props.parentReference(filter);
	}
	return (
		<Layout>
			<GetHotelServicePropertyComponent>
				{({ loading, error, data }) => {
					if (loading) return <Spinner size="giant" />;
					if (error) return <Text>error</Text>;

					if (data) {
						data.HotelServiceProperty.map((dat) => {
							if (datam.length > 0) {
								if (datam.every((item) => item.hotelServicePropertyID !== dat.hotelServicePropertyID)) {
									datam.push({ hotelServicePropertyID: dat.hotelServicePropertyID, text: dat.content });
								}
							} else {
								datam.push({ hotelServicePropertyID: dat.hotelServicePropertyID, text: dat.content });
							}
						});
						return (
							<Select
								data={datam}
								placeholder={props.label}
								multiSelect={true}
								selectedOption={selected}
								onSelect={(value) => onValueChange(value)}
							/>
						);
					}
				}}
			</GetHotelServicePropertyComponent>
		</Layout>
	);
};

const styles: any = StyleSheet.create({});
export default GetAllHotelServicePropertyComponent;
