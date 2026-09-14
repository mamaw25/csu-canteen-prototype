import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { menuItemById } from '../mock/menuItems'

function navByRole(role) {
  if (role === 'STUDENT') {
    return [
      { to: '/stalls', label: 'Browse Stalls' },
      { to: '/cart', label: 'My Cart' },
      { to: '/orders', label: 'My Orders' },
    ]
  }
  if (role === 'VENDOR') {
    return [
      { to: '/vendor', label: 'Dashboard' },
      { to: '/vendor/menu', label: 'Menu & Stock' },
      { to: '/vendor/orders', label: 'Order Queue' },
      { to: '/vendor/summary', label: 'Daily Summary' },
    ]
  }
  if (role === 'ADMIN') {
    return [{ to: '/admin', label: 'Users & Stalls' }]
  }
  return []
}

export default function Navbar() {
  const { currentUser, logout } = useAuth()
  const { lines } = useCart()

  const cartCount = lines.reduce((sum, l) => {
    const item = menuItemById(l.item_id)
    return item && !item.is_sold_out ? sum + l.quantity : sum
  }, 0)

  const links = currentUser ? navByRole(currentUser.role) : []

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold text-brand-700">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-white text-sm">🍱</span>
          CSU Canteen
        </Link>

        {currentUser && (
          <nav className="hidden gap-1 md:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-brand-700"
              >
                {l.label}
                {l.to === '/cart' && cartCount > 0 && (
                  <span className="ml-1.5 rounded-full bg-brand-600 px-1.5 text-xs text-white">
                    {cartCount}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-3">
          {currentUser ? (
            <>
              <div className="text-right leading-tight">
                <div className="text-sm font-semibold text-slate-800">{currentUser.full_name}</div>
                <div className="text-xs text-slate-500">{currentUser.role}</div>
              </div>
              <button
                onClick={logout}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Log out
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="rounded-lg bg-brand-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-brand-700"
            >
              Log in
            </Link>
          )}
        </div>
      </div>

      {currentUser && (
        <nav className="flex gap-2 overflow-x-auto border-t border-slate-100 px-4 py-2 md:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="whitespace-nowrap rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}