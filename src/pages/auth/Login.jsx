import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

// Demo helper so the prototype is easy to click through.
const quickAccounts = [
  { user_id: 1, role: 'STUDENT', label: 'Andrea Cruz', email: 'a.cruz@csu.edu.ph' },
  { user_id: 5, role: 'VENDOR', label: "Mama's Kitchen", email: 'chez.magalona@stall.com' },
  { user_id: 8, role: 'ADMIN', label: 'Admin', email: 'admin@csu.edu.ph' },
]

export default function Login() {
  const { login, loginByUserId } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function routeFor(role) {
    if (role === 'STUDENT') return '/stalls'
    if (role === 'VENDOR') return '/vendor'
    if (role === 'ADMIN') return '/admin'
    return from
  }

  function handleSubmit(e) {
    e.preventDefault()
    const res = login(email, password)
    if (!res.ok) {
      setError(res.error)
      return
    }
    navigate(routeFor(res.user.role), { replace: true })
  }

  function quick(uid) {
    const u = loginByUserId(uid)
    if (u) navigate(routeFor(u.role), { replace: true })
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="mb-8 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-600 text-2xl">🍱</span>
        <h1 className="mt-3 text-2xl font-bold text-slate-900">Log in to CSU Canteen</h1>
        <p className="mt-1 text-sm text-slate-500">
          Order ahead against a stall's live menu and reserve your pickup time.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <label className="block text-sm font-medium text-slate-700">CSU email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="student@csu.edu.ph"
          className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
        />
        <label className="mt-4 block text-sm font-medium text-slate-700">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
        />
        {error && <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
        <button
          type="submit"
          className="mt-5 w-full rounded-lg bg-brand-600 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Log in
        </button>
        <p className="mt-4 text-center text-sm text-slate-500">
          No account yet?{' '}
          <Link to="/register" className="font-semibold text-brand-600 hover:underline">
            Register
          </Link>
        </p>
      </form>

      <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white/60 p-5">
        <p className="text-sm font-semibold text-slate-700">Demo accounts (no backend)</p>
        <p className="mt-0.5 text-xs text-slate-500">One click to jump into each role.</p>
        <div className="mt-3 space-y-2">
          {quickAccounts.map((a) => (
            <button
              key={a.user_id}
              onClick={() => quick(a.user_id)}
              className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-left text-sm hover:border-brand-400 hover:bg-brand-50"
            >
              <span className="font-medium text-slate-800">{a.label}</span>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
                {a.role}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}