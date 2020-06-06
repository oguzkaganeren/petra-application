import React from 'react';
import { Layout, Select, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { GetTagsComponent } from '../../generated/components';

export interface GetAllTagsProps {
	label: string;
	parentReference: any;
}

const GetAllTagsComponent: React.FC<GetAllTagsProps> = (props) => {
	const [selected, setSelected] = React.useState();
	const [datam, setDatam] = React.useState([]);

	function onValueChange(value) {
		setSelected(value);

		const filter = Object.keys(value).reduce((result, key) => {
			return result.concat({ tagID: value[key].tagID });
		}, []);
		props.parentReference(filter);
	}
	return (
		<Layout>
			<GetTagsComponent>
				{({ loading, error, data }) => {
					if (loading) return <Text>Loading</Text>;
					if (error) return <Text>error</Text>;

					if (data) {
						data.Tag.map((dat) => {
							if (datam.length > 0) {
								if (datam.every((item) => item.tagID !== dat.tagID)) {
									datam.push({ tagID: dat.tagID, text: dat.name });
								}
							} else {
								datam.push({ tagID: dat.tagID, text: dat.name });
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
			</GetTagsComponent>
		</Layout>
	);
};

const styles: any = StyleSheet.create({});
export default GetAllTagsComponent;
