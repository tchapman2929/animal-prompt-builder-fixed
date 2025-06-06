import React, { useState } from 'react';

const Button = ({ children, ...props }) => (
  <button className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700" {...props}>
    {children}
  </button>
);

const options = {
  creature: ["Sasquatch", "Gorilla", "Raccoon", "Wolf", "Talking Cat"],
  setting: ["dense forest", "gas station", "snowy village", "city alley", "mountain path"],
  time: ["foggy night", "sunset", "early morning", "stormy afternoon", "twilight"],
  action: [
    "eating chips and looking around nervously",
    "vlogging into a GoPro",
    "dancing alone",
    "spying on campers",
    "howling at the moon"
  ],
  style: ["National Geographic", "Wes Anderson", "horror realism", "found footage", "nature documentary"],
  camera: ["handheld shaky cam", "slow zoom", "cinematic tracking shot", "drone shot", "body cam perspective"],
  tone: ["comedic", "suspenseful", "heartwarming", "eerie", "mysterious"],
  description: ["muddy and cautious", "majestic and proud", "goofy and expressive", "tense and alert"],
  background: ["glowing mushrooms", "broken tent", "flickering neon lights", "city skyline", "birds flying overhead"]
};

function getRandomValue(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function App() {
  const [values, setValues] = useState({
    creature: "Sasquatch",
    setting: "dense forest",
    time: "sunset",
    action: "eating chips and looking around nervously",
    style: "National Geographic",
    camera: "handheld shaky cam",
    tone: "comedic",
    description: "muddy and cautious",
    background: "flickering neon lights"
  });

  const handleChange = (key, val) => {
    setValues(prev => ({ ...prev, [key]: val }));
  };

  const randomizeAll = () => {
    const newValues = {};
    Object.keys(options).forEach(key => {
      newValues[key] = getRandomValue(options[key]);
    });
    setValues(newValues);
  };

  const prompt = `A cinematic 8-second video of a ${values.creature} in a ${values.setting}, during a ${values.time}, ${values.action}. The scene is captured in the style of ${values.style}, with a ${values.camera} and a ${values.tone} tone. The ${values.creature} appears ${values.description}, and there is ${values.background} in the background.`;

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Animal Vlog Prompt Builder</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.keys(options).map(key => (
          <div key={key}>
            <label className="block mb-1 capitalize">{key}</label>
            <input
              type="text"
              className="w-full p-2 rounded border"
              value={values[key]}
              onChange={e => handleChange(key, e.target.value)}
              list={`${key}-options`}
            />
            <datalist id={`${key}-options`}>
              {options[key].map(option => (
                <option key={option} value={option} />
              ))}
            </datalist>
          </div>
        ))}
      </div>

      <div>
        <Button onClick={randomizeAll} className="mt-4 mr-2">🎲 Randomize</Button>
        <Button onClick={() => navigator.clipboard.writeText(prompt)}>
          📋 Copy Prompt
        </Button>
      </div>

      <div className="bg-gray-100 p-4 rounded text-gray-800 mt-6">
        <h2 className="font-semibold mb-2">📜 Generated Prompt:</h2>
        <p>{prompt}</p>
      </div>
    </div>
  );
}
