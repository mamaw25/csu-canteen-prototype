import { useNavigate } from 'react-router-dom'
import { vendors } from '../mock/vendors'
import { menuByVendor } from '../mock/menuItems'

export default function Home() {
  const navigate = useNavigate()

  const totalItems = vendors.reduce((s, v) => s + menuByVendor(v.vendor_id).length, 0)

  return (
    <div className="mx-auto max-w-4xl">
      <section className="rounded-3xl bg-gradient-to-br from-brand-700 to-brand-900 p-8 text-white">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-200">CSU Canteen</p>
        <h1 className="mt-2 text-3xl font-bold">Order ahead. Pick up on your break.</h1>
        <p className="mt-3 max-w-xl text-brand-100">
          A 15-minute break shouldn't mean 15 minutes in line. Browse each stall's live menu, reserve a
          pickup slot, and track a shared order status from placed to claimed.
        </p>
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => navigate('/login')}
            className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-brand-800 hover:bg-brand-50"
          >
            Log in
          </button>
          <button
            onClick={() => navigate('/register')}
            className="rounded-lg border border-white/30 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
          >
            Register
          </button>
        </div>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          { icon: '📋', title: 'Live menus', text: 'Stock counts and sold-out items you can see before joining the line.' },
          { icon: '⏰', title: 'Pickup slots', text: 'Reserve a time window that fits inside your break.' },
          { icon: '🔄', title: 'Shared status', text: 'PENDING → PREPARING → READY → CLAIMED. Nobody has to ask.' },
        ].map((f) => (
          <div key={f.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className="text-2xl">{f.icon}</span>
            <h2 className="mt-2 font-bold text-slate-900">{f.title}</h2>
            <p className="mt-1 text-sm text-slate-500">{f.text}</p>
          </div>
        ))}
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        {vendors.map((v) => (
          <button
            key={v.vendor_id}
            onClick={() => navigate(`/stalls/${v.vendor_id}`)}
            className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-brand-400 hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-xl">{v.image}</span>
              <div>
                <h3 className="font-bold text-slate-900">{v.stall_name}</h3>
                <p className="text-xs text-slate-500">{menuByVendor(v.vendor_id).length} items</p>
              </div>
            </div>
          </button>
        ))}
      </section>
    </div>
  )
}