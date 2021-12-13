import { Route, Routes, useLocation } from "react-router-dom";
import HeroHome from "./components/HeroHome";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Roadmap from "./pages/Roadmap";
import ChatWidget from "./pages/Chat";
import { QueryClient, QueryClientProvider } from "react-query";
import StoreProvider, { actions } from "./store";
import { useContext } from "react";
import ToastHandler from "./components/toast/ToastHandler";
const queryClient = new QueryClient();
function App() {
	const { store, dispatch } = useContext(StoreProvider);
	const location = useLocation();
	return (
		<QueryClientProvider client={queryClient}>
			<main className="scrollbar-hidden">
				{!location.pathname.includes("assist") && <Navbar />}
				<ToastHandler />
				<Routes>
					<Route path="/" element={<HeroHome />}>
						<Route path="home" element={<HeroHome />} />
					</Route>
					<Route path="/about" element={<About />} />
					<Route path="/roadmap" element={<Roadmap />} />
					<Route path="/assist" element={<ChatWidget />} />
					<Route path="*" element={<HeroHome />} />
				</Routes>
				{!location.pathname.includes("assist") && <Footer />}
			</main>
		</QueryClientProvider>
	);
}

export default App;
