import { toast } from "../../store/types/toast";

function Toast({ message, type }: toast) {
	let bg = "";
	switch (type) {
		case "info":
			bg = "bg-info";
			break;
		case "success":
			bg = "bg-success";
			break;
		case "warning":
			bg = "bg-warning";
			break;
		case "error":
			bg = "bg-error";
			break;
		default:
			break;
	}
	return (
		<div
			className={`w-screen absolute mt-24 z-10 flex items-center justify-center p-2`}
		>
			<div
				className={`w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 px-3 absolute right-12 py-2 
                rounded font-bold text-center ${bg} bg-opacity-90 text-white`}
			>
				{message}
			</div>
		</div>
	);
}

export default Toast;
