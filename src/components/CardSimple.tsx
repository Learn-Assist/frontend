interface CardSimpleProps {
	title: string;
	description: string;
	buttonAction: string;
	buttonOnClick?: (e: any) => void;
}
function CardSimple({
	title,
	description,
	buttonAction,
	buttonOnClick,
}: CardSimpleProps) {
	return (
		<div className="card bg-base-100 shadow-xl col-span-3 ">
			<div className="card-body">
				<h2 className="card-title">{title}</h2>
				<p>{description}</p>
				<div className="card-actions justify-end">
					<button onClick={buttonOnClick} className="btn btn-primary">
						{buttonAction}
					</button>
				</div>
			</div>
		</div>
	);
}

export default CardSimple;
