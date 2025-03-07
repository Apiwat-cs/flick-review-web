import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/Home';
import MovieDetail from './components/MovieDetail';

function App() {
  return (
    <Router>
      <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:movieId" element={<MovieDetail />} />
        </Routes>
      <Footer />
    </Router>
  );
}

export default App;

