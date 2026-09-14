// Mirrors the `vendors` table from Part 4.
// 1:1 with a VENDOR user account — holds stall details only.

export const vendors = [
  {
    vendor_id: 1,
    user_id: 5,
    stall_name: "Mama's Kitchen",
    description: 'Home-style Filipino dishes cooked fresh every lunch break.',
    image: '🍚',
    category: 'Rice & Silog',
    is_active: true,
    verified: true,
  },
  {
    vendor_id: 2,
    user_id: 6,
    stall_name: 'Ate Nena Grill',
    description: 'Inihaw skewers, grilled plates, and sizzling favorites.',
    image: '🍢',
    category: 'Grill & Inihaw',
    is_active: true,
    verified: true,
  },
  {
    vendor_id: 3,
    user_id: 7,
    stall_name: 'Kanto Noodles',
    description: 'Hot noodles, lumpiang, and merienda ulam partners.',
    image: '🍜',
    category: 'Noodles & Snacks',
    is_active: true,
    verified: false,
  },
]

export const VENDORS = vendors

export function vendorById(id) {
  return vendors.find((v) => v.vendor_id === Number(id))
}