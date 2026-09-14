import { Link } from 'react-router-dom'
import Card from '../../components/Card'
import StatusBadge from '../../components/StatusBadge'
import { orders } from '../../mock/orders'
import { vendorById } from '../../mock/vendors'
import { slotById } from '../../mock/pickupSlots'
import { useAuth } from '../../context/AuthContext'

export default function OrderHistory() {
  const { currentUser } = useAuth()

  const mine = orders
    .filter((o) => o.student_id === currentUser?.user_id)
    .sort((a, b) => b.order_id - a.order_id)

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold text-slate-900">My Orders</h1>
      <p className="mt-1 text-sm text-slate-500">Every order through one shared status queue.</p>

      {mine.length === 0 ? (
        <div className="mt-10 text-center">
          <p className="text-slate-500">No orders yet.</p>
          <Link to="/stalls" className="mt-3 inline-block text-brand-600 hover:underline">
            Browse stalls
          </Link>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {mine.map((o) => {
            const vendor = vendorById(o.vendor_id)
            const slot = slotById(o.slot_id)
            return (
              <Link key={o.order_id} to={`/orders/${o.order_id}`}>
                <Card className="flex items-center gap-4 transition hover:shadow-md">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-slate-100 text-xl">
                    {vendor?.image}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-slate-900">#{o.order_id}</p>
                      <StatusBadge status={o.status} />
                    </div>
                    <p className="truncate text-sm text-slate-500">
                      {vendor?.stall_name} · {slot ? slot.label : 'no slot'} · {o.created_at}
                    </p>
                  </div>
                  <p className="text-sm font-bold text-slate-900">₱{o.total.toFixed(2)}</p>
                </Card>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}