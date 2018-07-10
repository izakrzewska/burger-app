import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Aux from '../../../hoc/Aux-component/Aux-component';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component { // this one doesn't have to be a class, it is a class only for validing props practice

	render() { 

		const ingredientsSummary = Object.keys(this.props.ingredients)
		.map(igKey => { 
			return <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}</span> : {this.props.ingredients[igKey]}</li>
		});

		return(
			<Aux>
				<h3>Your order</h3>
				<p>Your burger:</p>
				<ul>
					{ingredientsSummary}
				</ul>
				<p>Total price: <strong>{this.props.price.toFixed(2)} $</strong></p>
				<p>Checkout?</p>
				<Button btnType='Danger' clicked={this.props.cancelOrder}> Not yet, thank you </Button>
				<Button btnType='Success' clicked={this.props.continueOrder}>Yes, please </Button>
			</Aux>
		);		
	}
} 

OrderSummary.propTypes = {
	cancelOrder: PropTypes.func.isRequired,
	continueOrder: PropTypes.func.isRequired,
	ingredients: PropTypes.object.isRequired,
	price: PropTypes.number.isRequired

}

export default OrderSummary;