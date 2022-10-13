const
mongoose = require('mongoose'),
{Schema} = require('mongoose'),
passportLocalMongoose = require('passport-local-mongoose')
model = new Schema({
	
	name:{
		first:{
			type: String,
			required: true
		},
		last:{
			type: String,
			required: true
		},
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	phoneNumber: {
		type: String,
		required: true,
		unique: true
	},
	balance: {
		type: Number
	}

});

model.virtual('fullname').get(function() {
	return `${this.name.first} ${this.name.last}`	
})

model.plugin(passportLocalMongoose, {
	usernameField: "email"
})

module.exports = mongoose.model('User', model)