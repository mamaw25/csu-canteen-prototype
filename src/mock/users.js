// Mirrors the `users` table from Part 4 of the onboarding guide.
// One table for everyone, separated by a `role` column.
// roles: STUDENT | VENDOR | ADMIN

export const users = [
  { user_id: 1,  email: 'a.cruz@csu.edu.ph',     full_name: 'Andrea Cruz',      role: 'STUDENT' },
  { user_id: 2,  email: 'mark.delacruz@csu.edu.ph', full_name: 'Mark Dela Cruz', role: 'STUDENT' },
  { user_id: 3,  email: 'j.ramos@csu.edu.ph',    full_name: 'Joanna Ramos',     role: 'STUDENT' },
  { user_id: 4,  email: 'kyle.santos@csu.edu.ph', full_name: 'Kyle Santos',     role: 'STUDENT' },
  { user_id: 5,  email: 'chez.magalona@stall.com', full_name: 'Chez Magalona',  role: 'VENDOR'  },
  { user_id: 6,  email: 'ate.nena@grill.com',    full_name: 'Ate Nena Reyes',  role: 'VENDOR'  },
  { user_id: 7,  email: 'kuya.ronald@somewhere.com', full_name: 'Kuya Ronald Navarro', role: 'VENDOR' },
  { user_id: 8,  email: 'admin@csu.edu.ph',      full_name: 'Admin User',       role: 'ADMIN'   },
]

export const USERS = users