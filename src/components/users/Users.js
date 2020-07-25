import React, { useContext } from "react";
import UserItem from "./UserItem";
import Spinner from "../ui/Spinner";
import GithubContext from "../../context/github/githubContext";

const Users = () => {
	const githubContext = useContext(GithubContext);
	const { users, loading } = githubContext;

	return loading ? (
		<Spinner />
	) : (
		<div className="grid-3">
			{users.map((user) => (
				<UserItem key={user.id} user={user} />
			))}
		</div>
	);
};

export default Users;
