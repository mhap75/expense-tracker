import { useEffect, useState } from "react";

const Transactions = ({ transactions, onDelete }) => {
	const [srchValue, setSrchValue] = useState("");
	const [filteredTrx, setFilteredTrx] = useState(transactions);

	const srchValueHandler = (value) => {
		setSrchValue(value);
		filterHandler(value);
	};

	const filterHandler = (search) => {
		if (!search || search === "") {
			setFilteredTrx(transactions);
		} else {
			const filtered = transactions.filter((t) =>
				t.desc.toLowerCase().includes(search.toLowerCase())
			);
			setFilteredTrx(filtered);
		}
	};

	useEffect(() => {
		filterHandler(srchValue);
	}, [transactions]);

	return (
		<section className="space-y-2 my-4 bg-stone-100 py-2 px-3 rounded">
			<input
				type="search"
				className="w-full"
				placeholder="search..."
				value={srchValue}
				onChange={(e) => srchValueHandler(e.target.value)}
			/>
			{filteredTrx.map((transaction) => (
				<div
					key={transaction.id}
					className="flex justify-between gap-2 items-center bg-slate-100 py-1 px-2 rounded-md"
				>
					<div className="flex justify-between flex-1">
						<p>{transaction.desc}</p>
						<p
							className={
								transaction.type === "income"
									? "text-green-500"
									: "text-red-500"
							}
						>
							${transaction.amount.replace(/[$ ]/g, "")}
						</p>
					</div>
					<button
						onClick={() => onDelete(transaction.id)}
						className="btn-danger px-4 py-2"
					>
						X
					</button>
				</div>
			))}
		</section>
	);
};

export default Transactions;
