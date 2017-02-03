/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import Paper from 'material-ui/Paper';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import FontIcon from 'material-ui/FontIcon';
import Subheader from 'material-ui/Subheader';
import {Grid, Row, Col} from 'react-flexbox-grid';
import Recipes from '../../components/Recipes';
import {Sticky} from 'react-sticky';
import axios from 'axios';

const styles = {
	content: {
		boxSizing: 'border-box',
		display: 'block',
		margin: '20px auto',
		minHeight: 100,
		width: '100%',
	},
	sortBy: {
		width: 185,
	},
	sortMode: {
		width: 140,
	},
	root: {
		marginBottom: 30,
	},
	separator: {
		backgroundColor:  'none',
	},
	textfield: {
		width: 80,
	},
	toggle: {
		display: 'inline-block',
		margin: '15px 15px 0 0',
		width: 'auto',
	},
	toggleLabel: {
		color: 'rgba(0, 0, 0, 0.54)',
		width: 'auto',
	},
	toolBar: {
		backgroundColor: 'white',
		borderBottom: '1px solid #eee',
		borderRadius: '2px 2px 0 0',
		height: 64,
	}
};

const validation = {
	isNumber: function(value) {
		let pattern = /^\d+$/;
		return pattern.test(value);
	},
};

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

	state = {
		isSticky: false,
		sortBy: "costPerServing",
		sortMode: "ascending",
		minCost: 0,
		maxCost: undefined,
		showIngredients: true,
		showNutrition: true,
		recipes: [],
	};

	constructor(props) {
		super(props);
		// axios.get(`http://localhost:8020/recipelist`)
		// 	.then(response => {
		// 		this.setState({recipes: response.data.data});
		// 	});
		const recipes = require('./recipes.json').data.map(elem => {
			elem.favorite = false;
			return elem;
		});
		this.state.recipes = recipes;
	}

	render() {
		return (
			<Grid style={styles.root}>
				<Row>
					<Col>
						<Sticky
							className={this.state.isSticky? 'active' : null}
							onStickyStateChange={this.onStickyStateChange}
							topOffset={-40}
						>
						<Paper style={styles.content} zDepth={1}>
							<Toolbar style={styles.toolBar}>
								<ToolbarGroup firstChild={true}>
									<ToolbarSeparator style={styles.separator} />
									<SelectField
										floatingLabelText="Order by"
										floatingLabelFixed={true}
										onChange={this.handleOrderChange}
										style={styles.sortBy}
										underlineShow={false}
										value={this.state.sortBy}
									>
										<MenuItem value={"costPerServing"} primaryText="Cost per serving" />
										<MenuItem value={"readyTime"} primaryText="Ready time" />
										<MenuItem value={"missedIngredients"} primaryText="Missing ingredients" />
										<MenuItem value={"missedIngredientsCost"} primaryText="Missing ing. cost" />
									</SelectField>
									<ToolbarSeparator style={styles.separator} />
									<SelectField
										floatingLabelText=" "
										floatingLabelFixed={true}
										onChange={this.handleSortModeChange}
										style={styles.sortMode}
										underlineShow={false}
										value={this.state.sortMode}
									>
										<MenuItem value={"ascending"} primaryText="Low to high" />
										<MenuItem value={"descending"} primaryText="High to low" />
									</SelectField>
								</ToolbarGroup>
								<ToolbarGroup>
									<TextField
										hintText="0"
										floatingLabelText="Min. cost"
										floatingLabelFixed={true}
										name="minCost"
										onChange={this.handleMinCostChange}
										style={styles.textfield}
										value={this.state.minCost}
										underlineShow={false}
									/>
									<TextField
										hintText="&infin;"
										floatingLabelText="Max. cost"
										floatingLabelFixed={true}
										name="maxCost"
										onChange={this.handleMaxCostChange}
										style={styles.textfield}
										value={this.state.maxCost}
										underlineShow={false}
									/>
								</ToolbarGroup>
							</Toolbar>
							<Subheader>
								<Grid style={{width: '98%'}}>
									<Row className="middle-xs between-xs">
										<Col>
											Showing {this.state.recipes.length} recipes
										</Col>
										<Col>
											<Toggle
												defaultToggled={this.state.showIngredients}
												label="Ingredients"
												labelStyle={styles.toggleLabel}
												onToggle={this.toggleIngredients}
												style={styles.toggle}
											/>
											<Toggle
												defaultToggled={this.state.showNutrition}
												label="Nutrition info."
												labelStyle={styles.toggleLabel}
												onToggle={this.toggleNutrition}
												style={styles.toggle}
											/>
										</Col>
									</Row>
								</Grid>
							</Subheader>
						</Paper>
						</Sticky>
						<Recipes
							isRecommended={this.isRecommended}
							minCost={this.state.minCost}
							maxCost={this.state.maxCost}
							recipes={this.state.recipes}
							showIngredients={this.state.showIngredients}
							showNutrition={this.state.showNutrition}
							sortBy={this.state.sortBy}
							sortMode={this.state.sortMode}
							toggleFavorite={this.toggleFavorite}
						/>
					</Col>
				</Row>
			</Grid>
		);
	}

	handleOrderChange = (event, index, value) => this.setState({sortBy: value});
	handleSortModeChange = (event, index, value) => this.setState({sortMode: value});
	handleMinCostChange = (event, index, value) => {
		this.setState({minCost: value})
	};
	handleMaxCostChange = (event, index, value) => this.setState({maxCost: value});
	toggleIngredients = (e) => {
		this.setState({showIngredients: !this.state.showIngredients});
	};
	toggleNutrition = (e) => {
		this.setState({showNutrition: !this.state.showNutrition});
	};
	toggleFavorite = (id, favorite) => {
		const recipes = this.state.recipes;
		for (let i = 0; i < recipes.length; i++) {
			if (recipes[i].id === id) {
				recipes[i].favorite = favorite;
				break;
			}
		}
		this.setState({recipes});
	}
	onStickyStateChange = (isSticky) => {
		this.setState({isSticky});
	};
	isRecommended = () => {
		let a = Math.random(), b = Math.random(), c = Math.random();
		if (a < 0.5 && b < 0.5 && c < 0.5)
			return true;
		if (a > 0.5 && b > 0.5 && c > 0.5)
			return false;
	};
}
