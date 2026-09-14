import { Link } from 'react-router-dom'
import { vendors } from '../../mock/vendors'
import { menuByVendor } from '../../mock/menuItems'
import { slotsByVendor } from '../../mock/pickupSlots'

function stallStats(vid) {
  const items = menuByVendor(vid)
  const slots = slotsByVendor(vid)
  const soldOut = items.filter((i) => i.is_sold_out).length
  const availableSlots = slots.filter((s) => s.booked_count < s.capacity).length
  return { itemCount: items.length, soldOut, availableSlots }
}

export default function StallList() {
  const active = vendors.filter((v) => v.is_active)

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Browse Stalls</h1>
        <p className="mt-1 text-sm text-slate-500">
          Pick a stall, check the live menu, and reserve a pickup time within your 15-minute break.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {active.map((v) => {
          const stats = stallStats(v.vendor_id)
          return (
            <Link
              key={v.vendor_id}
              to={`/stalls/${v.vendor_id}`}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand-400 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-2xl">
                  {v.image}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Open
                </span>
              </div>

              <h2 className="mt-3 text-lg font-bold text-slate-900 group-hover:text-brand-700">
                {v.stall_name}
              </h2>
              <p className="mt-1 text-sm text-slate-500">{v.description}</p>

              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <span className="rounded-lg bg-slate-100 px-2 py-1 font-medium text-slate-600">
                  {stats.itemCount} items
                </span>
                {stats.availableSlots > 0 ? (
                  <span className="rounded-lg bg-sky-100 px-2 py-1 font-medium text-sky-700">
                    {stats.availableSlots} slots free
                  </span>
                ) : (
                  <span className="rounded-lg bg-amber-100 px-2 py-1 font-medium text-amber-700">
                    Slots full
                  </span>
                )}
                {stats.soldOut > 0 && (
                  <span className="rounded-lg bg-slate-100 px-2 py-1 font-medium text-slate-500">
                    {stats.soldOut} sold out
                  </span>
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}