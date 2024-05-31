const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const connectDB = require('./db/dbConnection')
const User = require('./models/Schema')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const jwt = require("jsonwebtoken")
const multer = require("multer")
const crypto = require('crypto')

const app = express()
connectDB()

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, "./public/images/uploads")
    },
    filename : (req, file, cb) => {
        crypto.randomBytes(12, (err, bytes) => {
            cb(null, bytes.toString('hex') + path.extname(file.originalname))
        })
    }
})

const upload = multer({storage})

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())
app.set('view engine', 'ejs')


// app.use((req, res, next) => {
//     console.log("middleware")
//     next()
// })

// app.use((req, res, next) => {
//     console.log("this is another middleware")
//     next()
// })

// console.log(__dirname)

app.get('/',(req, res) => {
    // res.cookie('name' , "ritesh")
    res.render('')
})

app.post('/upload', upload.single("image"), (req, res) => {
    res.send('file uplaod')
})

app.get('/read', (req, res) => {
    console.log(req.cookies)
    res.send("read page")
    // bcrypt.hash('Ritesh@7767', 15, (err, hash) => {
    //     console.log(hash)
    // })

    // bcrypt.genSalt(15, (err, salt) => {
    //     // res.send(salt)
    //     bcrypt.hash("Ritesh@7767", salt, (err, hash) => {
    //         console.log(hash)
    //         res.send(salt)
    //     })
    // })

})

app.get('/login', (req, res) => {
    let token = jwt.sign({"email" : "ritesh7767@gmail.com"}, "secret")
    res.cookie("token", token)
    res.send(token)
})

app.get('/readCookies', (req, res) => {
    let data = jwt.verify(req.cookies.token, "secret")
    res.send(data)
})

// app.get('/password', (req, res) => {
    // bcrypt.compare("Ritesh@7767", )
// })

// let userPassword = "Ritesh@7767"
// let databasePassword = (bcrypt.genSalt(15, (err, salt) => {
//     bcrypt.hash(userPassword, salt, (err, hash) => {
//         return hash
//     })
// }))()

// const encryptPassword = (userPassword) => bcrypt.genSalt(15, (err, salt) => bcrypt.hash(userPassword, salt, (err, hash) => hash))

// const encryptPassword = async (userPassword) => {
//     // let salt = await bcrypt.genSalt(15, (err, salt) => {
//     //     return salt
//     // })

//     // let hash = await bcrypt.hash(userPassword, salt, (err, hash) => {
//     //     console.log(hash)
//     //     return hash
//     // })

//     let salt = await bcrypt.genSalt(15)
//     let hash = await bcrypt.hash(userPassword, salt)
//     return hash
// }

// const encryptPassword = (userPassword) => new Promise((resolve, reject) => {
//     let salt = bcrypt.genSalt(15)
//     let hash = bcrypt.hash(userPassword, salt)
//     resolve(hash)
// })

// const encryptPassword = async (userPassword) => {
//     let hash = await bcrypt.hash(userPassword, 15)
//     return hash
// }

// encryptPassword("Ritesh@7767")
// .then(hash => console.log(hash))
// .catch(err => console.log(err))


// console.log(encryptPassword("Ritesh@7767"))
// console.log(databasePassword)





// app.get('/profile/vivek', (req, res) => {
//     res.send("this is profile page vivek")
// })

// app.get('/profile/:username', (req, res) => {
//     res.send(`Welcome, ${req.params.username}`)
// })

// app.get('/profile/:username/:age', (req, res) => {
//     console.log(req.params)
//     res.send(`Welcome, ${req.params.username} of age ${req.params.age}`)
// })

// app.get('/create', async (req, res) => {
//     let userInfo = await User.create({
//         username : "vivek7767",
//         password : 'vivek@7767',
//         email : "vivek77677@outlook.com"
//     })
//     res.send(userInfo)
// })

// app.get('/update', async (req, res) => {
//     let updatedOne = await User.findOneAndUpdate({
//         username : "ritesh7767"
//     }, {
//         username : "ritesh",
//     }, {
//         new : true
//     })
//     res.send(updatedOne)
// })

// app.get('/read', async (req, res) => {
//     let result = await User.find()
//     // let result = await User.findOne()
//     // let result = await User.findOne({username : "ritesh"})
//     res.send(result)
// })

// app.get('/delete', async (req,res) => {
//     let deletedAccount = await User.findOneAndDelete()
//     res.send(deletedAccount)
// })



app.listen(3000, () => console.log('Server started'))