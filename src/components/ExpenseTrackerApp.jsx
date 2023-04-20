import { useEffect, useState } from "react";
import Transactions from "./Transactions";

const ExpenseTrackerApp = () => {
	const [income, setIncome] = useState(0);
	const [expense, setExpense] = useState(0);
	const [formIsShown, setFormIsShown] = useState(false);
	const [transactions, setTransactions] = useState([]);
	const [formValues, setFormValues] = useState({
		amount: "$ ",
		desc: "",
		type: "expense",
	});

	useEffect(() => {
		let exp = 0;
		let inc = 0;
		transactions.forEach((t) =>
			t.type === "expense"
				? (exp = exp + parseFloat(t.amount.replace(/[$ ]/g, "")))
				: (inc = inc + parseFloat(t.amount.replace(/[$ ]/g, "")))
		);
		setExpense(exp);
		setIncome(inc);
	}, [transactions]);

	const changeHandler = (e) => {
		const re = /^(?!0(\d|\.(\d{0,2})?)$)\d+(\.\d{0,2})?$/;
		const input = e.target.value.replace(/[$ ]/g, "");
		if (e.target.name === "amount") {
			if (input === "" || re.test(input)) {
				const outputValue = "$ " + input;
				setFormValues({ ...formValues, [e.target.name]: outputValue });
			}
		} else {
			setFormValues({ ...formValues, [e.target.name]: e.target.value });
		}
	};

	const submitHandler = (e) => {
		e.preventDefault();
		if (
			formValues.amount.replace(/[$ ]/g, "") !== "" &&
			formValues.desc !== ""
		) {
			setTransactions([
				...transactions,
				{ ...formValues, id: Date.now() },
			]);
			setFormValues({
				amount: "$ ",
				desc: "",
				type: "expense",
			});
		} else {
			alert("Input data should not be empty");
		}
	};

	const formShowHandler = () => {
		setFormIsShown(!formIsShown);
		setFormValues({
			amount: "$ ",
			desc: "",
			type: "expense",
		});
	};

	const deleteHandler = (id) => {
		const updatedTrans = transactions.filter((t) => t.id !== id);
		setTransactions(updatedTrans);
	};

	return (
		<main className="container mx-auto max-w-md">
			<section className="flex justify-between items-center">
				<p className="font-bold">
					Balance: ${" "}
					<span className="bg-purple-200 px-2 py-1 rounded-lg text-purple-800">
						{income - expense}
					</span>
				</p>
				<button
					className={formIsShown ? "btn-danger" : "btn-primary"}
					onClick={formShowHandler}
				>
					{formIsShown ? "Cancel" : "Add"}
				</button>
			</section>
			<section>
				{formIsShown && (
					<form
						className="space-y-2 border border-gray-200 rounded py-2 px-2.5 my-2"
						onSubmit={submitHandler}
					>
						<input
							placeholder="Amount"
							type="text"
							className="w-full"
							inputMode="numeric"
							onChange={changeHandler}
							name="amount"
							value={formValues.amount}
						/>
						<input
							placeholder="Description"
							type="text"
							className="w-full"
							onChange={changeHandler}
							name="desc"
							value={formValues.desc}
						/>
						<div className="space-x-2">
							<label htmlFor="expense">
								<span className="mr-1">Expense</span>
								<input
									name="type"
									id="expense"
									value="expense"
									type="radio"
									className="form-radio"
									checked={formValues.type === "expense"}
									onChange={changeHandler}
								/>
							</label>
							<label htmlFor="income">
								<span className="mr-1">Income</span>
								<input
									name="type"
									id="income"
									value="income"
									type="radio"
									className="form-radio"
									checked={formValues.type === "income"}
									onChange={changeHandler}
								/>
							</label>
						</div>
						<button className="btn-success w-full">Submit</button>
					</form>
				)}
			</section>
			<section className="flex justify-between text-left mt-4">
				<div className="border min-w-[150px] hover:bg-slate-100 border-gray-300 rounded-md px-5 py-2.5">
					<p>Expense</p>
					<p className="text-red-500 font-bold text-lg">${expense}</p>
				</div>
				<div className="border min-w-[150px] hover:bg-slate-100 border-gray-300 rounded-md px-5 py-2.5">
					<p>Income</p>
					<p className="text-green-500 font-bold text-lg">
						${income}
					</p>
				</div>
			</section>
			<Transactions
				transactions={transactions}
				onDelete={deleteHandler}
			/>
		</main>
	);
};

export default ExpenseTrackerApp;
