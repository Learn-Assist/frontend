import ReactDOM from "react-dom";
import "./css/index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "./store";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();
ReactDOM.render(
	<QueryClientProvider client={queryClient}>
		<StoreProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</StoreProvider>
	</QueryClientProvider>,
	document.getElementById("root")
);
