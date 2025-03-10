import mongoose from 'mongoose';

export const addressSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  }, // Add validation
  addressLine1: {
    type: String,
    required: true,
  },
  addressLine2: {
    type: String,
  },
  ward: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
    default: 'Vietnam',
  }, // Default value
  postalCode: {
    type: String,
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
  coordinates: {
    // Optional: GeoJSON Point for location
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      default: [0, 0], // Default to [0, 0] or a specific location
    },
  },
});

// Create a 2dsphere index on coordinates if you use it
addressSchema.index({ coordinates: '2dsphere' });

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: [100, 'Name too long'],
    },
    email: {
      type: String,
      required: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
    },
    password: {
      type: String,
      required: true,
    },
    addresses: {
      type: [addressSchema],
      default: [],
    },
  },
  { miniminze: false, timestamps: true }
);

const userModel = mongoose.model('User', userSchema);

export default userModel;
