import { useState } from 'react';

const SkillCard = ({ skill, onEndorse, isEditMode }) => {
  const [isEndorsing, setIsEndorsing] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  const handleEndorse = async () => {
    if (isEndorsing || isEditMode) return;

    setIsEndorsing(true);
    setShowAnimation(true);

    try {
      await onEndorse(skill._id);
      
      // Reset animation after it completes
      setTimeout(() => {
        setShowAnimation(false);
      }, 600);
    } catch (error) {
      console.error('Error endorsing skill:', error);
    } finally {
      setIsEndorsing(false);
    }
  };

  return (
    <div className="card p-4 flex items-center justify-between group">
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800 text-lg">{skill.name}</h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm text-gray-600">
            {skill.endorsements} {skill.endorsements === 1 ? 'endorsement' : 'endorsements'}
          </span>
          {showAnimation && (
            <span className="text-primary-600 text-sm font-medium animate-pulse">
              +1
            </span>
          )}
        </div>
      </div>

      {!isEditMode && (
        <button
          onClick={handleEndorse}
          disabled={isEndorsing}
          className={`
            px-4 py-2 rounded-lg font-medium transition-all duration-200
            ${isEndorsing 
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
              : 'bg-primary-600 text-white hover:bg-primary-700 active:scale-95 shadow-sm hover:shadow-md'
            }
          `}
        >
          {isEndorsing ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle 
                  className="opacity-25" 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="4"
                  fill="none"
                />
                <path 
                  className="opacity-75" 
                  fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Endorsing...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" 
                />
              </svg>
              Endorse
            </span>
          )}
        </button>
      )}
    </div>
  );
};

export default SkillCard;
