import Profile from '../models/Profile.js';

// @desc    Get profile
// @route   GET /api/profile
// @access  Public
export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    
    if (!profile) {
      return res.status(404).json({ 
        success: false, 
        message: 'Profile not found' 
      });
    }

    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Update profile
// @route   PUT /api/profile
// @access  Public
export const updateProfile = async (req, res) => {
  try {
    const { name, bio, profilePicture, socialLinks, skills } = req.body;

    // Validation
    if (!name || !bio || !profilePicture) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, bio, and profile picture'
      });
    }

    let profile = await Profile.findOne();

    if (!profile) {
      // Create new profile if doesn't exist
      profile = await Profile.create({
        name,
        bio,
        profilePicture,
        socialLinks: socialLinks || {},
        skills: skills || []
      });
    } else {
      // Update existing profile
      profile.name = name;
      profile.bio = bio;
      profile.profilePicture = profilePicture;
      profile.socialLinks = {
        linkedin: socialLinks?.linkedin || '',
        github: socialLinks?.github || '',
        twitter: socialLinks?.twitter || ''
      };
      
      // Update skills while preserving endorsement counts for existing skills
      if (skills && Array.isArray(skills)) {
        profile.skills = skills.map(skill => {
          const existingSkill = profile.skills.find(
            s => s._id.toString() === skill._id?.toString()
          );
          return {
            _id: skill._id || undefined,
            name: skill.name,
            endorsements: existingSkill ? existingSkill.endorsements : (skill.endorsements || 0)
          };
        });
      }

      await profile.save();
    }

    res.status(200).json({
      success: true,
      data: profile,
      message: 'Profile updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Endorse a skill
// @route   PATCH /api/profile/endorse/:skillId
// @access  Public
export const endorseSkill = async (req, res) => {
  try {
    const { skillId } = req.params;

    const profile = await Profile.findOne();

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    const skill = profile.skills.id(skillId);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found'
      });
    }

    // Increment endorsement count
    skill.endorsements += 1;
    await profile.save();

    res.status(200).json({
      success: true,
      data: {
        skillId: skill._id,
        name: skill.name,
        endorsements: skill.endorsements
      },
      message: 'Skill endorsed successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};
