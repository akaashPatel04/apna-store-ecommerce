import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import { Header, HomeIcon } from './components/Header';
import Footer from './components/Footer';
import ProductDetail from './Product/ProductDetail';
import SearchPage from './pages/SearchPage';
import Register from './user/Register';
import Login from './user/Login';
import Profile from './user/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import UpdateProfile from './user/UpdateProfile';
import Cart from './Product/Cart';
import Shipping from './order/Shipping';
import OrderPage from './order/OrderPage';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PaymentPage from './order/PaymentPage';
import PageNotFound from './components/PageNotFound';
import MyOrders from './user/MyOrders';
import MySingleOrder from './user/MySingleOrder';
import Dashboard from './admin/Dashboard';
import AllProducts from './admin/AllProducts';
import CreateProduct from './admin/CreateProduct';
import EditProduct from './admin/EditProduct';
import AllOrders from './admin/AllOrders';
import EditOrderStatus from './admin/EditOrderStatus';
import AllUsers from './admin/AllUsers';
import EditUserRole from './admin/EditUserRole';
import About from './pages/About';

function App() {
  return (
    <BrowserRouter>
      <HomeIcon />
      <Header />
      <ToastContainer position='top-center' theme='colored' hideProgressBar autoClose={800} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cart' element={<Cart />} />


        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/update' element={<UpdateProfile />} />
          <Route path='/shipping' element={<Shipping />} />
          <Route path='/order/confirm' element={<OrderPage />} />
          <Route path="/process/payment" element={<PaymentPage />} />
          <Route path="/order/me" element={<MyOrders />} />
          <Route path="/order/me/:id" element={<MySingleOrder />} />
        </Route>


        {/* Admin Routes */}

        <Route element={<ProtectedRoute />}>
          <Route element={<AdminProtectedRoute />}>
            <Route path='/admin/dashboard' element={<Dashboard />} />
            <Route path='/admin/products' element={<AllProducts />} />
            <Route path='/admin/product/create' element={<CreateProduct />} />
            <Route path='/admin/product/edit/:id' element={<EditProduct />} />
            <Route path='/admin/orders' element={<AllOrders />} />
            <Route path='/admin/order/edit/:id' element={<EditOrderStatus />} />
            <Route path='/admin/users' element={<AllUsers />} />
            <Route path='/admin/user/edit/:id' element={<EditUserRole />} />
          </Route>
        </Route>

        <Route path="*" element={<PageNotFound />} />

      </Routes>
      <Footer />
    </BrowserRouter >
  );
}

export default App;
