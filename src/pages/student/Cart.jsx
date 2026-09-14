import { Link, useNavigate } from 'react-router-dom'
import Card from '../../components/Card'
import { useCart } from '../../context/CartContext'
import { menuItemById } from '../../mock/menuItems'
import { vendorById } from '../../mock/vendors'
import { slotById } from '../../mock/pickupSlots'

export default function Cart() {
  const { lines, setQty, remove, selectedSlot, clear } = useCart()
  const navigate = useNavigate()

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-lg text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-slate-100 text-3xl">🛒</span>
        <h1 className="mt-4 text-2xl font-bold text-slate-900">Your cart is empty</h1>
        <p className="mt-1 text-sm text-slate-500">Browse stalls and add what you want for later pickup.</p>
        <Link
          to="/stalls"
          className="mt-5 inline-block rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Browse stalls
        </Link>
      </div>
    )
  }

  const linesWithDetails = lines.map((l) => {
    const item = menuItemById(l.item_id)
    return { ...l, item, subtotal: l.quantity * (item?.unit_price || 0), vendor: item ? vendorById(item.vendor_id) : null }
  })

  const vendors = [...new Set(linesWithDetails.map((l) => l.vendor?.stall_name).filter(Boolean))]
  const total = linesWithDetails.reduce((s, l) => s + l.subtotal, 0)
  const safeToCheckout = vendors.length <= 1

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex items-baseline justify-between">
        <h1 className="text-2xl font-bold text-slate-900">My Cart</h1>
        <button onClick={clear} className="text-sm font-medium text-slate-500 hover:text-red-600">
          Clear cart
        </button>
      </div>

      {vendors.length > 1 && (
        <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-700">
          Your cart has items from {vendors.join(' and ')}. An order belongs to one stall only — checkout
          per stall.
        </p>
      )}

      <Card className="mt-5">
        {linesWithDetails.map((l) => (
          <div key={l.item_id} className="flex items-center gap-4 border-b border-slate-100 py-3 last:border-0">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-slate-100 text-xl">{l.item?.image}</span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-slate-900">{l.item?.name}</p>
              <p className="text-xs text-slate-500">
                {l.vendor?.stall_name} · ₱{l.unit_price.toFixed(2)} each
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-1.5 py-1">
              <button onClick={() => setQty(l.item_id, l.quantity - 1)} className="px-2 text-slate-600 hover:text-brand-600">
                −
              </button>
              <span className="w-6 text-center text-sm font-semibold">{l.quantity}</span>
              <button onClick={() => setQty(l.item_id, l.quantity + 1)} className="px-2 text-slate-600 hover:text-brand-600">
                +
              </button>
            </div>

            <p className="w-20 text-right text-sm font-semibold text-slate-900">₱{l.subtotal.toFixed(2)}</p>
            <button onClick={() => remove(l.item_id)} className="text-slate-400 hover:text-red-600">
              ✕
            </button>
          </div>
        ))}
      </Card>

      <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-500">
            Pickup slot:{' '}
            {selectedSlot ? (
              <span className="font-semibold text-slate-800">
                {slotById(selectedSlot.slot_id)?.label} · {slotById(selectedSlot.slot_id)?.start_time}–
                {slotById(selectedSlot.slot_id)?.end_time}
              </span>
            ) : (
              <span className="text-slate-400">not selected yet</span>
            )}
          </p>
          <p className="mt-1 text-xl font-bold text-slate-900">Total ₱{total.toFixed(2)}</p>
        </div>
        <button
          disabled={!safeToCheckout || !selectedSlot}
          onClick={() => navigate('/checkout')}
          className="rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {!selectedSlot ? 'Pick a slot first' : 'Proceed to checkout'}
        </button>
      </div>
    </div>
  )
}