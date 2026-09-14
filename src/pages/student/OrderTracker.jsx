import { Link, useParams } from 'react-router-dom'
import Card from '../../components/Card'
import StatusBadge from '../../components/StatusBadge'
import { orderById } from '../../mock/orders'
import { itemsForOrder } from '../../mock/orderItems'
import { menuItemById } from '../../mock/menuItems'
import { vendorById } from '../../mock/vendors'
import { slotById } from '../../mock/pickupSlots'
import { useAuth } from '../../context/AuthContext'
import { ORDER_FLOW } from '../../mock/orders'

const stepLabels = {
  PENDING: 'Placed',
  PREPARING: 'Preparing',
  READY: 'Ready for pickup',
  CLAIMED: 'Claimed',
}

export default function OrderTracker() {
  const { orderId } = useParams()
  const { currentUser } = useAuth()
  const order = orderById(orderId)

  if (!order) {
    return (
      <div className="mx-auto max-w-md text-center">
        <h1 className="text-2xl font-bold text-slate-900">Order not found</h1>
        <Link to="/orders" className="mt-3 inline-block text-brand-600 hover:underline">
          Back to my orders
        </Link>
      </div>
    )
  }

  const vendor = vendorById(order.vendor_id)
  const slot = slotById(order.slot_id)

  // Fresh orders carry their own lines; seeded orders use order_items.
  const lines = order.order_lines || itemsForOrder(order.order_id)

  const stepIndex = ORDER_FLOW.indexOf(order.status)
  const isClaimed = order.status === 'CLAIMED'
  const claimedBy = isClaimed && currentUser ? `Claimed by ${currentUser.full_name}` : null

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-baseline justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Order #{order.order_id}</h1>
        <StatusBadge status={order.status} />
      </div>
      <p className="mt-1 text-sm text-slate-500">
        Placed {order.created_at} · {vendor?.stall_name} ·{' '}
        {slot ? `Pickup ${slot.start_time}–${slot.end_time}` : 'No slot'}
      </p>

      {claimedBy && (
        <p className="mt-2 text-xs font-medium text-emerald-600">{claimedBy}</p>
      )}

      <Card className="mt-6">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Order status</p>
        <ol className="mt-4 grid grid-cols-4 gap-2">
          {ORDER_FLOW.map((step, i) => {
            const done = i <= stepIndex
            const current = i === stepIndex && !isClaimed
            return (
              <li key={step} className="text-center">
                <div
                  className={`mx-auto grid h-9 w-9 place-items-center rounded-full text-sm font-bold ${
                    done
                      ? current
                        ? 'bg-brand-600 text-white ring-4 ring-brand-100'
                        : 'bg-emerald-100 text-emerald-700'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {done ? '✓' : i + 1}
                </div>
                <p className={`mt-2 text-xs font-semibold ${done ? 'text-slate-800' : 'text-slate-400'}`}>
                  {stepLabels[step]}
                </p>
              </li>
            )
          })}
        </ol>
      </Card>

      <Card className="mt-5">
        <h2 className="text-sm font-bold uppercase tracking-wide text-slate-400">Your order</h2>
        <div className="mt-3 space-y-2">
          {lines.map((l) => {
            const item = menuItemById(l.item_id)
            return (
              <div key={l.order_item_id || l.item_id} className="flex items-center justify-between text-sm">
                <span className="text-slate-600">
                  {l.quantity} × {item?.name || `Item ${l.item_id}`}
                </span>
                <span className="font-medium text-slate-800">₱{((l.unit_price || 0) * l.quantity).toFixed(2)}</span>
              </div>
            )
          })}
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
          <span className="font-semibold text-slate-900">Total</span>
          <span className="text-lg font-bold text-slate-900">₱{order.total.toFixed(2)}</span>
        </div>
      </Card>

      {isClaimed ? (
        <p className="mt-5 text-center text-sm text-slate-500">
          Thanks for ordering! We'll see you at the next one. 🎉
        </p>
      ) : (
        <div className="mt-5 rounded-2xl border border-brand-100 bg-brand-50 p-4 text-sm text-brand-800">
          <strong>How it works:</strong> the vendor works this order in the same shared queue. When it says{' '}
          <strong>Ready for pickup</strong>, head to {vendor?.stall_name} and pay cash at the counter.
        </div>
      )}

      <Link to="/orders" className="mt-6 inline-block text-sm font-medium text-brand-600 hover:underline">
        ← Back to my orders
      </Link>
    </div>
  )
}