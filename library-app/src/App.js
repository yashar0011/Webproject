import LandingPage from './components/LandingPage';
import BookForm from './components/BookForm';
import BookList from './components/BooksList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/add-book" element={<BookForm />} />
        <Route path="/books" element={<BookList />} />
      </Routes>
    </Router>
  );
}

export default App;
