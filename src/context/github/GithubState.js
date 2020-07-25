import React, { useReducer } from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import {
	SEARCH_USERS,
	SET_LOADING,
	GET_REPOS,
	GET_USER,
	CLEAR_USERS,
} from "../types";

const GithubState = (props) => {
	const initialState = {
		users: [],
		user: {},
		repos: [],
		loading: false,
	};
	const [state, dispatch] = useReducer(GithubReducer, initialState);

	// Search users
	const searchUser = async (user) => {
		setLoading();
		const res = await axios.get(
			`https://api.github.com/search/users?q=${user}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
		dispatch({
			type: SEARCH_USERS,
			payload: res.data.items,
		});
	};

	// Get single user
	const getUser = async (username) => {
		setLoading();
		const res = await axios.get(
			`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
		dispatch({
			type: GET_USER,
			payload: res.data,
		});
	};

	// Get user's repos
	const getUserRepos = async (username) => {
		setLoading(true);
		const res = await axios.get(
			`https://api.github.com/users/${username}/repos?per_page=10&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
		dispatch({
			type: GET_REPOS,
			payload: res.data,
		});
	};

	// Clear the results
	const clearUsers = () =>
		dispatch({
			type: CLEAR_USERS,
		});

	// Set loading
	const setLoading = () => dispatch({ type: SET_LOADING });

	return (
		<GithubContext.Provider
			value={{
				users: state.users,
				user: state.user,
				repos: state.repos,
				loading: state.loading,
				searchUser,
				getUser,
				clearUsers,
				getUserRepos,
			}}
		>
			{props.children}
		</GithubContext.Provider>
	);
};

export default GithubState;