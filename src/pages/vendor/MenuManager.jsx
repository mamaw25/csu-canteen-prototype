import { useState } from 'react'
import Card from '../../components/Card'
import { useAuth } from '../../context/AuthContext'
import { menuByVendor } from '../../mock/menuItems'
import { vendorForUser } from './vendorSession'

export default function MenuManager() {
  const { currentUser } = useAuth()
  const vendor = vendorForUser(currentUser)
  const [items, setItems] = useState(() => (vendor ? menuByVendor(vendor.vendor_id) : []))

  if (!vendor) return <p className="text-slate-500">Vendor not found.</p>

  function toggleSoldOut(item) {
    setItems((prev) =>
      prev.map((i) => (i.item_id === item.item_id ? { ...i, is_sold_out: !i.is_sold_out } : i)),
    )
  }

  function adjustStock(item, delta) {
    setItems((prev) =>
      prev.map((i) => {
        if (i.item_id !== item.item_id) return i
        const next = Math.max(0, i.stock_qty + delta)
        return { ...i, stock_qty: next, is_sold_out: next === 0 ? true : i.is_sold_out }
      }),
    )
  }

  return (
    <div className="mx-auto max-w-4xl">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Menu & Stock</h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage menu items for {vendor.stall_name}. Stock lives on each item; sold-out items disappear from the student cart.
        </p>
      </header>

      <Card className="overflow-hidden p-0">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-5 py-3">Item</th>
              <th className="px-3 py-3">Price</th>
              <th className="px-3 py-3">Stock</th>
              <th className="px-3 py-3">Status</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((i) => (
              <tr key={i.item_id} className="border-t border-slate-100">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-lg bg-slate-100 text-lg">{i.image}</span>
                    <div>
                      <p className={`font-semibold ${i.is_sold_out ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
                        {i.name}
                      </p>
                      <p className="text-xs text-slate-400">{i.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-3 font-medium text-slate-800">₱{i.unit_price.toFixed(2)}</td>
                <td className="px-3 py-3">
                  <div className="flex w-fit items-center gap-1 rounded-lg border border-slate-200 px-1.5 py-1">
                    <button onClick={() => adjustStock(i, -1)} className="px-1.5 text-slate-600 hover:text-brand-600" disabled={i.is_sold_out}>−</button>
                    <span className="w-6 text-center font-semibold">{i.stock_qty}</span>
                    <button onClick={() => adjustStock(i, +1)} className="px-1.5 text-slate-600 hover:text-brand-600">+</button>
                  </div>
                </td>
                <td className="px-3 py-3">
                  <button
                    onClick={() => toggleSoldOut(i)}
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      i.is_sold_out
                        ? 'bg-red-100 text-red-600'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    {i.is_sold_out ? 'SOLD OUT' : 'ACTIVE'}
                  </button>
                </td>
                <td className="px-5 py-3 text-right">
                  <button className="text-sm font-medium text-brand-600 hover:underline">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <button className="mt-5 rounded-lg border border-dashed border-brand-300 bg-brand-50 px-5 py-3 text-sm font-semibold text-brand-700 hover:bg-brand-100">
        + Add menu item
      </button>
    </div>
  )
}