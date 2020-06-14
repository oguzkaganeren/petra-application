import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Select, Text, Spinner } from '@ui-kitten/components';
import { GetRoomPropertyComponent } from '../../generated/components';

export interface GetAllRoomPropertyProps {
	label: string;
	parentReference: any;
}

const GetAllRoomPropertyComponent: React.FC<GetAllRoomPropertyProps> = (props) => {
	const [selected, setSelected] = React.useState([]);
	const [datam, setDatam] = React.useState([]);

	function onValueChange(value) {
		setSelected(value);
		const filter = Object.keys(value).reduce((result, key) => {
			return result.concat({ roomPropertyID: value[key].roomPropertyID });
		}, []);
		props.parentReference(filter);
	}
	return (
		<Layout>
			<GetRoomPropertyComponent>
				{({ loading, error, data }) => {
					if (loading) return <Spinner size="giant" />;
					if (error) return <Text>error</Text>;

					if (data) {
						data.RoomProperty.map((dat) => {
							if (datam.length > 0) {
								if (datam.every((item) => item.roomPropertyID !== dat.roomPropertyID)) {
									datam.push({ roomPropertyID: dat.roomPropertyID, text: dat.content });
								}
							} else {
								datam.push({ roomPropertyID: dat.roomPropertyID, text: dat.content });
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
			</GetRoomPropertyComponent>
		</Layout>
	);
};

const styles: any = StyleSheet.create({});
export default GetAllRoomPropertyComponent;
