const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan")
const cors = require('cors')
const helmet = require("helmet")
const multer = require('multer')
const path = require('path')
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/post')

dotenv.config();
const app = express();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("successfully connected to mongodb"))
  .catch((error) => console.log(error));

app.use('/images', express.static(path.join(__dirname,'public/images')))
  
app.use(cors())
app.use(morgan('common'))
app.use(helmet())
app.use(express.json())


const storage = multer.diskStorage({
  destination:(req,file, cb)=>{
    cb(null, "public/images/")
  },
  filename: (req, file, cb)=>{
    cb(null, req.body.name)
  },
})

const upload = multer({storage})

app.post('/api/upload', upload.single('file'), (req, res)=>{

  try {
    return res.status(200).send('file uploaded  successfully')
    
  } catch (error) {
    console.log(error)
    
  }

})


app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server is listening ${PORT}`);
});
