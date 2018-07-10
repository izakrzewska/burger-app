import React, {Component} from 'react';

import Aux from '../Aux-component/Aux-component';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

	state = {
		showSideDrawer: false
	}

	SideDrawerClosedHandler = () => {

		this.setState({
			showSideDrawer: false
		})

	}

	SideDrawerToggleHandler = () => {

		this.setState((prevState) => {
			return {showSideDrawer: !this.state.showSideDrawer}
		});
	}

	render() { 
		return (
			<Aux>
				<Toolbar openSideDrawer={this.SideDrawerToggleHandler}/>
				<SideDrawer open={this.state.showSideDrawer} closed={this.SideDrawerClosedHandler}/>
				<main className={classes.Content}>
					{this.props.children}
				</main>
			</Aux>
		);
	}
}

export default Layout;