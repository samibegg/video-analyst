// /components/scenes/SceneReport.js

import React, { useState } from 'react';
import { FiFilm, FiMic, FiEye, FiMapPin, FiClock, FiUsers, FiSearch } from 'react-icons/fi';

// A reusable card component for consistent styling
const Card = ({ children, className }) => (
  <div className={`bg-white shadow-md rounded-lg p-6 border border-gray-200 ${className}`}>
    {children}
  </div>
);

// A reusable tag component
const Tag = ({ children, className }) => (
  <span className={`text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full ${className}`}>
    {children}
  </span>
);

// Widget for Scene Description
const SceneDescription = ({ scene }) => (
  <Card>
    <div className="flex items-center text-2xl font-bold text-gray-800 mb-4">
      <FiFilm className="mr-3 text-indigo-600" />
      <h2>Scene Description</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-700">
      <div className="flex items-start">
        <FiMapPin className="h-5 w-5 mr-2 mt-1 text-gray-400" />
        <div>
          <h3 className="font-semibold">Location Type</h3>
          <p>{scene.location_type}</p>
        </div>
      </div>
      <div className="flex items-start">
        <FiClock className="h-5 w-5 mr-2 mt-1 text-gray-400" />
        <div>
          <h3 className="font-semibold">Time of Day</h3>
          <p>{scene.time_of_day}</p>
        </div>
      </div>
      <div className="flex items-start col-span-1 md:col-span-2 lg:col-span-3">
        <FiEye className="h-5 w-5 mr-2 mt-1 text-gray-400 flex-shrink-0" />
        <div>
          <h3 className="font-semibold">Ambiance & Camera</h3>
          <p className="mb-2">{scene.ambiance}</p>
          <p className="text-sm text-gray-500 italic">{scene.camera_movement}</p>
        </div>
      </div>
    </div>
  </Card>
);

// Widget for People Analysis (includes search and filtering)
const PeopleAnalysis = ({ people }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPeople = people.filter(person => {
    const personString = JSON.stringify(person).toLowerCase();
    return personString.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="mt-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <div className="flex items-center text-2xl font-bold text-gray-800 mb-4 md:mb-0">
          <FiUsers className="mr-3 text-indigo-600" />
          <h2>People Analysis ({filteredPeople.length} / {people.length})</h2>
        </div>
        <div className="relative w-full md:w-1/3">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search people by any attribute..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>
      
      {filteredPeople.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPeople.map(person => (
            <Card key={person.person_id} className="flex flex-col">
              <h3 className="font-bold text-lg text-indigo-700">{person.person_id.replace(/_/g, ' ')}</h3>
              <div className="my-2">
                {person.gender_presentation !== 'Unknown' && <Tag className="bg-blue-100 text-blue-800">{person.gender_presentation}</Tag>}
                {person.approximate_age_group !== 'Unknown' && <Tag className="bg-green-100 text-green-800">{person.approximate_age_group}</Tag>}
              </div>
              <div className="text-sm text-gray-600 space-y-3 mt-2 flex-grow">
                <div>
                  <h4 className="font-semibold">Appearance</h4>
                  <p>{person.appearance.clothing}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Actions & Location</h4>
                  <p>{person.actions}</p>
                  <p className="mt-1 text-xs italic text-gray-500">Location: {person.location_in_scene}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <p className="mb-2 text-lg">No people found matching your search.</p>
          <button onClick={() => setSearchTerm('')} className="text-indigo-600 hover:underline">Clear Search</button>
        </div>
      )}
    </div>
  );
};

// Widget for Audio and Other Objects
const OtherAnalysis = ({ audio, objects }) => (
  <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
    {/* Audio Analysis Section */}
    <Card>
      <div className="flex items-center text-2xl font-bold text-gray-800 mb-4">
        <FiMic className="mr-3 text-indigo-600" />
        <h2>Audio Analysis</h2>
      </div>
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-gray-700">Primary Sound</h3>
          <p className="text-gray-600">{audio.primary_sound}</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-700">Discernible Speech</h3>
          {audio.discernible_speech.length > 0 ? (
            <div className="mt-2 space-y-2">
              {audio.discernible_speech.map((speech, index) => (
                <blockquote key={index} className="border-l-4 border-indigo-200 pl-4 py-1">
                  <p className="italic text-gray-800">"{speech.quote}"</p>
                  <footer className="text-sm text-gray-500 mt-1">{speech.speaker} ({speech.language})</footer>
                </blockquote>
              ))}
            </div>
          ) : <p className="text-gray-500">None detected.</p>}
        </div>
      </div>
    </Card>

    {/* Notable Objects Section (as an Accordion) */}
    <Card>
      <div className="flex items-center text-2xl font-bold text-gray-800 mb-4">
        <FiEye className="mr-3 text-indigo-600" />
        <h2>Notable Objects</h2>
      </div>
      <div className="space-y-2">
        {objects.map((obj, index) => (
          <details key={index} className="group bg-gray-50 rounded-lg border">
            <summary className="p-4 cursor-pointer font-semibold text-gray-700 list-none flex justify-between items-center">
              {obj.object_name}
              <span className="text-indigo-500 transform transition-transform group-open:rotate-90">▶</span>
            </summary>
            <div className="p-4 border-t border-gray-200 text-gray-600">
              <p>{obj.description}</p>
            </div>
          </details>
        ))}
      </div>
    </Card>
  </div>
);


// Main component to assemble the report
export default function SceneReport({ data }) {
  if (!data) {
    return <Card><p>No data provided to generate the report.</p></Card>;
  }

  const { scene_description, people_analysis, audio_analysis, other_notable_objects } = data;

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <SceneDescription scene={scene_description} />
        <PeopleAnalysis people={people_analysis} />
        <OtherAnalysis audio={audio_analysis} objects={other_notable_objects} />
      </div>
    </div>
  );
}