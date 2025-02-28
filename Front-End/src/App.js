import './App.css';
import MainPage from './Components/MainPage';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import SellerOrders from './Components/SellerOrders.js';
import SellerPage from './Components/SellerPage.js';
import HomePage from './Components/HomePage ';
import SettingsPage from './Components/SettingsPage .js';
import SettingsPage1 from './Components/SettingsPage1.js';
import DeliveryPartner from './Components/DeliveryPartner.js';
import DeliveryPartnerOrder from './Components/DeliveryPartnerOrder.js';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function App() {

  return (
    <>
     <ToastContainer />
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/delivery_partner_page" element={<DeliveryPartner/>} />
        <Route path="/delivery_partner_order_page" element={<DeliveryPartnerOrder/>} />
        <Route path="/seller_page" element={<SellerPage/>} />
        <Route path="/seller_orders" element={<SellerOrders/>} />
        <Route path="/Settings" element={<SettingsPage/>} />
        <Route path="/Settings1" element={<SettingsPage1/>} />
        <Route path="/MainPage" element={<MainPage/>} />
      </Routes>
    </Router>
    {/* <div className="App">
     <MainPage></MainPage>
    </div> */}
    </>
  );
}

export default App;
