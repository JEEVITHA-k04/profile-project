import { useState, useEffect } from 'react';
import { getProfile, updateProfile, endorseSkill } from '../services/api';
import ProfileView from '../components/ProfileView';
import EditProfileForm from '../components/EditProfileForm';
import SkillCard from '../components/SkillCard';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch profile on mount
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProfile();
      setProfile(data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load profile');
      console.error('Error fetching profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async (updatedProfile) => {
    try {
      setIsSaving(true);
      setError(null);
      const data = await updateProfile(updatedProfile);
      setProfile(data.data);
      setIsEditMode(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
      console.error('Error updating profile:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleEndorseSkill = async (skillId) => {
    try {
      // Optimistic update
      setProfile(prevProfile => ({
        ...prevProfile,
        skills: prevProfile.skills.map(skill =>
          skill._id === skillId
            ? { ...skill, endorsements: skill.endorsements + 1 }
            : skill
        )
      }));

      // API call
      await endorseSkill(skillId);
    } catch (err) {
      // Revert on error
      await fetchProfile();
      setError(err.response?.data?.message || 'Failed to endorse skill');
      console.error('Error endorsing skill:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="card p-8 max-w-md text-center">
          <div className="text-red-600 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button onClick={fetchProfile} className="btn-primary">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            The Profile Project
          </h1>
          <p className="text-gray-600">
            Professional profile with skill endorsement system
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Content */}
        {isEditMode ? (
          <EditProfileForm
            profile={profile}
            onSave={handleSaveProfile}
            onCancel={() => setIsEditMode(false)}
          />
        ) : (
          <>
            <ProfileView
              profile={profile}
              onEdit={() => setIsEditMode(true)}
            />

            {/* Skills Section */}
            <div className="mt-8">
              <div className="card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Skills</h2>
                  <span className="text-sm text-gray-500">
                    Click "Endorse" to support a skill
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profile.skills && profile.skills.length > 0 ? (
                    profile.skills.map((skill) => (
                      <SkillCard
                        key={skill._id}
                        skill={skill}
                        onEndorse={handleEndorseSkill}
                        isEditMode={false}
                      />
                    ))
                  ) : (
                    <p className="text-gray-500 col-span-2 text-center py-8">
                      No skills added yet
                    </p>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Loading Overlay */}
        {isSaving && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
              <p className="text-gray-700 font-medium">Saving changes...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
