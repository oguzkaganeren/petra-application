import React from 'react';
import { Layout, Select, Text, Spinner } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { GetUserRestaurantComponent } from '../../generated/components';

export interface GetAllUserRestaurantProps {
	label: string;
	parentReference: any;
	userID: number;
}

const GetAllUserRestaurantComponent: React.FC<GetAllUserRestaurantProps> = (props) => {
	const [selected, setSelected] = React.useState(null);
	const [datam, setDatam] = React.useState([]);

	function onValueChange(value) {
		const id = value.id;
		props.parentReference(id);
		setSelected(value);
	}
	return (
		<Layout>
			<GetUserRestaurantComponent variables={{ userID: props.userID }}>
				{({ loading, error, data }) => {
					if (loading) return <Spinner size="giant" />;
					if (error) return <Text>error</Text>;

					if (data) {
						data.Restaurant.map((dat) => {
							if (datam.length > 0) {
								if (datam.every((item) => item.id !== dat.restaurantID)) {
									datam.push({ id: dat.restaurantID, text: dat.name });
								}
							} else {
								datam.push({ id: dat.restaurantID, text: dat.name });
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
			</GetUserRestaurantComponent>
		</Layout>
	);
};

const styles: any = StyleSheet.create({});
