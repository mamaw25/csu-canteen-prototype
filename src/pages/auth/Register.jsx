import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { users } from '../../mock/users'

export default function Register() {
  const { loginByUserId } = useAuth()
  const navigate = useNavigate()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('STUDENT')
  const [agreed, setAgreed] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    // Prototype-only: CSU email rule mirrors POST /api/auth/register.
    if (!/@csu\.edu\.ph$/.test(email) && role === 'STUDENT') {
      setError('Student accounts require a @csu.edu.ph email.')
      return
    }
    if (!agreed) {
      setError('Please accept the pickup terms.')
      return
    }
    // No real backend: create the user in the mock users table and log in.
    const newUser = {
      user_id: Math.max(...users.map((u) => u.user_id)) + 1,
      email,
      full_name: fullName || 'New Student',
      role,
    }
    users.push(newUser)
    const u = loginByUserId(newUser.user_id)
    navigate(u.role === 'STUDENT' ? '/stalls' : '/vendor', { replace: true })
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="mb-8 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-600 text-2xl">🍱</span>
        <h1 className="mt-3 text-2xl font-bold text-slate-900">Create an account</h1>
        <p className="mt-1 text-sm text-slate-500">One account for students, vendors, and admins.</p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <label className="block text-sm font-medium text-slate-700">Full name</label>
        <input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          placeholder="Juan Dela Cruz"
          className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
        />

        <label className="mt-4 block text-sm font-medium text-slate-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="student@csu.edu.ph"
          className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
        />

        <label className="mt-4 block text-sm font-medium text-slate-700">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          placeholder="At least 6 characters"
          className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
        />

        <label className="mt-4 block text-sm font-medium text-slate-700">I am a…</label>
        <div className="mt-1 grid grid-cols-3 gap-2">
          {['STUDENT', 'VENDOR', 'ADMIN'].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={`rounded-lg border px-3 py-2 text-sm font-semibold capitalize ${
                role === r
                  ? 'border-brand-600 bg-brand-50 text-brand-700'
                  : 'border-slate-300 bg-white text-slate-500 hover:bg-slate-50'
              }`}
            >
              {r.toLowerCase()}
            </button>
          ))}
        </div>

        <label className="mt-4 flex items-start gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-slate-300"
          />
          <span>
            I understand pickup is cash-on-pickup and the food is picked up at the stall during my slot.
          </span>
        </label>

        {error && <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

        <button
          type="submit"
          className="mt-5 w-full rounded-lg bg-brand-600 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Register
        </button>
        <p className="mt-4 text-center text-sm text-slate-500">
          Already registered?{' '}
          <Link to="/login" className="font-semibold text-brand-600 hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  )
}