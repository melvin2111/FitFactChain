const User = require('../models/User');
const Doctor = require('../models/Doctor');
const jwt = require('jsonwebtoken');

// Helper function to create and send token
const sendTokenResponse = (user, role, statusCode, res) => {
  // Create token
  const token = jwt.sign(
    { id: user._id, role },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    success: true,
    token,
    data: user
  });
};

// @desc    Register user
// @route   POST /api/auth/users/register
// @access  Public
exports.registerUser = async (req, res) => {
  try {
    const { name, email, dob, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      dob,
      password
    });

    sendTokenResponse(user, 'user', 201, res);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/users/login
// @access  Public
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    sendTokenResponse(user, 'user', 200, res);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Register doctor
// @route   POST /api/auth/doctors/register
// @access  Public
exports.registerDoctor = async (req, res) => {
  try {
    const {
      name,
      dob,
      nationality,
      contactNo,
      email,
      medicalLicenseNo,
      licenseExpiryDate,
      issuingAuthority,
      qualification,
      password
    } = req.body;

    // Check if doctor exists
    const doctorExists = await Doctor.findOne({ email });

    if (doctorExists) {
      return res.status(400).json({
        success: false,
        message: 'Doctor already exists'
      });
    }

    // Check if license is unique
    const licenseExists = await Doctor.findOne({ medicalLicenseNo });

    if (licenseExists) {
      return res.status(400).json({
        success: false,
        message: 'Medical license number already registered'
      });
    }

    // Create doctor
    const doctor = await Doctor.create({
      name,
      dob,
      nationality,
      contactNo,
      email,
      medicalLicenseNo,
      licenseExpiryDate,
      issuingAuthority,
      qualification,
      password
    });

    sendTokenResponse(doctor, 'doctor', 201, res);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Login doctor
// @route   POST /api/auth/doctors/login
// @access  Public
exports.loginDoctor = async (req, res) => {
  try {
    const { email, password, medicalLicenseNo } = req.body;

    // Check for doctor
    const doctor = await Doctor.findOne({ 
      email, 
      medicalLicenseNo 
    }).select('+password');

    if (!doctor) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if password matches
    const isMatch = await doctor.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    sendTokenResponse(doctor, 'doctor', 200, res);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get current logged in user/doctor
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: req.user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};