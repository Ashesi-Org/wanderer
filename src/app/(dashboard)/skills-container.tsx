'use client';
import React, { useState } from 'react';

type Skill = {
  name: string;
  rating: number;
};

interface SkillRatingProps {
  skills: Skill[];
}

const SkillRating: React.FC<SkillRatingProps> = ({ skills }) => {
  const [selectedRatings, setSelectedRatings] = useState<number[]>(skills.map(skill => skill.rating));

  const handleRatingChange = (index: number, rating: number) => {
    const newRatings = [...selectedRatings];
    newRatings[index] = rating;
    setSelectedRatings(newRatings);
  };

  return (
    <div className="flex flex-col space-y-4 p-4 border rounded-lg">
      {/* Header for rating points */}
      <div className="mb-4">
        <div className="grid grid-cols-12 gap-1 items-center mb-2">
          <div className="col-span-2"></div>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
            <div key={value} className="text-center">
              {value}
            </div>
          ))}
        </div>
      </div>

      {/* Skill rating items */}
      {skills.map((skill, skillIndex) => (
        <div key={skill.name} className="flex items-center space-x-4 ">
          <div className="w-40 mr-20">{skill.name}</div>
          <div className="flex-1">
            <div className="grid grid-cols-10 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                <button
                  key={value}
                  className={`w-8 h-8 rounded-full border focus:outline-none disable  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-200 ${
                    selectedRatings[skillIndex] === value
                      ? value < 6
                        ? 'bg-red-200'
                        : 'bg-green-500'
                      : 'bg-gray-200'
                  }`}
                  //   onClick={() => handleRatingChange(skillIndex, value)}
                >
                 {value}
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillRating;
