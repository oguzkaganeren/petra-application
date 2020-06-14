import React from 'react';
import { Layout, Select, Text, Spinner } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { GetCityDistrictsComponent } from '../../generated/components';

export interface GetAllCityDistrictsProps {
	label: string;
	parentReference: any;
	cityID: number;
}

const GetAllCityDistrictsComponent: React.FC<GetAllCityDistrictsProps> = (props) => {
	const [selected, setSelected] = React.useState(null);
	const [datam, setDatam] = React.useState([]);

	function onValueChange(value) {
		const id = value.id;
		props.parentReference(id);
		setSelected(value);
	}

	return (
		<Layout>
			<GetCityDistrictsComponent variables={{ cityID: props.cityID }}>
				{({ loading, error, data }) => {
					if (loading) return <Spinner size="giant" />;
					if (error) return <Text>error</Text>;

					if (data) {
						data.District.map((dat) => {
							if (datam.length > 0) {
								if (datam.every((item) => item.id !== dat.districtID)) {
									datam.push({ id: dat.districtID, text: dat.district });
								}
							} else {
								datam.push({ id: dat.districtID, text: dat.district });
							}
						});
						return (
							<Select
								data={datam}
								placeholder={props.label}
								selectedOption={selected}
								onSelect={(value) => onValueChange(value)}
							/>
						);
					}
				}}
			</GetCityDistrictsComponent>
		</Layout>
	);
};

const styles: any = StyleSheet.create({});
export default GetAllCityDistrictsComponent;
