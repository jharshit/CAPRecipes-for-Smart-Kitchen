/**
*
* UserMenu
*
*/

import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import SocialPerson from 'material-ui/svg-icons/social/person';
import ActionFace from 'material-ui/svg-icons/action/face';
import ActionHistory from 'material-ui/svg-icons/action/history';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionList from 'material-ui/svg-icons/action/list';
import ActionShoppingCart from 'material-ui/svg-icons/action/add-shopping-cart';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import EditorShowChart from 'material-ui/svg-icons/editor/show-chart';
import SocialPeople from 'material-ui/svg-icons/social/people';
import Divider from 'material-ui/Divider';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

class UserMenu extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
	
	static propTypes = {
		configHandle: React.PropTypes.func,
		dinersHandle: React.PropTypes.func,
		logged: React.PropTypes.bool,
	};

	render() {
		let menu;
		if (!this.props.logged) {
			menu = (
				<FlatButton
					label="Login"
					labelPosition="before"
					icon={<ActionFace color="white" />}
				/>
			);
		} else {
			menu = (
				<IconMenu
					iconButtonElement={
						<IconButton ><SocialPerson color="white" /></IconButton>
					}
					targetOrigin={{horizontal: 'right', vertical: 'top'}}
					anchorOrigin={{horizontal: 'right', vertical: 'top'}}
				>
					<MenuItem
						href="/myprofile"
						primaryText="My profile"
						leftIcon={<ActionFace />}
					/>
					<MenuItem
						href="/favorites"
						primaryText="Favorite Recipes"
						leftIcon={<ActionFavorite />}
					/>
					<MenuItem
						primaryText="People"
						leftIcon={<SocialPeople />}
						onClick={this.props.dinersHandle}
					/>
					<MenuItem
						href="/history"
						primaryText="Executed recipes"
						leftIcon={<ActionList />}
					/>
					<MenuItem
						href="/history"
						primaryText="Search history"
						leftIcon={<ActionHistory />}
					/>
					<MenuItem
						href="/analytics"
						primaryText="My analytics"
						leftIcon={<EditorShowChart />}
					/>
					<Divider />
					<MenuItem
						primaryText="Shopping list"
						leftIcon={<ActionShoppingCart />}
					/>
					<Divider />
					<MenuItem
						primaryText="Settings"
						leftIcon={<ActionSettings />}
						onClick={this.props.configHandle}
					/>
				</IconMenu>
			);
		}
		return menu;
	}
}

export default UserMenu;
