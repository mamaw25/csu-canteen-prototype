import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import StallList from './pages/student/StallList'
import StallMenu from './pages/student/StallMenu'
import SlotPicker from './pages/student/SlotPicker'
import Cart from './pages/student/Cart'
import Checkout from './pages/student/Checkout'
import OrderTracker from './pages/student/OrderTracker'
import OrderHistory from './pages/student/OrderHistory'
import VendorDashboard from './pages/vendor/Dashboard'
import MenuManager from './pages/vendor/MenuManager'
import OrderQueue from './pages/vendor/OrderQueue'
import DailySummary from './pages/vendor/DailySummary'
import AdminDashboard from './pages/admin/AdminDashboard'

// Role-based redirect for "/" once logged in — mirrors the JWT role claim.
function LandingRedirect() {
  const { currentUser } = useAuth()
  if (!currentUser) return <Home />
  if (currentUser.role === 'STUDENT') return <Navigate to="/stalls" replace />
  if (currentUser.role === 'VENDOR') return <Navigate to="/vendor" replace />
  if (currentUser.role === 'ADMIN') return <Navigate to="/admin" replace />
  return <Home />
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<LandingRedirect />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/stalls"
              element={
                <ProtectedRoute role="STUDENT">
                  <StallList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/stalls/:vendorId"
              element={
                <ProtectedRoute role="STUDENT">
                  <StallMenu />
                </ProtectedRoute>
              }
            />
            <Route
              path="/stalls/:vendorId/slots"
              element={
                <ProtectedRoute role="STUDENT">
                  <SlotPicker />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute role="STUDENT">
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute role="STUDENT">
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute role="STUDENT">
                  <OrderHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/:orderId"
              element={
                <ProtectedRoute role="STUDENT">
                  <OrderTracker />
                </ProtectedRoute>
              }
            />

            <Route
              path="/vendor"
              element={
                <ProtectedRoute role="VENDOR">
                  <VendorDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/vendor/menu"
              element={
                <ProtectedRoute role="VENDOR">
                  <MenuManager />
                </ProtectedRoute>
              }
            />
            <Route
              path="/vendor/orders"
              element={
                <ProtectedRoute role="VENDOR">
                  <OrderQueue />
                </ProtectedRoute>
              }
            />
            <Route
              path="/vendor/summary"
              element={
                <ProtectedRoute role="VENDOR">
                  <DailySummary />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <ProtectedRoute role="ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </CartProvider>
    </AuthProvider>
  )
}