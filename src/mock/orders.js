// Mirrors the `order_status`/`orders` flow from Part 1.
// Every order moves through exactly four states:
//   PENDING → PREPARING → READY → CLAIMED

export const ORDER_STATUS = {
  PENDING: 'PENDING',
  PREPARING: 'PREPARING',
  READY: 'READY',
  CLAIMED: 'CLAIMED',
}

export const ORDER_FLOW = ['PENDING', 'PREPARING', 'READY', 'CLAIMED']

// Mirrors the `orders` table from Part 4.
// Order header: student, vendor, slot, status, total.
// total is DECIMAL, never float.

export const orders = [
  { order_id: 1001, student_id: 1, vendor_id: 2, slot_id: 6, status: 'PREPARING', total: 150, created_at: '2026-09-14 11:32' },
  { order_id: 1002, student_id: 2, vendor_id: 1, slot_id: 1, status: 'READY',     total: 120, created_at: '2026-09-14 11:40' },
  { order_id: 1003, student_id: 3, vendor_id: 2, slot_id: 7, status: 'PENDING',   total: 75,  created_at: '2026-09-14 11:45' },
  { order_id: 1004, student_id: 4, vendor_id: 1, slot_id: 2, status: 'PENDING',   total: 55,  created_at: '2026-09-14 11:50' },
  { order_id: 1005, student_id: 1, vendor_id: 1, slot_id: 3, status: 'CLAIMED',   total: 130, created_at: '2026-09-14 10:20' },
  { order_id: 1006, student_id: 2, vendor_id: 3, slot_id: 10, status: 'CLAIMED',  total: 95,  created_at: '2026-09-14 10:05' },
]

export const ORDERS = orders

export function ordersByVendor(vid) {
  return orders.filter((o) => o.vendor_id === Number(vid))
}

export function orderById(id) {
  return orders.find((o) => o.order_id === Number(id))
}

export function groupedOrders(vid) {
  const mine = ordersByVendor(vid)
  return ORDER_FLOW.map((status) => ({
    status,
    orders: mine.filter((o) => o.status === status),
  }))
}