// Mirrors the `pickup_slots` table from Part 4.
// Time windows per vendor with capacity and booked_count.

export const pickupSlots = [
  // Mama's Kitchen (vendor_id 1)
  { slot_id: 1, vendor_id: 1, label: '12:00 PM', start_time: '12:00', end_time: '12:15', capacity: 15, booked_count: 9 },
  { slot_id: 2, vendor_id: 1, label: '12:15 PM', start_time: '12:15', end_time: '12:30', capacity: 15, booked_count: 15 },
  { slot_id: 3, vendor_id: 1, label: '12:30 PM', start_time: '12:30', end_time: '12:45', capacity: 15, booked_count: 11 },
  { slot_id: 4, vendor_id: 1, label: '12:45 PM', start_time: '12:45', end_time: '13:00', capacity: 15, booked_count: 4 },

  // Ate Nena Grill (vendor_id 2)
  { slot_id: 5, vendor_id: 2, label: '12:00 PM', start_time: '12:00', end_time: '12:15', capacity: 12, booked_count: 6 },
  { slot_id: 6, vendor_id: 2, label: '12:15 PM', start_time: '12:15', end_time: '12:30', capacity: 12, booked_count: 1 },
  { slot_id: 7, vendor_id: 2, label: '12:30 PM', start_time: '12:30', end_time: '12:45', capacity: 12, booked_count: 8 },
  { slot_id: 8, vendor_id: 2, label: '12:45 PM', start_time: '12:45', end_time: '13:00', capacity: 12, booked_count: 12 },

  // Kanto Noodles (vendor_id 3)
  { slot_id: 9,  vendor_id: 3, label: '12:00 PM', start_time: '12:00', end_time: '12:15', capacity: 15, booked_count: 2 },
  { slot_id: 10, vendor_id: 3, label: '12:15 PM', start_time: '12:15', end_time: '12:30', capacity: 15, booked_count: 10 },
  { slot_id: 11, vendor_id: 3, label: '12:30 PM', start_time: '12:30', end_time: '12:45', capacity: 15, booked_count: 13 },
  { slot_id: 12, vendor_id: 3, label: '12:45 PM', start_time: '12:45', end_time: '13:00', capacity: 15, booked_count: 0 },
]

export const PICKUP_SLOTS = pickupSlots

export function slotsByVendor(vid) {
  return pickupSlots.filter((s) => s.vendor_id === Number(vid))
}

export function slotById(id) {
  return pickupSlots.find((s) => s.slot_id === Number(id))
}