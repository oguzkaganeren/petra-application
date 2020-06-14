import React from 'react';
import { Layout, Select, Text, Spinner } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { GetUserCompanyComponent } from '../../generated/components';
declare var global: any;

export interface GetAllUserCompanyProps {
	label: string;
	parentReference: any;
	userID: number;
}

const GetAllUserCompany: React.FC<GetAllUserCompanyProps> = (props) => {
	const [selectedOption, setSelectedOption] = React.useState(null);
	const [localData, setLocalData] = React.useState([]);

	function onValueChange(value) {
		const id = value.id;
		setSelectedOption(value);

		props.parentReference(id);
	}
	return (
		<Layout>
			<GetUserCompanyComponent variables={{ userID: global.userID }}>
				{({ loading, error, data }) => {
					if (loading) return <Spinner size="giant" />;
					if (error) return <Text>error</Text>;

					if (data) {
						data.Company.map((dat) => {
							if (localData.length > 0) {
								if (localData.every((item) => item.id !== dat.companyID)) {
									localData.push({ id: dat.companyID, text: dat.name });
									console.log(dat.companyID);
								}
							} else {
								localData.push({ id: dat.companyID, text: dat.name });
							}
						});
						return (
							<Select
								data={localData}
								placeholder={props.label}
								selectedOption={selectedOption}
								onSelect={(value) => onValueChange(value)}
							/>
						);
					}
				}}
			</GetUserCompanyComponent>
		</Layout>
	);
};

const styles: any = StyleSheet.create({});
export default GetAllUserCompany;
