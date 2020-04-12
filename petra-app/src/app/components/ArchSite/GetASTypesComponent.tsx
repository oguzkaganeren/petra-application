import React from 'react';
import { Layout, Select, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { GetArchSiteTypesComponent } from '../../generated/components';

export interface GetASTypesProps {
	label: string;
	parentReference: any;
}

const GetASTypesComponent: React.FC<GetASTypesProps> = props => {
	const [selected, setSelected] = React.useState([]);
	const [datam, setDatam] = React.useState([]);

	function onValueChange(value) {
		const filter = Object.keys(value).reduce((result, key) => {
			return result.concat({ archSiteTypeID: value[key].id });
		}, []);
		props.parentReference(filter);
		setSelected(value);
	}
	return (
		<Layout>
			<GetArchSiteTypesComponent>
				{({ loading, error, data }) => {
					if (loading) return <Text>Loading</Text>;
					if (error) return <Text>error</Text>;

					if (data) {
						data.ArchSiteType.map(dat => {
							if (datam.length > 0) {
								if (datam.every(item => item.id !== dat.archSiteTypeID)) {
									datam.push({ id: dat.archSiteTypeID, text: dat.name });
								}
							} else {
								datam.push({ id: dat.archSiteTypeID, text: dat.name });
							}
						});
						return (
							//keyEx. Ekle
							<Select
								data={datam}
								placeholder={props.label}
								multiSelect={true}
								selectedOption={selected}
								onSelect={value => onValueChange(value)}
							/>
						);
					}
				}}
			</GetArchSiteTypesComponent>
		</Layout>
	);
};

const styles: any = StyleSheet.create({});
export default GetASTypesComponent;
