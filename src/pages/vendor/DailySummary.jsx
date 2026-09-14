import Card from '../../components/Card'
import { useAuth } from '../../context/AuthContext'
import { vendorForUser } from './vendorSession'
import { ordersByVendor } from '../../mock/orders'
import { itemsForOrder } from '../../mock/orderItems'
import { menuItemById } from '../../mock/menuItems'

// Daily figures. DECIMAL money everywhere — never float.
export default function DailySummary() {
  const { currentUser } = useAuth()
  const vendor = vendorForUser(currentUser)

  if (!vendor) return <p className="text-slate-500">Vendor not found.</p>

  const orders = ordersByVendor(vendor.vendor_id)
  const claimed = orders.filter((o) => o.status === 'CLAIMED')
  const totalRevenue = claimed.reduce((s, o) => s + o.total, 0)

  // Top sellers from CLAIMED receipts (uses copied unit_price per line).
  const itemSums = {}
  claimed.forEach((o) => {
    ;(o.order_lines || itemsForOrder(o.order_id)).forEach((l) => {
      const item = menuItemById(l.item_id)
      if (!item) return
      itemSums[item.item_id] = itemSums[item.item_id] || { name: item.name, image: item.image, qty: 0, amount: 0 }
      itemSums[item.item_id].qty += l.quantity
      itemSums[item.item_id].amount += l.unit_price * l.quantity
    })
  })
  const top = Object.values(itemSums).sort((a, b) => b.qty - a.qty).slice(0, 4)

  const stats = [
    { label: 'Orders today', value: orders.length },
    { label: 'Completed (claimed)', value: claimed.length },
    { label: 'Revenue', value: `₱${totalRevenue.toFixed(2)}` },
    {
      label: 'Average order',
      value: claimed.length ? `₱${(totalRevenue / claimed.length).toFixed(2)}` : '—',
    },
  ]

  return (
    <div className="mx-auto max-w-4xl">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Daily Summary</h1>
        <p className="mt-1 text-sm text-slate-500">
          {vendor.stall_name} · today's close-out. Reflects orders that were actually claimed.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <p className="text-sm text-slate-500">{s.label}</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{s.value}</p>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <h2 className="text-sm font-bold uppercase tracking-wide text-slate-400">Top sellers</h2>
        {top.length > 0 ? (
          <ul className="mt-3 space-y-2">
            {top.map((t, i) => (
              <li key={t.name} className="flex items-center gap-3 rounded-lg bg-slate-50 px-3 py-2">
                <span className="w-5 text-center text-sm font-bold text-slate-400">{i + 1}</span>
                <span className="text-lg">{t.image}</span>
                <span className="flex-1 font-medium text-slate-800">{t.name}</span>
                <span className="text-sm text-slate-500">{t.qty} sold</span>
                <span className="text-sm font-semibold text-slate-900">₱{t.amount.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-slate-500">No sales yet today.</p>
        )}
      </Card>

      <Card className="mt-5 text-sm text-slate-500">
        <p>
          <strong className="text-slate-700">Why claimed orders only?</strong> PENDING, PREPARING, and READY
          orders haven't been handed over yet — counting them would inflate today's revenue.
        </p>
      </Card>
    </div>
  )
}