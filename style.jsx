// AiPromptEditor.jsx
import React, { useState } from "react";
import DomainSetup from "./DomainSetup";

export default function AiPromptEditor() {
  const [tasks, setTasks] = useState([]);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);
  const [newTask, setNewTask] = useState("");
  const [outputPrompt, setOutputPrompt] = useState("");
  const [domainExpanded, setDomainExpanded] = useState(true);

  const addTask = () => {
    if (!newTask.trim()) return;
    const updatedTasks = [
      { name: newTask.trim(), content: "", lastEdited: new Date() },
      ...tasks,
    ];
    setTasks(updatedTasks);
    setNewTask("");
    setSelectedTaskIndex(0);
  };

  const updateTaskContent = (content) => {
    if (selectedTaskIndex === null) return;
    const updatedTasks = [...tasks];
    updatedTasks[selectedTaskIndex] = {
      ...updatedTasks[selectedTaskIndex],
      content,
      lastEdited: new Date(),
    };
    setTasks(updatedTasks.sort((a, b) => b.lastEdited - a.lastEdited));
  };

  return (
    <div className="flex h-screen">
      {/* Left Panel */}
      <div className="w-1/5 bg-gray-100 p-4 overflow-y-auto">
        <div className="mb-4">
          <input
            className="w-full p-2 border"
            placeholder="New Template"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />
        </div>
        {tasks.map((task, index) => (
          <div
            key={index}
            className={`p-2 mb-2 cursor-pointer border ${
              selectedTaskIndex === index ? "bg-blue-200" : "bg-white"
            }`}
            onClick={() => setSelectedTaskIndex(index)}
          >
            {task.name}
          </div>
        ))}
      </div>

      {/* Right Panel */}
      <div className="w-4/5 flex flex-col border-l">
        {/* Top 60% */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Domain Setup Toggle */}
          <DomainSetup
            expanded={domainExpanded}
            setExpanded={setDomainExpanded}
          />

          {/* Other Toggles */}
          <div className="mt-4">
            <div className="font-bold text-lg">Action set up</div>
            {/* Placeholder for future toggle options */}
          </div>
          <div className="mt-4">
            <div className="font-bold text-lg">Output Format</div>
            {/* Placeholder for future toggle options */}
          </div>
        </div>

        {/* Bottom 40% Output Prompt Box */}
        <div className="h-2/5 border-t p-4 bg-gray-50">
          <div className="font-bold mb-2">Output Prompt</div>
          <textareas
            className="w-full h-full border p-2"
            readOnly
            value={outputPrompt}
          />
        </div>
      </div>
    </div>
  );
}
