import { createContext, useContext, useState } from 'react'
import { users } from '../mock/users'

// Mock auth. No real JWT — this prototype just stores the active user.
// Tokens would live in localStorage in the real app (JWT, 8h expiry).
const AuthContext = createContext(null)

const STORAGE_KEY = 'csu_canteen_user'

function loadUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(loadUser)

  // Accepts a user_id so the demo can jump between roles quickly.
  function loginByUserId(userId) {
    const u = users.find((x) => x.user_id === Number(userId))
    if (!u) return null
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u))
    setCurrentUser(u)
    return u
  }

  function login(email, password) {
    const u = users.find((x) => x.email === email)
    if (!u) return { ok: false, error: 'No account with that email.' }
    if (!password) return { ok: false, error: 'Password is required.' }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u))
    setCurrentUser(u)
    return { ok: true, user: u }
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY)
    setCurrentUser(null)
  }

  return (
    <AuthContext.Provider value={{ currentUser, login, loginByUserId, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}