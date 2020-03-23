import React from 'react';
import { StyleSheet, Platform, View } from 'react-native';
import { Icon, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { DrawerActions } from '@react-navigation/native';
import Constants from 'expo-constants';
/**
 * Header props
 */
export interface HeaderProps {
	headerTitle?: any;
	previous: any;
	navigation: any;
	//hasBackButton?: boolean; //? means optional
	//backButtonNavigate?: string;
	//navigation: any;
}

/**
 * Header state
 */
export interface HeaderState {}

/**
 * Header component
 */
export class HeaderComponent extends React.Component<HeaderProps, HeaderState> {
	/**
	 * Default props of header component
	 */
	static defaultProps = { hasBackButton: false, headerTitle: 'Petra Application' };

	MenuIcon = style => <Icon {...style} name="menu-outline" />;
	BackIcon = style => <Icon {...style} name="arrow-back" />;
	BackAction = () => <TopNavigationAction onPress={this.props.navigation.goBack} icon={this.BackIcon} />;
	MenuAction = props => (
		<TopNavigationAction
			onPress={() => {
				this.props.navigation.dispatch(DrawerActions.toggleDrawer());
			}}
			icon={this.MenuIcon}
		/>
	);
	/**
	 * Creates an instance of header component.
	 * @param props
	 */
	constructor(props) {
		super(props);
	}

	/**
	 * Renders header component
	 * @returns
	 */
	render() {
		const onBackPress = () => {};

		const renderLeftControl = () =>
			this.props.previous ? <this.BackAction></this.BackAction> : <this.MenuAction onPress={onBackPress} />;
		return <TopNavigation style={styles.container} title={this.props.headerTitle} leftControl={renderLeftControl()} />;
	}
}

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
