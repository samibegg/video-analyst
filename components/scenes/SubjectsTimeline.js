// /components/scenes/SubjectsTimeline.js

import React, { useState, useMemo } from 'react';
import { FiUsers, FiUser, FiClock, FiSearch, FiMale, FiFemale } from 'react-icons/fi';

// A reusable tag for consistent styling
const Tag = ({ children, className, icon: Icon }) => (
  <span className={`inline-flex items-center text-xs font-medium mr-2 px-2.5 py-1 rounded-full ${className}`}>
    {Icon && <Icon className="mr-1.5 h-3 w-3" />}
    {children}
  </span>
);

// Helper function to extract the start time from the timestamp string for sorting
const getStartTime = (timestampStr) => {
  if (!timestampStr) return Infinity;
  const match = timestampStr.match(/(\d{2}):(\d{2})/);
  if (!match) return Infinity;
  return parseInt(match[1], 10) * 60 + parseInt(match[2], 10);
};

// Component for an individual subject card within the timeline
const SubjectCard = ({ subject, isSubMember = false }) => (
  <div className={`bg-white rounded-lg p-4 border ${isSubMember ? 'border-indigo-200 shadow-sm' : 'border-gray-200 shadow-md'}`}>
    <div className="flex justify-between items-start">
      <h3 className={`font-bold ${isSubMember ? 'text-base text-indigo-800' : 'text-lg text-indigo-700'}`}>
        {subject.subject_id.replace(/_/g, ' ')}
      </h3>
      <Tag className="bg-gray-100 text-gray-800" icon={FiClock}>
        {subject.location_and_timestamp}
      </Tag>
    </div>
    <div className="my-3">
      {subject.gender_presentation.toLowerCase().includes('female') && <Tag className="bg-pink-100 text-pink-800" icon={FiFemale}>{subject.gender_presentation}</Tag>}
      {subject.gender_presentation.toLowerCase().includes('male') && <Tag className="bg-blue-100 text-blue-800" icon={FiMale}>{subject.gender_presentation}</Tag>}
      <Tag className="bg-yellow-100 text-yellow-800">{subject.estimated_age_group}</Tag>
    </div>
    <div className="text-sm text-gray-600 space-y-3 mt-2">
      <div>
        <h4 className="font-semibold text-gray-800">Appearance</h4>
        <ul className="list-disc list-inside pl-1 mt-1 space-y-1">
          <li>{subject.appearance_details.clothing}</li>
          {subject.appearance_details.footwear !== "Indistinct." && <li>Footwear: {subject.appearance_details.footwear}</li>}
          {subject.appearance_details.accessories && <li>Accessories: {subject.appearance_details.accessories}</li>}
          {subject.appearance_details.hair?.startsWith('Covered') && <li className="italic">{subject.appearance_details.hair}</li>}
        </ul>
      </div>
      <div>
        <h4 className="font-semibold text-gray-800">Actions & Behavior</h4>
        <p>{subject.actions_and_behavior}</p>
      </div>
    </div>
  </div>
);

// Main Timeline Component
export default function SubjectsTimeline({ data }) {
  const [searchTerm, setSearchTerm] = useState('');

  // useMemo will process and sort the data only when the input 'data' changes.
  const processedSubjects = useMemo(() => {
    // Find the family group and its members
    const familyGroup = data.find(s => s.subject_id === 'Family_Group_of_Three');
    const familyMemberIds = [
      'Man_in_Family_Group',
      'Woman_in_Lavender_Hijab',
      'Younger_Woman_in_White_Hijab'
    ];
    
    // Filter out the individual family members from the main list to avoid duplication
    const topLevelSubjects = data.filter(s => !familyMemberIds.includes(s.subject_id));

    // If a family group exists, add the member details to it
    if (familyGroup) {
      familyGroup.members = data.filter(s => familyMemberIds.includes(s.subject_id));
    }
    
    // Sort all top-level subjects by their appearance time
    return topLevelSubjects.sort((a, b) => getStartTime(a.location_and_timestamp) - getStartTime(b.location_and_timestamp));
  }, [data]);

  const filteredSubjects = processedSubjects.filter(subject => {
    const subjectString = JSON.stringify(subject).toLowerCase();
    return subjectString.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="bg-gray-50 font-sans p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto">
        {/* Header and Search */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center text-2xl font-bold text-gray-800 mb-4 md:mb-0">
              <FiUsers className="mr-3 text-indigo-600" />
              <h2>Human Subjects Timeline</h2>
            </div>
            <div className="relative w-full md:w-2/5">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search subjects by clothing, action, etc..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Timeline */}
        {filteredSubjects.length > 0 ? (
          <div className="relative pl-8">
            {/* The vertical timeline bar */}
            <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-300" aria-hidden="true"></div>
            
            <div className="space-y-12">
              {filteredSubjects.map(subject => (
                <div key={subject.subject_id} className="relative">
                  {/* Timeline Dot */}
                  <div className="absolute left-4 top-5 -ml-1.5 h-3 w-3 rounded-full bg-indigo-600 border-2 border-white"></div>
                  <div className="ml-8">
                    {/* Special card for the family group */}
                    {subject.subject_id === 'Family_Group_of_Three' ? (
                      <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200 shadow-sm">
                        <SubjectCard subject={subject} />
                        <div className="mt-4 pl-4 border-l-2 border-indigo-200 space-y-4">
                          <h4 className="font-semibold text-indigo-900">Group Members:</h4>
                          {subject.members.map(member => <SubjectCard key={member.subject_id} subject={member} isSubMember={true} />)}
                        </div>
                      </div>
                    ) : (
                      <SubjectCard subject={subject} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16 text-gray-500 bg-white rounded-lg shadow-md">
            <p className="mb-2 text-xl font-semibold">No subjects found matching your search.</p>
            <button onClick={() => setSearchTerm('')} className="text-indigo-600 hover:underline">Clear Search Filter</button>
          </div>
        )}
      </div>
    </div>
  );
}