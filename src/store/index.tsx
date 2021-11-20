import { createContext, useReducer, Reducer, Dispatch } from "react";
import { rootReducer } from "./reducers";
import { AppState, dispatchAction } from "./types";

export const initialState: AppState = {
	user: { id: "", name: "" },
	chats: {
		input: "",
		messages: [
			{
				id: "new_message_init",
				timeStamp: new Date(),
				message: "Ask me something...",
				type: "bot",
			},
		],
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
