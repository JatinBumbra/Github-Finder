import React from "react";

const Alert = ({ alert: { type, msg } }) => {
	return (
		<div className={`alert alert-${type}`}>
			<i className="fas fa-info-circle"></i> {msg}
		</div>
	);
};

export default Alert;
