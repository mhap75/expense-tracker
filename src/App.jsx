import { Fragment } from "react";
import ExpenseTrackerApp from "./components/ExpenseTrackerApp";

function App() {
	return (
		<Fragment>
			<header className="container mx-auto text-center">
				<h1 className="text-2xl font-bold my-4">Expense Tracker</h1>
			</header>
			<ExpenseTrackerApp />
		</Fragment>
	);
}

export default App;
