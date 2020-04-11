import React from 'react';
import { StyleSheet, Platform, View } from 'react-native';
import { Icon, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { DrawerActions } from '@react-navigation/native';
import Constants from 'expo-constants';

export interface HeaderProps {
	headerTitle?: any;
	previous: any;
	navigation: any;
}

const HeaderComponent: React.FC<HeaderProps> = props => {
	//defaultProps = { hasBackButton: false, headerTitle: 'Petra Application' };

	const MenuIcon = style => <Icon {...style} name="menu-outline" />;
	const BackIcon = style => <Icon {...style} name="arrow-back" />;
	const BackAction = () => <TopNavigationAction onPress={props.navigation.goBack} icon={BackIcon} />;
	const MenuAction = props => (
		<TopNavigationAction
			onPress={() => {
				this.props.navigation.dispatch(DrawerActions.toggleDrawer());
			}}
			icon={MenuIcon}
		/>
	);

	const onBackPress = () => {};

	const renderLeftControl = () => (this.props.previous ? <BackAction /> : <MenuAction onPress={onBackPress} />);
	return <TopNavigation style={styles.container} title={props.headerTitle} leftControl={renderLeftControl()} />;
};

const styles: any = StyleSheet.create({
	header: {
		//paddingTop: 20,
		// borderWidth: 0,
		//flex: 1,
	},
	container: {
		marginTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
	}
});
export default HeaderComponent;
