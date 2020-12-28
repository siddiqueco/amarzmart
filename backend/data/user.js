import bcrypt from 'bcryptjs'

const user=[
    {
        name:'Admin user',
        email: 'admin@example.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:true
    },
    {
        name:'Sid rebel',
        email: 'sid@example.com',
        password:bcrypt.hashSync('123456',10),
    },
    {
        name:'Rebel sid',
        email: 'rebel@example.com',
        password:bcrypt.hashSync('123456',10),
    }
]
export default user