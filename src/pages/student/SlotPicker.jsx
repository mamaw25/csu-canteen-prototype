import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { vendorById } from '../../mock/vendors'
import { slotsByVendor } from '../../mock/pickupSlots'
import { useCart } from '../../context/CartContext'

export default function SlotPicker() {
  const { vendorId } = useParams()
  const navigate = useNavigate()
  const { setSelectedSlot } = useCart()

  const vendor = vendorById(vendorId)
  const slots = slotsByVendor(vendorId)

  const [chosen, setChosen] = useState(null)

  if (!vendor) return <p className="text-slate-500">Stall not found.</p>

  function confirm() {
    setSelectedSlot(chosen)
    navigate('/cart')
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold text-slate-900">Pick a pickup slot</h1>
      <p className="mt-1 text-sm text-slate-500">
        Reserve a time window at <span className="font-semibold">{vendor.stall_name}</span>. Show your
        order code at pickup — cash on pickup.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {slots.map((slot) => {
          const full = slot.booked_count >= slot.capacity
          const selected = chosen?.slot_id === slot.slot_id
          return (
            <button
              key={slot.slot_id}
              disabled={full}
              onClick={() => setChosen(slot)}
              className={`rounded-2xl border p-4 text-left transition ${
                full
                  ? 'cursor-not-allowed border-slate-200 bg-slate-50 opacity-60'
                  : selected
                    ? 'border-brand-600 bg-brand-50 ring-2 ring-brand-200'
                    : 'border-slate-200 bg-white hover:border-brand-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-slate-900">{slot.label}</span>
                {full ? (
                  <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-600">
                    Full
                  </span>
                ) : selected ? (
                  <span className="rounded-full bg-brand-600 px-2 py-0.5 text-xs font-semibold text-white">
                    Selected
                  </span>
                ) : (
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                    {slot.capacity - slot.booked_count} left
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs text-slate-500">
                {slot.start_time} – {slot.end_time} · {slot.booked_count}/{slot.capacity} booked
              </p>
            </button>
          )
        })}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          {chosen
            ? `You chose ${chosen.label} — ${chosen.start_time}–${chosen.end_time}.`
            : 'Pick the slot that fits inside your break.'}
        </p>
        <button
          onClick={confirm}
          disabled={!chosen}
          className="rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Continue to cart
        </button>
      </div>
    </div>
  )
}