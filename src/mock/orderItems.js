// Mirrors the `order_items` table from Part 4.
// unit_price is COPIED onto each line so historical receipts never change
// when a vendor raises a price (design decision #3).

export const orderItems = [
  // order 1001 — Ate Nena Grill
  { order_item_id: 1, order_id: 1001, item_id: 202, quantity: 1, unit_price: 85 },
  { order_item_id: 2, order_id: 1001, item_id: 204, quantity: 1, unit_price: 90 },

  // order 1002 — Mama's Kitchen
  { order_item_id: 3, order_id: 1002, item_id: 101, quantity: 1, unit_price: 55 },
  { order_item_id: 4, order_id: 1002, item_id: 103, quantity: 1, unit_price: 65 },

  // order 1003 — Ate Nena Grill
  { order_item_id: 5, order_id: 1003, item_id: 205, quantity: 3, unit_price: 25 },

  // order 1004 — Mama's Kitchen
  { order_item_id: 6, order_id: 1004, item_id: 101, quantity: 1, unit_price: 55 },

  // order 1005 — Mama's Kitchen
  { order_item_id: 7, order_id: 1005, item_id: 103, quantity: 2, unit_price: 65 },

  // order 1006 — Kanto Noodles
  { order_item_id: 8, order_id: 1006, item_id: 303, quantity: 2, unit_price: 40 },
  { order_item_id: 9, order_id: 1006, item_id: 301, quantity: 1, unit_price: 65 },
]

export const ORDER_ITEMS = orderItems

export function itemsForOrder(orderId) {
  return orderItems.filter((oi) => oi.order_id === Number(orderId))
}