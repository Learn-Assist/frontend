import React from "react";
import ReactDOM from "react-dom";
import "./css/index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "./store";
import { QueryClient, QueryClientProvider } from "react-query";
// import reportWebVitals from './reportWebVitals';
const queryClient = new QueryClient();
ReactDOM.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<StoreProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</StoreProvider>
		</QueryClientProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
