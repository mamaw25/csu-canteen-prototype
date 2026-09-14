import { vendors } from '../../mock/vendors'
import { users } from '../../mock/users'

// Resolve the vendor row (stalls) from the logged-in VENDOR user.
// users ──1:1──> vendors, so we join on user_id.
export function vendorForUser(user) {
  if (!user) return null
  if (user.vendor_id) return vendors.find((v) => v.vendor_id === user.vendor_id)
  const u = users.find((x) => x.user_id === user.user_id)
  return u ? vendors.find((v) => v.user_id === u.user_id) : null
}