import React from 'react';
import { Layout, Select, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { GetRegionsComponent } from '../../generated/components';

export interface GetAllRegionsProps {
	label: string;
	disable?: boolean;
	style?: any;
	parentReference: any;
}

const GetAllRegionsComponent: React.FC<GetAllRegionsProps> = (props) => {
	const [selected, setSelected] = React.useState({ id: 0, text: 'Select a region' });
	const [datam, setDatam] = React.useState([{ id: 0, text: 'Select a region' }]);

	function onValueChange(value) {
		props.parentReference(value);
		setSelected(value);
	}
	return (
		<Layout style={props.style}>
			<GetRegionsComponent>
				{({ loading, error, data }) => {
					if (loading) return <Text>Loading</Text>;
					if (error) return <Text>error</Text>;

					if (data) {
						data.Region.map((dat) => {
							if (datam.length > 0) {
								if (datam.every((item) => item.id !== dat.regionID)) {
									datam.push({ id: dat.regionID, text: dat.region });
								}
							} else {
								datam.push({ id: dat.regionID, text: dat.region });
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
			</GetRegionsComponent>
		</Layout>
	);
};

const styles: any = StyleSheet.create({});
export default GetAllRegionsComponent;
