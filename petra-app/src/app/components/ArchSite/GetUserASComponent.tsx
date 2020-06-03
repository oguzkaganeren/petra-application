import React from 'react';
import { Layout, Select, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { GetUserArchSiteComponent } from '../../generated/components';

export interface GetAllUserArchSiteProps {
	label: string;
	parentReference: any;
	userID: number;
}

const GetUserASComponent: React.FC<GetAllUserArchSiteProps> = props => {
	const [selected, setSelected] = React.useState(null);
	const [datam, setDatam] = React.useState([]);

	function onValueChange(value) {
		const id = value.id;
		this.props.parentReference(id);
		setSelected(value);
	}
	return (
		<Layout>
			<GetUserArchSiteComponent variables={{ userID: this.props.userID }}>
				{({ loading, error, data }) => {
					if (loading) return <Text>Loading</Text>;
					if (error) return <Text>error</Text>;

					if (data) {
						data.ArchSite.map(dat => {
							if (datam.length > 0) {
								if (datam.every(item => item.id !== dat.archSiteID)) {
									datam.push({ id: dat.archSiteID, text: dat.name });
								}
							} else {
								datam.push({ id: dat.archSiteID, text: dat.name });
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
			</GetUserArchSiteComponent>
		</Layout>
	);
};

const styles: any = StyleSheet.create({});
export default GetUserASComponent;
