// Mirrors the `menu_items` table from Part 4.
// Stock lives here (stock_qty + is_sold_out). unit_price is DECIMAL, never float.

export const menuItems = [
  // ------- Mama's Kitchen (vendor_id 1) -------
  { item_id: 101, vendor_id: 1, name: 'Chicken Adobo',        description: 'Braised chicken in soy-vinegar glaze, garlic rice.',   unit_price: 55,  stock_qty: 20, is_sold_out: false, image: '🍗' },
  { item_id: 102, vendor_id: 1, name: 'Pork Sinigang',        description: 'Tangy tamarind soup with pork and kangkong.',          unit_price: 60,  stock_qty: 15, is_sold_out: false, image: '🍲' },
  { item_id: 103, vendor_id: 1, name: 'Tapsilog',             description: 'Tapa, garlic rice, and fried egg.',                    unit_price: 65,  stock_qty: 20, is_sold_out: false, image: '🥩' },
  { item_id: 104, vendor_id: 1, name: 'Bangus with Egg',      description: 'Boneless bangus, rice, and sunny-side egg.',            unit_price: 70,  stock_qty: 1,  is_sold_out: false, image: '🐟' },
  { item_id: 105, vendor_id: 1, name: 'Pinakbet',             description: 'Sautéed vegetables with bagoong and pork.',             unit_price: 50,  stock_qty: 0,  is_sold_out: true,  image: '🥬' },

  // ------- Ate Nena Grill (vendor_id 2) -------
  { item_id: 201, vendor_id: 2, name: 'Pork BBQ Skewer',      description: 'Sweet-and-savory pork skewer, 2 sticks.',              unit_price: 60,  stock_qty: 25, is_sold_out: false, image: '🍢' },
  { item_id: 202, vendor_id: 2, name: 'Liempo Plate',         description: 'Grilled pork belly with soy-sinamak dip.',             unit_price: 85,  stock_qty: 12, is_sold_out: false, image: '🥓' },
  { item_id: 203, vendor_id: 2, name: 'Chicken Inasal',       description: 'Char-grilled chicken, annatto marinade.',              unit_price: 75,  stock_qty: 18, is_sold_out: false, image: '🍗' },
  { item_id: 204, vendor_id: 2, name: 'Sizzling Sisig',       description: 'Chopped pork sisig on a sizzling plate, egg on top.',  unit_price: 90,  stock_qty: 8,  is_sold_out: false, image: '🥘' },
  { item_id: 205, vendor_id: 2, name: 'Isaw Bbq',             description: 'Grilled chicken intestine skewers, 3 sticks.',         unit_price: 25,  stock_qty: 40, is_sold_out: false, image: '🍡' },

  // ------- Kanto Noodles (vendor_id 3) -------
  { item_id: 301, vendor_id: 3, name: 'Beef Mami',            description: 'Beef noodle soup with egg and chicharon.',             unit_price: 65,  stock_qty: 15, is_sold_out: false, image: '🍜' },
  { item_id: 302, vendor_id: 3, name: 'Pancit Canton',        description: 'Stir-fried canton noodles with veggies and pork.',     unit_price: 55,  stock_qty: 18, is_sold_out: false, image: '🍝' },
  { item_id: 303, vendor_id: 3, name: 'Lumpiang Shanghai',    description: 'Crispy spring rolls with sweet chili dip, 6 pcs.',     unit_price: 40,  stock_qty: 22, is_sold_out: false, image: '🥟' },
]

export const MENU_ITEMS = menuItems

export function menuByVendor(vid) {
  return menuItems.filter((m) => m.vendor_id === Number(vid))
}

export function menuItemById(id) {
  return menuItems.find((m) => m.item_id === Number(id))
}