import React from "react";
import { Link } from "react-router-dom";

const Button = ({ link }) => {
	return <Link to={`/auth/${link}`}>{link}</Link>;
};

export default Button;
