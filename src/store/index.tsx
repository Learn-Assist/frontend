import { createContext, useReducer, Reducer, Dispatch } from "react";
import { rootReducer } from "./reducers";
import { AppState, dispatchAction } from "./types";

export const initialState: AppState = {
	app: {
		userStatus: "loading",
	},
	user: {
		uid: "",
		name: "",
		email: "",
		grade: 2,
		age: 0,
		school: "",
		timeActiveInMinutes: 0,
		createdAt: new Date(),
		updatedAt: new Date(),
		photoURL: "",
		tests: [],
	},
	chats: {
		input: "",
		messages: [
			{
				id: "new_message_init",
				timeStamp: new Date(),
				message: "Ask me something...",
				type: "bot",
				content: "text",
			},
		],
		isLoading: false,
	},
	audio: {
		currentURL: false,
		prevURLs: [],
	},
	toasts: [],
};

export const useStore = (): {
	store: AppState;
	dispatch: Dispatch<dispatchAction>;
} => {
	const [store, dispatch] = useReducer<Reducer<AppState, dispatchAction>>(
		rootReducer,
		initialState
	);
	return { store, dispatch };
};

const StoreContext = createContext<{
	store: AppState;
	dispatch: Dispatch<dispatchAction>;
}>({ store: initialState, dispatch: () => {} });

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
	const { store, dispatch } = useStore();
	return (
		<StoreContext.Provider value={{ store, dispatch }}>
			{children}
		</StoreContext.Provider>
	);
};

export * as actions from "./actions";

export default StoreContext;
