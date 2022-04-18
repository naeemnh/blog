import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import "./App.css";
import * as actions from "./actions";

function App(props) {
	// if()
	return (
		<div className="App">
			<Header />
			<Router>
				<Routes>
					<Route path="" element={<Dashboard />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
