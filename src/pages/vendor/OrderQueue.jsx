import { useState } from 'react'
import Card from '../../components/Card'
import { useAuth } from '../../context/AuthContext'
import { vendorForUser } from './vendorSession'
import { orders, ordersByVendor, ORDER_FLOW, ORDER_STATUS } from '../../mock/orders'
import { itemsForOrder } from '../../mock/orderItems'
import { menuItemById } from '../../mock/menuItems'
import { slotById } from '../../mock/pickupSlots'
import { users } from '../../mock/users'

const nextStatus = {
  [ORDER_STATUS.PENDING]: ORDER_STATUS.PREPARING,
  [ORDER_STATUS.PREPARING]: ORDER_STATUS.READY,
}

const stepLabels = {
  PENDING: 'Pending',
  PREPARING: 'Preparing',
  READY: 'Ready',
  CLAIMED: 'Claimed',
}

export default function OrderQueue() {
  const { currentUser } = useAuth()
  const vendor = vendorForUser(currentUser)
  const [orders, setOrders] = useState(() => (vendor ? ordersByVendor(vendor.vendor_id) : []))

  if (!vendor) return <p className="text-slate-500">Vendor not found.</p>

  // Server enforces valid transitions too (PATCH /api/vendor/orders/:id/status).
  function advance(order) {
    const target = nextStatus[order.status]
    if (!target) return
    // Mutate the shared mock module so the student tracker sees the same status.
    const found = orders.find((o) => o.order_id === order.order_id)
    if (found) found.status = target
    setOrders((prev) =>
      prev.map((o) => (o.order_id === order.order_id ? { ...o, status: target } : o)),
    )
  }

  const columns = ORDER_FLOW.map((status) => ({
    status,
    orders: orders.filter((o) => o.status === status),
  }))

  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Order Queue</h1>
        <p className="mt-1 text-sm text-slate-500">
          {vendor.stall_name} · one shared status queue: PENDING → PREPARING → READY → CLAIMED
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-4">
        {columns.map((col) => (
          <div key={col.status} className="flex flex-col gap-3">
            <div className="flex items-center justify-between rounded-xl bg-slate-800 px-3 py-2 text-white">
              <span className="text-sm font-semibold">{stepLabels[col.status]}</span>
              <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-bold">{col.orders.length}</span>
            </div>

            {col.orders.length === 0 && (
              <div className="rounded-xl border border-dashed border-slate-200 px-3 py-8 text-center text-xs text-slate-400">
                No orders
              </div>
            )}

            {col.orders.map((o) => {
              const lines = o.order_lines || itemsForOrder(o.order_id)
              const student = users.find((u) => u.user_id === o.student_id)
              const slot = slotById(o.slot_id)
              return (
                <Card key={o.order_id} className="p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-slate-900">#{o.order_id}</p>
                    <span className="text-xs text-slate-400">{o.created_at}</span>
                  </div>
                  <p className="text-xs text-slate-500">{student?.full_name || `User ${o.student_id}`}</p>
                  {slot && <p className="text-xs text-slate-500">Pickup {slot.label}</p>}

                  <ul className="mt-2 space-y-1 text-sm text-slate-600">
                    {lines.map((l) => (
                      <li key={l.order_item_id || l.item_id} className="flex justify-between gap-2">
                        <span className="truncate">{l.quantity}× {menuItemById(l.item_id)?.name || `Item ${l.item_id}`}</span>
                        <span className="font-medium">₱{(l.unit_price * l.quantity).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900">₱{o.total.toFixed(2)}</span>
                    {nextStatus[o.status] ? (
                      <button
                        onClick={() => advance(o)}
                        className="rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-700"
                      >
                        Mark as {stepLabels[nextStatus[o.status]]}
                      </button>
                    ) : (
                      <span className="text-xs font-semibold text-emerald-600">Done</span>
                    )}
                  </div>
                </Card>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}