/*import logo from './logo.svg';*/
import './App.css';
import { BrowserRouter, Routes, Route, /*Link*/ } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import NavigationBar from './components/NavBar/NavBar';
import RoomComponent from './components/RoomCategory/Rooms'
import HomeScreen from './screens/HomeScreen';
import BookForm from './components/BookForm/BookForm';
import BookingScreen from './screens/BookingScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import AdminScreen from './screens/AdminScreen';
import Home from './Pages/HomePage/Home';
import Contact from './Pages/ContactUs/Contact';
import About from './Pages/AboutPage/About';
import Footer from './components/FooterSection/Footer';


function App() {
  return (
    <div>
      <BrowserRouter>
        <NavigationBar />
        <Routes>
         <Route path="/" element={<Home/>} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path='/profile' element={<ProfileScreen />} />
          <Route path="/simple-room" element={<RoomComponent selectedRoom="simple" />} />
          <Route path="/vip-room" element={<RoomComponent selectedRoom="vip" />} />
          <Route path="/luxury-room" element={<RoomComponent selectedRoom="luxury" />} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/book" element={<BookForm />} />
          <Route path="/book/:roomid/:fromDate/:toDate" element={<BookingScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path='/admin' element={<AdminScreen />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
