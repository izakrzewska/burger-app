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
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0
		},
		totalPrice: 4,
		purchesable: false,
		purchasing: false,
		loading: false
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
		this.setState({
			loading: true
		});
		const order = {
			ingredients: this.state.ingredients,
			price: this.state.totalPrice.toFixed(2),
			customer: {
				name: 'Iga Zakrzewska',
				adress: {
					street: 'testStreet 1/2',
					zipCode: '1234',
					country: 'Poland'
				},
				email: 'test@test.pl'
			},
			deliveryMethod: 'fastest'
		}

		axios.post('/orders.json', order)
			.then(response => {
				this.setState({
					loading: false,
					purchasing: false
				});
			})
			.catch(error => {
				this.setState({
					loading: false,
					purchasing: false
				});
			});
	}

	render() {

		const disabledInfo = {
			...this.state.ingredients
		};

		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0
		}

		let orderSummary =
			<OrderSummary
				ingredients={this.state.ingredients}
				continueOrder = {this.purchaseContinueHandler}
				cancelOrder = {this.purchaseCancelHandler}
				price = {this.state.totalPrice}
			/>
		if (this.state.loading) {
			orderSummary = <Spinner />
		}

		return(
			<Aux>
				<Modal
					show={this.state.purchasing}
					modalClosed={this.purchaseCancelHandler}
				>
					{orderSummary}
				</Modal>
				<Burger ingredients={this.state.ingredients} />
				<BuildControls
					ingredientAdded = {this.addIngredientHandler}
					ingredientRemoved = {this.removeIngredientHandler}
					disabled = {disabledInfo}
					purchesable = {this.state.purchesable}
					ordered = {this.purchaseHandler}
					price = {this.state.totalPrice}
				/>
			</Aux>
		);
	}
}

export default withErrorHandler(BurgerBuilder, axios);
