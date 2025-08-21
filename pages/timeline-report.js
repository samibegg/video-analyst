// /pages/timeline-report.js

import SubjectsTimeline from '../components/scenes/SubjectsTimeline';

// Your JSON data - this is just the array part
const subjectsData = [
  {
      "subject_id": "Woman_in_Blue_Top",
      "estimated_age_group": "Young Adult (20s-30s)",
      "gender_presentation": "Female",
      "appearance_details": {
        "clothing": "A royal blue/purple athletic-style tank top and loose-fitting white trousers.",
        "footwear": "Not clearly visible.",
        "hair": "Long brown hair tied back in a high ponytail.",
        "accessories": "Carrying a white tote bag on her right shoulder and holding a smartphone in her left hand."
      },
      "actions_and_behavior": "This individual is the initial focus of the video. She is walking forward on the sidewalk, parallel to the person filming. She is smiling and appears to be in a pleasant conversation, looking off-camera to her right.",
      "location_and_timestamp": "Visible in the foreground from 00:00 to 00:01."
    },
    {
      "subject_id": "Woman_with_Backpack",
      "estimated_age_group": "Young Adult (20s)",
      "gender_presentation": "Female",
      "appearance_details": {
        "clothing": "A black tank top and dark-colored (black or navy blue) long shorts or capri pants.",
        "footwear": "White athletic sneakers with three black stripes, consistent with the Adidas brand.",
        "hair": "Not clearly visible.",
        "accessories": "Wearing a light grey or lavender-colored backpack."
      },
      "actions_and_behavior": "Walks from right to left past the camera, looking at the vintage car in the glass display case.",
      "location_and_timestamp": "Crosses the frame from right to left between 00:01 and 00:02."
    },
    {
      "subject_id": "Man_in_Grey_T-shirt",
      "estimated_age_group": "Adult (30s-40s)",
      "gender_presentation": "Male",
      "appearance_details": {
        "clothing": "A plain, light grey t-shirt and dark grey trousers.",
        "footwear": "Grey athletic sneakers.",
        "hair": "Short dark hair.",
        "accessories": "Wearing a dark-colored baseball cap and sunglasses. He is carrying a red plastic bag in his left hand."
      },
      "actions_and_behavior": "Walks from left to right across the frame, looking ahead.",
      "location_and_timestamp": "Visible at 00:03."
    },
    {
      "subject_id": "Family_Group_of_Three",
      "estimated_age_group": "Mixed (Adults, Young Adult)",
      "gender_presentation": "Mixed (One male, two female)",
      "appearance_details": {
        "clothing": "The two women are wearing coordinated lavender/light purple outfits. The man is in casual attire.",
        "footwear": "Indistinct.",
        "hair": "The women are wearing hijabs.",
        "accessories": "The man is wearing sunglasses."
      },
      "actions_and_behavior": "This cohesive group of three walks towards the camera on the sidewalk. They appear to be tourists or a family enjoying a day in the city. Their descriptions are detailed below as individuals within the group.",
      "location_and_timestamp": "Visible walking towards the camera from 00:04 to 00:05."
    },
    {
      "subject_id": "Man_in_Family_Group",
      "estimated_age_group": "Adult (40s-50s)",
      "gender_presentation": "Male",
      "appearance_details": {
        "clothing": "A light greyish-blue short-sleeved t-shirt and dark grey cargo pants.",
        "footwear": "Dark sneakers.",
        "hair": "Short dark hair with a moustache and beard/stubble.",
        "accessories": "Wearing sunglasses and carrying a red-orange shopping bag."
      },
      "actions_and_behavior": "He walks at the front of the family group, leading the way.",
      "location_and_timestamp": "Part of the group at 00:04."
    },
    {
      "subject_id": "Woman_in_Lavender_Hijab",
      "estimated_age_group": "Adult (40s-50s)",
      "gender_presentation": "Female",
      "appearance_details": {
        "clothing": "A full-length, loose-fitting lavender/light purple abaya or dress with a matching hijab.",
        "footwear": "Indistinct.",
        "hair": "Covered by a hijab.",
        "accessories": "Carrying a dark-colored handbag."
      },
      "actions_and_behavior": "Walks alongside the man in the group.",
      "location_and_timestamp": "Part of the group at 00:04."
    },
    {
      "subject_id": "Younger_Woman_in_White_Hijab",
      "estimated_age_group": "Young Adult (Late teens - 20s)",
      "gender_presentation": "Female",
      "appearance_details": {
        "clothing": "A white hijab and a lavender/light purple top or dress that coordinates with the other woman. The word 'CHIMNEY' is partially visible on her shirt or a lanyard.",
        "footwear": "Indistinct.",
        "hair": "Covered by a hijab.",
        "accessories": "None visible."
      },
      "actions_and_behavior": "Walks between the other two members of her group, slightly behind them.",
      "location_and_timestamp": "Part of the group at 00:04."
    },
    {
      "subject_id": "Background_Pedestrians",
      "estimated_age_group": "Mixed",
      "gender_presentation": "Mixed",
      "appearance_details": {
        "clothing": "Varied summer clothing. Details are indistinct due to distance and reflections in the glass.",
        "footwear": "Indistinct.",
        "hair": "Indistinct."
      },
      "actions_and_behavior": "Numerous anonymous individuals walking on the sidewalk and across the street, both directly visible and as reflections. They contribute to the busy, urban atmosphere of the scene.",
      "location_and_timestamp": "Visible throughout the video in the background and as reflections."
    }
];

export default function TimelineReportPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center my-8 text-gray-800">Video Subject Analysis</h1>
      <SubjectsTimeline data={subjectsData} />
    </div>
  );
}