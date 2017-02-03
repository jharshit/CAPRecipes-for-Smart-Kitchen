/**
*
* Search
*
*/

import React from 'react';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import ActionSearch from 'material-ui/svg-icons/action/search';

const styles = {
	icon: {
		left: '10px',
		position: 'absolute',
		top: '13px',
	},
	root: {
		position: 'relative',
		width: '100%',
	},
	search: {
		boxSixing: 'border-box',
		display: 'inline-block',
		margin: '0 auto',
		padding: '8px 8px 8px 40px',
		width: 'calc(100% - 150px)',
	},
	searchInput: {
		borderRadius: 2,
		margin: 0,
	},
	select: {
		float: 'right',
		marginRight: 5,
		verticalAlign: 'middle',
		width: 140,
	},
};

class Search extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
	
	state = {
		foodType: "main course",
	};

	render() {
		return (
			<Paper style={styles.root} zDepth={1}>
				<TextField
					hintText={<FormattedMessage {...messages.hint} />}
					style={styles.search}
					inputStyle={styles.searchInput}
					underlineShow={false}
				/>
				<SelectField
					onChange={this.handleFoodChange}
					style={styles.select}
					underlineShow={false}
					value={this.state.foodType}
				>
					<MenuItem value="main course" primaryText="Main course" />
					<MenuItem value="side dish" primaryText="Side dish" />
					<MenuItem value="dessert" primaryText="Dessert" />
					<MenuItem value="appetizer" primaryText="Appetizer" />
					<MenuItem value="salad" primaryText="Salad" />
					<MenuItem value="bread" primaryText="Bread" />
					<MenuItem value="breakfast" primaryText="Breakfast" />
				</SelectField>
				<ActionSearch color="#ddd" style={styles.icon} />
			</Paper>
		);
	}

	handleFoodChange = (event, index, value) => this.setState({foodType: value});
}

export default Search;
