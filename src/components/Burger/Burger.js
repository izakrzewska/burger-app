import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

	let transformedIngredients = Object.keys(props.ingredients) // make an array of arrays of ingredients
		.map(igKey => { 
			return [...Array(props.ingredients[igKey])].map((_, i) => { 
				return <BurgerIngredient key={igKey + i} type={igKey}/>;
			}); 
		})
		.reduce((arr, el) => { // make one ingredients array to know the length of it (to check if it's empty or not) 
			return arr.concat(el)
		}, []);

		if (!transformedIngredients.length) {
			transformedIngredients = <p>Why don't you add some ingredients?</p>
		}

	return(

		<div className={classes.Burger}>
			<BurgerIngredient type="bread-top"/>
				{transformedIngredients}
			<BurgerIngredient type="bread-bottom"/>

		</div>
	);
};

export default burger;