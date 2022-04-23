const mongoose = require('mongoose');
// const validator = require('validator');
// const { default: isEmail } = require('validator/lib/isEmail');
mongoose.connect('mongodb://127.0.0.1:27017/harry', {
     useNewUrlParser: true,
     useNewUrlParser: true, 

     useUnifiedTopology: true 
}
)