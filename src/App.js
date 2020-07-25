import React, { Fragment } from "react";
import "./App.css";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/ui/Navbar";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import Alert from "./components/ui/Alert";
import About from "./components/pages/About";

class App extends React.Component {
	state = {
		users: [],
		user: {},
		loading: false,
		alert: null,
		repos: [],
	};

	// Search users
	searchUser = async (user) => {
		this.setState({ ...this.state, loading: true });
		const res = await axios.get(
			`https://api.github.com/search/users?q=${user}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
		this.setState({ users: res.data.items, loading: false });
	};

	// Get single user
	getUser = async (username) => {
		this.setState({ ...this.state, loading: true });
		const res = await axios.get(
			`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
		this.setState({ ...this.state, user: res.data, loading: false });
	};

	// Get user's repos
	getUserRepos = async (username) => {
		this.setState({ ...this.state, loading: true });
		const res = await axios.get(
			`https://api.github.com/users/${username}/repos?per_page=10&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
		this.setState({ ...this.state, repos: res.data, loading: false });
	};

	// Clear the results
	clearUsers = () =>
		this.setState({ ...this.state, users: [], loading: false });

	// Set the alert messages
	setAlert = (msg, type) => {
		this.setState({ ...this.state, alert: { msg, type } });
		setTimeout(() => this.setState({ ...this.state, alert: null }), 5000);
	};

	render() {
		const { user, users, loading, alert, repos } = this.state;

		return (
			<Router>
				<div>
					<Navbar />
					<div className="container">
						{alert && <Alert alert={alert} />}
						<Switch>
							<Route
								exact
								path="/"
								render={(props) => (
									<Fragment>
										<Search
											searchUser={this.searchUser}
											clearUsers={this.clearUsers}
											showClear={users.length > 0 ? true : false}
											setAlert={this.setAlert}
										/>
										<Users loading={loading} users={users} />
									</Fragment>
								)}
							/>
							<Route exact path="/about" component={About} />
							<Route
								exact
								path="/user/:login"
								render={(props) => (
									<User
										{...props}
										getUser={this.getUser}
										getUserRepos={this.getUserRepos}
										repos={repos}
										user={user}
										loading={loading}
									/>
								)}
							/>
						</Switch>
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
