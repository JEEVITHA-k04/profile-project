import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  endorsements: {
    type: Number,
    default: 0,
    min: 0
  }
});

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    bio: {
      type: String,
      required: true,
      trim: true
    },
    profilePicture: {
      type: String,
      required: true,
      trim: true
    },
    socialLinks: {
      linkedin: {
        type: String,
        trim: true,
        default: ''
      },
      github: {
        type: String,
        trim: true,
        default: ''
      },
      twitter: {
        type: String,
        trim: true,
        default: ''
      }
    },
    skills: [skillSchema]
  },
  {
    timestamps: true
  }
);

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
