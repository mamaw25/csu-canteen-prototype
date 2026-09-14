import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Protects routes by role. In the real app this mirrors the auth + role-check
// middleware that runs BEFORE controllers on the server.
export default function ProtectedRoute({ role, children }) {
  const { currentUser } = useAuth()
  const location = useLocation()

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  if (role && currentUser.role !== role) {
    return <Navigate to="/" replace />
  }
  return children
}