import React from 'react';

import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import ToggleButton from '../ToggleButton/ToggleButton';

const toolbar = (props) => ( 
	<header className={classes.Toolbar}>
		<ToggleButton openSideDrawer={props.openSideDrawer}/>
		<div className={[classes.Logo, classes.DesktopOnly].join(' ')}>
			<Logo />
		</div>
		<nav className={classes.DesktopOnly}>
			<NavigationItems />
		</nav>
	</header>
);

export default toolbar;