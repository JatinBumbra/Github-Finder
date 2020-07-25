import React from "react";
import "./App.css";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/ui/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import Alert from "./components/ui/Alert";

class App extends React.Component {
	state = {
		users: [],
		loading: false,
		alert: null,
	};

	async componentDidMount() {
		this.setState({ ...this.state, loading: true });
		const res = await axios.get(
			`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
		this.setState({ users: res.data, loading: false });
	}

	searchUser = async (user) => {
		this.setState({ ...this.state, loading: true });
		const res = await axios.get(
			`https://api.github.com/search/users?q=${user}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
		this.setState({ users: res.data.items, loading: false });
	};

	clearUsers = () =>
		this.setState({ ...this.state, users: [], loading: false });

	setAlert = (msg, type) => {
		this.setState({ ...this.state, alert: { msg, type } });
		setTimeout(() => this.setState({ ...this.state, alert: null }), 5000);
	};

	render() {
		return (
			<div>
				<Navbar />
				<div className="container">
					{this.state.alert && <Alert alert={this.state.alert} />}
					<Search
						searchUser={this.searchUser}
						clearUsers={this.clearUsers}
						showClear={this.state.users.length > 0 ? true : false}
						setAlert={this.setAlert}
					/>
					<Users loading={this.state.loading} users={this.state.users} />
				</div>
			</div>
		);
	}
}

export default App;
