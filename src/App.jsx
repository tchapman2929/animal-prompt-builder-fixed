import React, { useState } from 'react';

const Button = ({ children, ...props }) => (
  <button
    className="px-4 py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all duration-200 shadow"
    {...props}
  >
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
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-4xl w-full space-y-8">
        <h1 className="text-4xl font-bold text-center text-gray-800">🦍 Animal Vlog Prompt Builder</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {Object.keys(options).map((key) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 capitalize mb-1">{key}</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-300 focus:outline-none"
                value={values[key]}
                onChange={(e) => handleChange(key, e.target.value)}
                list={`${key}-options`}
              />
              <datalist id={`${key}-options`}>
                {options[key].map((option) => (
                  <option key={option} value={option} />
                ))}
              </datalist>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <Button onClick={randomizeAll}>🎲 Randomize</Button>
          <Button onClick={() => navigator.clipboard.writeText(prompt)}>
            📋 Copy Prompt
          </Button>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-800 shadow-inner">
          <h2 className="font-semibold text-lg mb-2">📜 Generated Prompt:</h2>
          <p className="whitespace-pre-wrap">{prompt}</p>
        </div>
      </div>
    </div>
  );
}
