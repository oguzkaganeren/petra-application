import React from 'react';
import { Layout, Select, Text, Spinner } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { GetCitiesComponent } from '../../generated/components';

export interface GetAllCitiesProps {
	label: string;
	disable?: boolean;
	style?: any;
	parentReference: any;
}

const GetAllCitiesComponent: React.FC<GetAllCitiesProps> = (props) => {
	const [selected, setSelected] = React.useState({ id: 0, text: props.label, location: '' });
	const [datam, setDatam] = React.useState([{ id: 0, text: props.label, location: '' }]);

	function onValueChange(value) {
		props.parentReference(value);
		setSelected(value);
	}
	return (
		<Layout style={props.style}>
			<GetCitiesComponent>
				{({ loading, error, data }) => {
					if (loading) return <Spinner size="giant" />;
					if (error) return <Text>error</Text>;

					if (data) {
						data.City.map((dat) => {
							if (datam.length > 0) {
								if (datam.every((item) => item.id !== dat.cityID)) {
									datam.push({ id: dat.cityID, text: dat.city, location: dat.Location });
								}
							} else {
								datam.push({ id: dat.cityID, text: dat.city, location: dat.Location });
							}
						});
						return (
							<Select
								disabled={props.disable}
								data={datam}
								placeholder={props.label}
								selectedOption={selected}
								onSelect={(value) => onValueChange(value)}
							/>
						);
					}
				}}
			</GetCitiesComponent>
		</Layout>
	);
};

const styles: any = StyleSheet.create({});
export default GetAllCitiesComponent;
