const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const DoctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  dob: {
    type: Date,
    required: [true, 'Date of birth is required']
  },
  nationality: {
    type: String,
    required: [true, 'Nationality is required']
  },
  contactNo: {
    type: String,
    required: [true, 'Contact number is required']
  },
  medicalLicenseNo: {
    type: String,
    required: [true, 'Medical license number is required'],
    unique: true
  },
  licenseExpiryDate: {
    type: Date,
    required: [true, 'License expiry date is required']
  },
  issuingAuthority: {
    type: String,
    required: [true, 'Issuing medical board or authority is required']
  },
  qualification: {
    type: String,
    required: [true, 'Qualification is required']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    select: false
  },
  role: {
    type: String,
    default: 'doctor'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Encrypt password using bcrypt
DoctorSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match doctor entered password to hashed password in database
DoctorSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Doctor', DoctorSchema);