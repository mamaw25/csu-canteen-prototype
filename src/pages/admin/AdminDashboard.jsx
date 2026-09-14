import { useState } from 'react'
import Card from '../../components/Card'
import { users } from '../../mock/users'
import { vendors } from '../../mock/vendors'

export default function AdminDashboard() {
  const [vendorList, setVendorList] = useState(vendors)

  const counts = {
    students: users.filter((u) => u.role === 'STUDENT').length,
    vendors: users.filter((u) => u.role === 'VENDOR').length,
    stalls: vendors.length,
    pendingVerify: vendors.filter((v) => !v.verified).length,
  }

  function toggleVerify(vid) {
    setVendorList((prev) =>
      prev.map((v) => (v.vendor_id === vid ? { ...v, verified: !v.verified } : v)),
    )
  }

  function toggleActive(vid) {
    setVendorList((prev) =>
      prev.map((v) => (v.vendor_id === vid ? { ...v, is_active: !v.is_active } : v)),
    )
  }

  const stats = [
    { label: 'Students', value: counts.students },
    { label: 'Vendors', value: counts.vendors },
    { label: 'Stalls', value: counts.stalls },
    { label: 'Awaiting verification', value: counts.pendingVerify },
  ]

  return (
    <div className="mx-auto max-w-5xl">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Admin Panel</h1>
        <p className="mt-1 text-sm text-slate-500">
          Verify vendor accounts, deactivate stalls, monitor activity.
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

      <Card className="mt-6 overflow-hidden p-0">
        <div className="border-b border-slate-100 px-5 py-3">
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-400">User accounts</h2>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-5 py-3">User</th>
              <th className="px-3 py-3">Role</th>
              <th className="px-5 py-3 text-right">Joined-ish</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.user_id} className="border-t border-slate-100">
                <td className="px-5 py-2.5">
                  <p className="font-semibold text-slate-900">{u.full_name}</p>
                  <p className="text-xs text-slate-400">{u.email}</p>
                </td>
                <td className="px-3 py-2.5">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      u.role === 'STUDENT'
                        ? 'bg-sky-100 text-sky-700'
                        : u.role === 'VENDOR'
                          ? 'bg-violet-100 text-violet-700'
                          : 'bg-slate-800 text-white'
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
                <td className="px-5 py-2.5 text-right text-slate-400">
                  {u.user_id <= 4 ? '2026-08' : '2026-09'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card className="mt-6 overflow-hidden p-0">
        <div className="border-b border-slate-100 px-5 py-3">
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-400">Stalls</h2>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-5 py-3">Stall</th>
              <th className="px-3 py-3">Verification</th>
              <th className="px-3 py-3">Status</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vendorList.map((v) => {
              const owner = users.find((u) => u.user_id === v.user_id)
              return (
                <tr key={v.vendor_id} className="border-t border-slate-100">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-lg bg-slate-100 text-lg">{v.image}</span>
                      <div>
                        <p className={`font-semibold ${v.is_active ? 'text-slate-900' : 'text-slate-400'}`}>
                          {v.stall_name}
                        </p>
                        <p className="text-xs text-slate-400">{owner?.full_name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        v.verified ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {v.verified ? 'Verified' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        v.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {v.is_active ? 'Active' : 'Deactivated'}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => toggleVerify(v.vendor_id)}
                        className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50"
                      >
                        {v.verified ? 'Unverify' : 'Verify'}
                      </button>
                      <button
                        onClick={() => toggleActive(v.vendor_id)}
                        className={`rounded-lg px-2.5 py-1 text-xs font-medium ${
                          v.is_active
                            ? 'border border-red-200 text-red-600 hover:bg-red-50'
                            : 'bg-emerald-600 text-white hover:bg-emerald-700'
                        }`}
                      >
                        {v.is_active ? 'Deactivate' : 'Activate'}
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </Card>

      <p className="mt-5 text-xs text-slate-400">
        Cascade rule shown here: deactivating a stall does not delete its menu, but deleting a stall cascades
        the deletion to its menu items (menu items are meaningless without their stall).
      </p>
    </div>
  )
}