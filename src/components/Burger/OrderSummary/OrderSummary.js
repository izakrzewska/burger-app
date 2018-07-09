import React from 'react';

import Aux from '../../../hoc/Aux-component';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => { console.log(props)

	const ingredientsSummary = Object.keys(props.ingredients)
		.map(igKey => { 
			return <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}</span> : {props.ingredients[igKey]}</li>
		});

	return(
		<Aux>
			<h3>Your order</h3>
			<p>Your burger:</p>
			<ul>
				{ingredientsSummary}
			</ul>
			<p>Total price: <strong>{props.price.toFixed(2)} $</strong></p>
			<p>Checkout?</p>
			<Button btnType='Danger' clicked={props.cancelOrder}> Not yet, thank you </Button>
			<Button btnType='Success' clicked={props.continueOrder}>Yes, please </Button>
		</Aux>
	)
};

export default orderSummary;