import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Components
import Header from './components/common/Header';

// Page Components
import Home from './pages/Home';
import About from './pages/About';
import Clips from './pages/Clips';
import MainLayout from './layouts/MainLayout';

const App = () => {
	return (
		<Router>
			<Header />

			<Routes>
				<Route element={<MainLayout />}>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/clips" element={<Clips />} />
				</Route>
			</Routes>
		</Router>
	);
};

export default App;
