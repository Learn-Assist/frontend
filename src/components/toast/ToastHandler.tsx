import { useContext, useEffect } from "react";
import StoreProvider, { actions } from "../../store";
import { toast } from "../../store/types/toastTypes";
import Toast from "./Toast";
function ToastHandler() {
	const { store, dispatch } = useContext(StoreProvider);
	const queue = store.toasts;
	const setQueue = (queue: toast[]) =>
		dispatch(actions.toastActions.setQueue(queue));

	useEffect(() => {
		if (queue.length > 0) {
			setTimeout(
				() => {
					console.log("Timeout Toast");
					const queueCopy = [...queue];
					queueCopy.shift();
					setQueue(queueCopy);
					console.log("Queue after shifting", queue);
				},
				queue[0].duration === "short" ? 3000 : 5000
			);
		}
	}, [queue]);

	return (
		<div>
			{queue.length > 0 && (
				<Toast
					type={queue[0].type}
					message={queue[0].message}
					duration={queue[0].duration}
				/>
			)}
		</div>
	);
}

export default ToastHandler;
