import React from 'react';
import { StyleSheet } from 'react-native';
import { BottomNavigation, BottomNavigationTab, Icon, Layout } from '@ui-kitten/components';
import Constants from 'expo-constants';
/**
 * Bottom props
 */
export interface BottomProps {}

/**
 * Bottom state
 */
export interface BottomState {
	bottomSelectedIndex: number;
	setBottomSelectedIndex: number;
}

/**
 * Bottom component
 */
export class BottomComponent extends React.Component<BottomProps, BottomState> {
	SearchIcon = style => <Icon {...style} name="search-outline" />;

	FavIcon = style => <Icon {...style} name="heart-outline" />;

	SettingsIcon = style => <Icon {...style} name="settings-outline" />;

	/**
	 * Creates an instance of bottom component.
	 * @param props
	 */
	constructor(props) {
		super(props);
		this.state = { bottomSelectedIndex: 0, setBottomSelectedIndex: 0 };
	}

	/**
	 * Renders header component
	 * @returns
	 */
	render() {
		return (
			<BottomNavigation
				style={styles.bottomNavigation}
				selectedIndex={this.state.bottomSelectedIndex}
				onSelect={value => {
					this.setState({ bottomSelectedIndex: value });
				}}
			>
				<BottomNavigationTab title="Search" icon={this.SearchIcon} />
				<BottomNavigationTab title="Favorites" icon={this.FavIcon} />
				<BottomNavigationTab title="Settings" icon={this.SettingsIcon} />
			</BottomNavigation>
		);
	}
}

const styles: any = StyleSheet.create({
	bottomNavigation: {
		marginVertical: 8
	}
});
