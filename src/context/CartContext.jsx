import { createContext, useContext, useState } from 'react'

// Client-side cart. In the real app this becomes
// POST /api/orders (with row-level locking on stock).

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [lines, setLines] = useState([])
  const [selectedSlot, setSelectedSlot] = useState(null)

  function add(item, quantity = 1) {
    setLines((prev) => {
      const existing = prev.find((l) => l.item_id === item.item_id)
      if (existing) {
        return prev.map((l) =>
          l.item_id === item.item_id ? { ...l, quantity: l.quantity + quantity } : l,
        )
      }
      return [...prev, { item_id: item.item_id, quantity, unit_price: item.unit_price }]
    })
  }

  function setQty(itemId, quantity) {
    if (quantity <= 0) {
      setLines((prev) => prev.filter((l) => l.item_id !== itemId))
      return
    }
    setLines((prev) =>
      prev.map((l) => (l.item_id === itemId ? { ...l, quantity } : l)),
    )
  }

  function remove(itemId) {
    setLines((prev) => prev.filter((l) => l.item_id !== itemId))
  }

  function clear() {
    setLines([])
    setSelectedSlot(null)
  }

  // The vendor of every cart line must match, since an order belongs to one vendor.
  function vendorsInCart(itemsById) {
    const set = new Set()
    lines.forEach((l) => {
      const item = itemsById(l.item_id)
      if (item) set.add(item.vendor_id)
    })
    return [...set]
  }

  return (
    <CartContext.Provider
      value={{
        lines,
        selectedSlot,
        setSelectedSlot,
        add,
        setQty,
        remove,
        clear,
        vendorsInCart,
        total(linesWithPrice) {
          return linesWithPrice.reduce((sum, l) => sum + l.subtotal, 0)
        },
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}