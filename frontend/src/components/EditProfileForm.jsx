import { useState } from 'react';

const EditProfileForm = ({ profile, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: profile.name || '',
    bio: profile.bio || '',
    profilePicture: profile.profilePicture || '',
    socialLinks: {
      linkedin: profile.socialLinks?.linkedin || '',
      github: profile.socialLinks?.github || '',
      twitter: profile.socialLinks?.twitter || ''
    },
    skills: profile.skills?.map(skill => ({
      _id: skill._id,
      name: skill.name,
      endorsements: skill.endorsements
    })) || []
  });

  const [newSkillName, setNewSkillName] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSocialLinkChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [name]: value
      }
    }));
  };

  const handleAddSkill = () => {
    if (newSkillName.trim()) {
      setFormData(prev => ({
        ...prev,
        skills: [
          ...prev.skills,
          { name: newSkillName.trim(), endorsements: 0 }
        ]
      }));
      setNewSkillName('');
    }
  };

  const handleRemoveSkill = (index) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="card p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Basic Information</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="4"
              className="input-field resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Picture URL
            </label>
            <input
              type="url"
              name="profilePicture"
              value={formData.profilePicture}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="card p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Social Links</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              LinkedIn
            </label>
            <input
              type="url"
              name="linkedin"
              value={formData.socialLinks.linkedin}
              onChange={handleSocialLinkChange}
              className="input-field"
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              GitHub
            </label>
            <input
              type="url"
              name="github"
              value={formData.socialLinks.github}
              onChange={handleSocialLinkChange}
              className="input-field"
              placeholder="https://github.com/yourusername"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Twitter
            </label>
            <input
              type="url"
              name="twitter"
              value={formData.socialLinks.twitter}
              onChange={handleSocialLinkChange}
              className="input-field"
              placeholder="https://twitter.com/yourusername"
            />
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="card p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Skills</h3>
        
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              placeholder="Add a new skill"
              className="input-field flex-1"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="btn-primary"
            >
              Add
            </button>
          </div>

          <div className="space-y-2">
            {formData.skills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <span className="font-medium text-gray-700">{skill.name}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(index)}
                  className="text-red-600 hover:text-red-700 font-medium"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button type="submit" className="btn-primary flex-1">
          Save Changes
        </button>
        <button type="button" onClick={onCancel} className="btn-secondary flex-1">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditProfileForm;
