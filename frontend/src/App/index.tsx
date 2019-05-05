import * as React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { IStore } from '../Store';
import { EXAMPLE_URLS } from '../configs/urls';
import logo from '../logo.svg';
import './index.css';

interface IStateProps {
	isAuthenticated: boolean
}

const mapStateToProps = ({ user }: IStore): IStateProps => ({
	isAuthenticated: user.token !== undefined
})

interface IState {
	now: string;
}

type IProps = IStateProps;

class App extends React.Component<IProps, IState> {
	public state: IState = {
		now: ""
	}

	componentDidMount() {
		axios.get(EXAMPLE_URLS.NOW)
			.then(({ data }) => {
				this.setState({ now: data[0].now })
			})
	}

	render() {
		const { now } = this.state,
			{ isAuthenticated } = this.props;

		return (
			<div className="App">
				<header className="App-header">
					<img src={ logo } className="App-logo" alt="logo" />
					<h1 className="App-title">Welcome to React</h1>
					<h4>Now is { now }</h4>
					<h4>{ isAuthenticated ? "User authenticated" : "User not authenticated" }</h4>
				</header>
				<p className="App-intro">
					To get started, edit <code>src/App.tsx</code> and save to reload.
				</p>
			</div>
		);
	}
}

export default connect(
	mapStateToProps
)(App);
