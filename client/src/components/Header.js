import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AuthenticateButton from "./AuthenticateButton";

class Header extends Component {
	renderContent() {
		switch (this.props.auth) {
			case null:
				return;
			case false:
				return [
					<li key="1">
						{/* <Link to="/auth/login">Login</Link> */}
						<AuthenticateButton link="login" />
					</li>,
					<li key="2">
						{/* <Link to="/auth/register">Register</Link> */}
						<AuthenticateButton link="register" />
					</li>,
				];
			default:
				return (
					<li>
						{/* <a href="/auth/logout">Logout</a> */}
						<AuthenticateButton link="logout" />
					</li>
				);
		}
	}
	render() {
		return (
			<nav className="nav-wrapper">
				<Link
					to={this.props.auth ? "/surveys" : "/"}
					className="left brand-logo">
					<img src="/assets/images/HUmanHub_by MehanHr_Logo.svg" alt="" />
				</Link>
				<ul className="right">{this.renderContent()}</ul>
			</nav>
		);
	}
}
export default Header;
