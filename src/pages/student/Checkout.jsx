import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../../components/Card'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import { menuItemById } from '../../mock/menuItems'
import { vendorById } from '../../mock/vendors'
import { slotById } from '../../mock/pickupSlots'
import { orders } from '../../mock/orders'

let demoOrderCounter = 9000
function nextOrderId() {
  demoOrderCounter += 1
  return demoOrderCounter
}

export default function Checkout() {
  const { lines, selectedSlot, clear } = useCart()
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  const [studentName, setStudentName] = useState('')

  const linesWithDetails = lines.map((l) => {
    const item = menuItemById(l.item_id)
    return { ...l, item, subtotal: l.quantity * (item?.unit_price || 0) }
  })
  const vendor = linesWithDetails[0]?.item
    ? vendorById(linesWithDetails[0].item.vendor_id)
    : null
  const slot = selectedSlot ? slotById(selectedSlot.slot_id) : null
  const total = linesWithDetails.reduce((s, l) => s + l.subtotal, 0)

  if (lines.length === 0) {
    return <p className="text-slate-500">Nothing to check out. Add items first.</p>
  }

  function placeOrder(e) {
    e.preventDefault()
    // Prototype "transaction": decrement stock, bump booked_count,
    // create the order at PENDING. Mirrors services/orderService.js flow.
    for (const l of linesWithDetails) {
      const item = menuItemById(l.item_id)
      if (item && !item.is_sold_out) {
        item.stock_qty = Math.max(0, item.stock_qty - l.quantity)
        if (item.stock_qty === 0) item.is_sold_out = true
      }
    }
    if (slot) slot.booked_count += 1

    const order = {
      order_id: nextOrderId(),
      student_id: currentUser?.user_id || 1,
      student_name: studentName || currentUser?.full_name,
      vendor_id: vendor?.vendor_id || 1,
      slot_id: slot?.slot_id || null,
      status: 'PENDING',
      total,
      created_at: new Date().toLocaleString('en-US', {
        hour12: false,
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
    }

    // unit_price is COPIED onto each line (design decision #3).
    const order_lines = linesWithDetails.map((l, i) => ({
      order_item_id: order.order_id * 10 + i,
      order_id: order.order_id,
      item_id: l.item_id,
      quantity: l.quantity,
      unit_price: l.unit_price,
    }))

    orders.push(order)
    order.order_lines = order_lines
    clear()
    navigate(`/orders/${order.order_id}`, { state: { fresh: true }, replace: true })
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold text-slate-900">Checkout</h1>
      <p className="mt-1 text-sm text-slate-500">
        Cash on pickup — bring exact change to {vendor?.stall_name} during your slot.
      </p>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <form onSubmit={placeOrder} className="space-y-4">
          <Card>
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-400">Pickup details</h2>
            <label className="mt-3 block text-sm font-medium text-slate-700">Your name</label>
            <input
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder={currentUser?.full_name || 'Juan Dela Cruz'}
              className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
            />
            <div className="mt-4 flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm">
              <span className="text-slate-500">Stall</span>
              <span className="font-semibold text-slate-800">{vendor?.stall_name}</span>
            </div>
            <div className="mt-2 flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm">
              <span className="text-slate-500">Pickup slot</span>
              <span className="font-semibold text-slate-800">
                {slot ? `${slot.label} (${slot.start_time}–${slot.end_time})` : '—'}
              </span>
            </div>
          </Card>

          <Card>
            <p className="text-xs text-slate-500">
              Prototype note: placing this order decrements stock and increments the slot's booked count,
              exactly like the server transaction with row-level locking.
            </p>
            <button
              type="submit"
              className="mt-3 w-full rounded-lg bg-emerald-600 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Place order · ₱{total.toFixed(2)}
            </button>
          </Card>
        </form>

        <Card>
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-400">Summary</h2>
          <div className="mt-3 space-y-2">
            {linesWithDetails.map((l) => (
              <div key={l.item_id} className="flex items-center justify-between text-sm">
                <span className="text-slate-600">
                  {l.quantity} × {l.item?.name}
                </span>
                <span className="font-medium text-slate-800">₱{l.subtotal.toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
            <span className="font-semibold text-slate-900">Total</span>
            <span className="text-lg font-bold text-slate-900">₱{total.toFixed(2)}</span>
          </div>
        </Card>
      </div>
    </div>
  )
}