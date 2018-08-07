import React, { Component} from 'react';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    adsress: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHandler = (e) => {
    e.preventDefault();
    this.setState({
			loading: true
		});
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
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
					loading: false
				});
        this.props.history.push('/');
			})
			.catch(error => {
				this.setState({
					loading: false
				});
			});
  }

  render () {

    let form = (
      <form>
        <input className={classes.Input} type="text" name="name" placeholder="Your name" />
        <input className={classes.Input} type="email" name="email" placeholder="Your email" />
        <input className={classes.Input} type="text" name="street" placeholder="Your street" />
        <input className={classes.Input} type="text" name="postal" placeholder="Your postal code" />
        <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Entry your contact data</h4>
        {form}
      </div>
    )
  }
}

export default ContactData;
