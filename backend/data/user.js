import bcrypt from 'bcryptjs'
const salt = await bcrypt.genSalt(10)
const users = [
  {
    name: 'Admin Zoheb',
    email: 'AdminZhb@gmail.com',
    password: await bcrypt.hash('knucklenakal', salt),
    confirmPassword: await bcrypt.hash('knucklenakal', salt),
    isAdmin: true,
  },
  {
    name: 'Johnny Bhai',
    email: 'JohnnyBro@gmail.com',
    password: await bcrypt.hash('123456', salt),
    confirmPassword: await bcrypt.hash('123456', salt),
  },
  {
    name: 'Taapsee pannu',
    email: 'Taapsee@gmail.com',
    password: await bcrypt.hash('123456', salt),
    confirmPassword: await bcrypt.hash('123456', salt),
  },
]
export default users
