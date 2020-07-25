import React from "react";
import UserItem from "./UserItem";
import Spinner from "../ui/Spinner";
import PropTypes from "prop-types";

const Users = ({ users, loading }) =>
	loading ? (
		<Spinner />
	) : (
		<div className="grid-3">
			{users.map((user) => (
				<UserItem key={user.id} user={user} />
			))}
		</div>
	);

Users.propTypes = {
	users: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired,
};

export default Users;
