import { ORDER_STATUS } from '../mock/orders'

const styles = {
  [ORDER_STATUS.PENDING]: 'bg-amber-100 text-amber-800 ring-amber-300',
  [ORDER_STATUS.PREPARING]: 'bg-sky-100 text-sky-800 ring-sky-300',
  [ORDER_STATUS.READY]: 'bg-emerald-100 text-emerald-800 ring-emerald-300',
  [ORDER_STATUS.CLAIMED]: 'bg-slate-200 text-slate-600 ring-slate-300',
}

const labels = {
  [ORDER_STATUS.PENDING]: 'Pending',
  [ORDER_STATUS.PREPARING]: 'Preparing',
  [ORDER_STATUS.READY]: 'Ready',
  [ORDER_STATUS.CLAIMED]: 'Claimed',
}

export default function StatusBadge({ status, className = '' }) {
  const base = `inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${styles[status] || styles[ORDER_STATUS.PENDING]} ${className}`
  return (
    <span className={base}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {labels[status] || status}
    </span>
  )
}