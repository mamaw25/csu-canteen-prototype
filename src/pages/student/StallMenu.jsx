import { Link, useParams } from 'react-router-dom'
import { vendorById } from '../../mock/vendors'
import { menuByVendor } from '../../mock/menuItems'
import { useCart } from '../../context/CartContext'

export default function StallMenu() {
  const { vendorId } = useParams()
  const vendor = vendorById(vendorId)
  const { add } = useCart()

  if (!vendor) {
    return <p className="text-slate-500">Stall not found.</p>
  }

  const items = menuByVendor(vendor.vendor_id)
  const available = items.filter((i) => !i.is_sold_out)
  const soldOut = items.filter((i) => i.is_sold_out)

  const MenuRow = ({ item }) => (
    <div className="flex items-center gap-4 border-b border-slate-100 py-4 last:border-0">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-slate-100 text-2xl">
        {item.image}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-slate-900">{item.name}</h3>
          <span className="text-xs font-medium text-slate-400">₱{item.unit_price.toFixed(2)}</span>
        </div>
        <p className="mt-0.5 text-sm text-slate-500">{item.description}</p>
        <p className={`mt-1 text-xs font-semibold ${item.stock_qty <= 5 ? 'text-amber-600' : 'text-emerald-600'}`}>
          {item.stock_qty} left
        </p>
      </div>
      <button
        onClick={() => add(item)}
        className="rounded-lg bg-brand-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-brand-700"
      >
        + Add
      </button>
    </div>
  )

  return (
    <div>
      <Link to="/stalls" className="text-sm font-medium text-brand-600 hover:underline">
        ← All stalls
      </Link>

      <header className="mb-5 mt-3 flex items-center gap-4">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-3xl">
          {vendor.image}
        </span>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{vendor.stall_name}</h1>
          <p className="text-sm text-slate-500">{vendor.description}</p>
        </div>
        <Link
          to={`/stalls/${vendor.vendor_id}/slots`}
          className="ml-auto rounded-lg border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-100"
        >
          Pick pickup time
        </Link>
      </header>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-3">
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-400">Available now</h2>
          {available.length > 0 ? (
            available.map((item) => <MenuRow key={item.item_id} item={item} />)
          ) : (
            <p className="py-6 text-center text-sm text-slate-400">Nothing available right now.</p>
          )}
        </div>

        <div className="lg:col-span-2">
          {soldOut.length > 0 && (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white/60 p-5">
              <h2 className="text-sm font-bold uppercase tracking-wide text-slate-400">
                Sold out · discovered at the stall
              </h2>
              {soldOut.map((item) => (
                <div key={item.item_id} className="mt-3 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-slate-100 text-xl opacity-60">
                    {item.image}
                  </span>
                  <div>
                    <p className="font-medium text-slate-700">{item.name}</p>
                    <p className="text-xs font-semibold text-red-500">Sold out</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-5 rounded-2xl border border-brand-100 bg-brand-50 p-5">
            <h3 className="text-sm font-bold text-brand-800">Reserve before you order</h3>
            <p className="mt-1 text-sm text-brand-700">
              Pick a pickup slot for {vendor.stall_name} — then checkout with your cart.
            </p>
            <Link
              to={`/stalls/${vendor.vendor_id}/slots`}
              className="mt-3 inline-block rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
            >
              View slots
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}