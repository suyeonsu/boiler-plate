const express = require('express')
const req = require('express/lib/request')
const res = require('express/lib/response')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const { User } = require('./models/User')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://suyeon:0728@boilerplate.nmqca.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World! 안녕하시렵니까-?')
})

app.post('/register', (req, res) => {

  // 회원가입 할 때 필요한 정보들을 client에서 가져오면
  // 정보들을 db에 넣어줌
  
  const user = new User(req.body)

  user.save((err, userInfo) => {
    if(err) return res.json({ success: false, err })
  return res.status(200).json({ success:true })
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})