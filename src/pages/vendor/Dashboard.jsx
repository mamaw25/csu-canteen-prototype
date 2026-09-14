import { Link } from 'react-router-dom'
import Card from '../../components/Card'
import { ordersByVendor } from '../../mock/orders'
import { menuByVendor } from '../../mock/menuItems'
import { slotsByVendor } from '../../mock/pickupSlots'
import { useAuth } from '../../context/AuthContext'
import { vendorForUser } from './vendorSession'

export default function Dashboard() {
  const { currentUser } = useAuth()
  const vendor = vendorForUser(currentUser)

  if (!vendor) return <p className="text-slate-500">Vendor not found.</p>

  const orders = ordersByVendor(vendor.vendor_id)
  const items = menuByVendor(vendor.vendor_id)
  const slots = slotsByVendor(vendor.vendor_id)

  const active = orders.filter((o) => o.status !== 'CLAIMED')
  const ready = orders.filter((o) => o.status === 'READY')
  const lowStock = items.filter((i) => !i.is_sold_out && i.stock_qty <= 5)
  const revenue = orders
    .filter((o) => o.status === 'CLAIMED')
    .reduce((s, o) => s + o.total, 0)

  const stats = [
    { label: 'Active orders', value: active.length, tone: 'text-brand-600' },
    { label: 'Ready for pickup', value: ready.length, tone: 'text-emerald-600' },
    { label: 'Low stock items', value: lowStock.length, tone: lowStock.length ? 'text-amber-600' : 'text-slate-500' },
    { label: "Today's revenue", value: `₱${revenue.toFixed(2)}`, tone: 'text-slate-900' },
  ]

  return (
    <div>
      <header className="mb-6 flex items-center gap-4">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-3xl">{vendor.image}</span>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{vendor.stall_name}</h1>
          <p className="text-sm text-slate-500">Vendor dashboard · {items.length} menu items · {slots.length} pickup slots</p>
        </div>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <p className="text-sm text-slate-500">{s.label}</p>
            <p className={`mt-1 text-2xl font-bold ${s.tone}`}>{s.value}</p>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-400">Low stock</h2>
          {lowStock.length > 0 ? (
            <ul className="mt-3 space-y-2">
              {lowStock.map((i) => (
                <li key={i.item_id} className="flex items-center justify-between rounded-lg bg-amber-50 px-3 py-2 text-sm">
                  <span className="font-medium text-slate-800">{i.name}</span>
                  <span className="font-semibold text-amber-700">{i.stock_qty} left</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-slate-500">All stocked up.</p>
          )}
          <Link to="/vendor/menu" className="mt-3 inline-block text-sm font-medium text-brand-600 hover:underline">
            Manage menu & stock →
          </Link>
        </Card>

        <Card>
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-400">Order queue</h2>
          <ul className="mt-3 space-y-2">
            {active.slice(0, 4).map((o) => (
              <li key={o.order_id} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm">
                <span className="font-medium text-slate-800">Order #{o.order_id}</span>
                <span className="font-semibold text-brand-700">{o.status}</span>
              </li>
            ))}
          </ul>
          <Link to="/vendor/orders" className="mt-3 inline-block text-sm font-medium text-brand-600 hover:underline">
            Open the queue →
          </Link>
        </Card>
      </div>
    </div>
  )
}