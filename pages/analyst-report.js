// /pages/analyst-report.js

import SceneReport from '../components/scenes/SceneReport';

// Your JSON data provided earlier
const sceneData = {
  "scene_description": {
    "location_type": "Modern Café / Pastry Shop (Cukrászda)",
    "ambiance": "Bright, clean, and moderately busy with a relaxed social atmosphere. The decor is minimalist with light wood floors, white walls with vertical ribbing, and modern furniture.",
    "time_of_day": "Afternoon",
    "camera_movement": "The video starts from a low, seated point-of-view and performs a slow, continuous pan from left to right, surveying the room and its occupants."
  },
"people_analysis": [
    {
      "person_id": "Person_1_Foregound",
      "approximate_age_group": "Unknown",
      "gender_presentation": "Unknown",
      "appearance": {
        "clothing": "Visible portion shows dark shorts and black Nike sneakers with a white swoosh.",
        "hair": "Not visible.",
        "accessories": "None visible."
      },
      "actions": "This person is likely holding the camera. Their leg is propped up and remains static in the foreground throughout the video, establishing the point-of-view.",
      "location_in_scene": "Seated in the immediate foreground."
    },
    {
      "person_id": "Person_2_Man_in_Black",
      "approximate_age_group": "Adult",
      "gender_presentation": "Male",
      "appearance": {
        "clothing": "Black t-shirt, light-colored (white or beige) shorts, white sneakers.",
        "hair": "Short, light brown or dark blonde hair.",
        "accessories": "A black backpack or duffel bag is resting on his lap."
      },
      "actions": "Seated on a low chair, looking down at his hands or phone, then briefly looks up towards the center of the room.",
      "location_in_scene": "Seated at a low coffee table in the left background."
    },
    {
      "person_id": "Person_3_Man_in_Green",
      "approximate_age_group": "Adult",
      "gender_presentation": "Male",
      "appearance": {
        "clothing": "Dark olive-green t-shirt, dark shorts or trousers.",
        "hair": "Short brown hair.",
        "accessories": "None visible."
      },
      "actions": "Seated in a relaxed posture, facing away from Person_2.",
      "location_in_scene": "Seated next to Person_2."
    },
    {
      "person_id": "Person_4_Man_at_Counter",
      "approximate_age_group": "Adult",
      "gender_presentation": "Male",
      "appearance": {
        "clothing": "Off-white t-shirt with a green circular graphic on the back, black shorts, grey and blue athletic sneakers.",
        "hair": "Not visible.",
        "accessories": "Wearing a dark-colored baseball cap backwards."
      },
      "actions": "Initially seated at a small round table, he gets up and walks to the service counter to interact with the staff.",
      "location_in_scene": "Moves from a central table to the service counter on the right."
    },
    {
      "person_id": "Person_5_Staff_Member",
      "approximate_age_group": "Adult",
      "gender_presentation": "Female",
      "appearance": {
        "clothing": "Dark top.",
        "hair": "Long brown hair.",
        "accessories": "None visible."
      },
      "actions": "Working behind the counter, serving Person_4.",
      "location_in_scene": "Behind the main service counter."
    },
    {
      "person_id": "Person_6_Woman_in_ZigZag",
      "approximate_age_group": "Adult",
      "gender_presentation": "Female",
      "appearance": {
        "clothing": "A distinctive black-and-white chevron (zig-zag) patterned sleeveless top, white trousers, black Adidas sneakers with white stripes.",
        "hair": "Long, dyed blonde hair.",
        "accessories": "None visible."
      },
      "actions": "Seated at a table, engaged in conversation with her companions, and takes a sip from a glass.",
      "location_in_scene": "Seated at a white table in the center-right of the room."
    },
    {
      "person_id": "Person_7_Woman_in_Orange",
      "approximate_age_group": "Adult",
      "gender_presentation": "Female",
      "appearance": {
        "clothing": "A patterned short-sleeved top with orange, pink, and yellow tones.",
        "hair": "Long brown hair.",
        "accessories": "None visible."
      },
      "actions": "Seated at the table, actively participating in a conversation.",
      "location_in_scene": "Seated across from Person_6."
    },
    {
      "person_id": "Person_8_Woman_with_Curls",
      "approximate_age_group": "Adult",
      "gender_presentation": "Female",
      "appearance": {
        "clothing": "Dark navy or black t-shirt, patterned blue skirt, grey athletic sneakers. A blue jacket is draped over the back of her chair.",
        "hair": "Voluminous, shoulder-length curly hair, possibly blonde or light brown.",
        "accessories": "None visible."
      },
      "actions": "Seated with her back mostly to the camera, engaged in conversation with her table-mates.",
      "location_in_scene": "Seated at the same table as Person_6 and Person_7."
    }
  ],
  "audio_analysis": {
    "primary_sound": "Ambient room tone with overlapping conversations ('room tone').",
    "discernible_speech": [
      { "language": "English", "quote": "Go, we have to...", "speaker": "Female voice" },
      { "language": "English", "quote": "Go!", "speaker": "Female voice, emphatically" },
      { "language": "English", "quote": "...you know what I mean?", "speaker": "Female voice" }
    ]
  },
  "other_notable_objects": [
    { "object_name": "Convex Mirror", "description": "A large, circular, convex mirror with a polished brass or gold-colored frame is a prominent decorative feature on the back wall. It distorts the reflection of the café interior." },
    { "object_name": "Wall Art", "description": "On the far right wall, there are several arched wall niches, each containing a piece of artwork depicting a saint-like figure in a traditional, religious style, contrasting with the modern decor of the café." },
    { "object_name": "Display Case", "description": "A glass display case at the service counter contains various pastries and cakes." }
  ]
};


export default function ReportPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center my-8 text-gray-800">Scene Analysis Report</h1>
      <SceneReport data={sceneData} />
    </div>
  );
}