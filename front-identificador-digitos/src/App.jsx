import { Route, Routes} from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Login from './components/Login';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />    
        <Route path="/sign" element={<Login/>} />
      </Routes>

    </>
  );
}
