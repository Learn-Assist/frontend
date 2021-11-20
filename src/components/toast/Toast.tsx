import { toast } from "../../store/types/toastTypes";

function Toast({ message, type }: toast) {
	let bgColor = "",
		text = "",
		border = "";
	switch (type) {
		case "info":
			bgColor = "bg-gray-100";
			text = "text-info";
			border = "border-info";
			break;
		case "success":
			bgColor = "bg-green-100";
			text = "text-success";
			border = "border-success";
			break;
		case "warning":
			bgColor = "bg-orange-100";
			text = "text-warning";
			border = "border-warning";
			break;
		case "error":
			bgColor = "bg-red-100";
			text = "text-error";
			border = "border-error";
			break;
		default:
			break;
	}
	return (
		<div
			className={`w-screen absolute mt-24 z-10 flex items-center justify-center p-4 rounded-lg `}
		>
			<div
				className={`w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 px-5 absolute right-12 py-4 
                rounded-xl font-bold text-center ${bgColor} bg-opacity-90 ${text} border ${border}`}
			>
				{message}
			</div>
		</div>
	);
}

export default Toast;
