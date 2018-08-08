import React, { Component } from 'react';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Aux from '../../hoc/Aux-component/Aux-component';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
}

class BurgerBuilder extends Component {

	state= {
		ingredients: null,
		totalPrice: 0,
		purchesable: false,
		purchasing: false,
		loading: false,
		eror: false
	}

	componentDidMount() {
		axios.get('https://my-burger-6c66d.firebaseio.com/ingredients.json')
		.then(response => {
			this.setState({
				ingredients: response.data
			})
		})
		.catch(error => {
			this.setState({
				error: true
			})
		})
	}

	updatePurchaseState(ingredients) {

		const sum = Object.keys(ingredients)
			.map(igKey => {
				return ingredients[igKey]
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);

		this.setState({
			purchesable: sum > 0
		});

	}

	addIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredents = {
			...this.state.ingredients
		};

		updatedIngredents[type] = updatedCount;

		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;

		this.setState({
			totalPrice : newPrice,
			ingredients: updatedIngredents
		});
		this.updatePurchaseState(updatedIngredents);
	}

	removeIngredientHandler = (type) => {

		const oldCount = this.state.ingredients[type];

		if (oldCount <= 0) {
			return;
		}

		const updatedCount = oldCount - 1;
		const updatedIngredents = {
			...this.state.ingredients
		};

		updatedIngredents[type] = updatedCount;

		const priceDeduction = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceDeduction;

		this.setState({
			totalPrice : newPrice,
			ingredients: updatedIngredents
		});
		this.updatePurchaseState(updatedIngredents);
	}

	purchaseHandler = () => {
		this.setState({
			purchasing: true
		});
	}

	purchaseCancelHandler = () => {
		this.setState({
			purchasing: false
		})
	}

	purchaseContinueHandler = (props) => {
		// alert('you are welcome');

		const queryParams = [];

		for (let i in this.state.ingredients) {
			queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
		}

		queryParams.push('price=' + this.state.totalPrice);


		const queryString = queryParams.join('&');

		this.props.history.push({
			pathname: './checkout',
			search: '?' + queryString
		});

	}

	render() {

		const disabledInfo = {
			...this.state.ingredients
		};

		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0
		}

		let orderSummary = null

		if (this.state.ingredients) {
			orderSummary =
				<OrderSummary
					ingredients={this.state.ingredients}
					continueOrder = {this.purchaseContinueHandler}
					cancelOrder = {this.purchaseCancelHandler}
					price = {this.state.totalPrice}/>
		}


		if (this.state.loading) {
			orderSummary = <Spinner />
		}

		let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

		if (this.state.ingredients) {
			burger = (
				<Aux>
					<Burger ingredients={this.state.ingredients} />
					<BuildControls
						ingredientAdded = {this.addIngredientHandler}
						ingredientRemoved = {this.removeIngredientHandler}
						disabled = {disabledInfo}
						purchesable = {this.state.purchesable}
						ordered = {this.purchaseHandler}
						price = {this.state.totalPrice}/>
				</Aux>
			);
		}

		return(
			<Aux>
				<Modal
					show={this.state.purchasing}
					modalClosed={this.purchaseCancelHandler}
				>
					{orderSummary}
				</Modal>
				{burger}
			</Aux>
		);
	}
}

export default withErrorHandler(BurgerBuilder, axios);
