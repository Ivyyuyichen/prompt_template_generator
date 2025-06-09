// DomainSetup.jsx
import React, { useState } from "react";

export default function DomainSetup({ expanded, setExpanded }) {
  const [fields, setFields] = useState([
    {
      id: 1,
      checked: false,
      name: "main_metric_1",
      description: "here is the short description",
      isEditing: false,
    },
    {
      id: 2,
      checked: false,
      name: "{supporting_metric_1}",
      description: "here is the short description",
      isEditing: false,
    },
  ]);
  const [nextId, setNextId] = useState(3);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleEdit = (id) => {
    setFields((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, isEditing: true, tempName: f.name, tempDesc: f.description } : f
      )
    );
  };

  const handleSave = (id) => {
    setFields((prev) =>
      prev.map((f) =>
        f.id === id
          ? { ...f, name: f.tempName, description: f.tempDesc, isEditing: false }
          : f
      )
    );
  };

  const handleCancel = (id) => {
    setFields((prev) =>
      prev.map((f) => (f.id === id ? { ...f, isEditing: false } : f))
    );
  };

  const handleDelete = (id) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
  };

  const addNewField = () => {
    setFields((prev) => [
      ...prev,
      {
        id: nextId,
        checked: false,
        name: "",
        description: "",
        isEditing: true,
        tempName: "",
        tempDesc: "",
      },
    ]);
    setNextId(nextId + 1);
  };

  const toggleCheck = (id) => {
    setFields((prev) =>
      prev.map((f) => (f.id === id ? { ...f, checked: !f.checked } : f))
    );
  };

  return (
    <div className="border p-4 rounded-md shadow-sm bg-white">
      <div
        className="cursor-pointer text-lg font-bold mb-2 flex justify-between items-center"
        onClick={toggleExpand}
      >
        <span>Domain set up</span>
        <span>{expanded ? "▲" : "▼"}</span>
      </div>

      {expanded && (
        <div className="space-y-4">
          {fields.map((field) => (
            <div key={field.id} className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={field.checked}
                onChange={() => toggleCheck(field.id)}
              />
              {field.isEditing ? (
                <div className="flex flex-col w-full gap-1">
                  <input
                    className="border p-1 w-full"
                    value={field.tempName}
                    onChange={(e) =>
                      setFields((prev) =>
                        prev.map((f) =>
                          f.id === field.id ? { ...f, tempName: e.target.value } : f
                        )
                      )
                    }
                    placeholder="Field name"
                  />
                  <input
                    className="border p-1 w-full"
                    value={field.tempDesc}
                    onChange={(e) =>
                      setFields((prev) =>
                        prev.map((f) =>
                          f.id === field.id ? { ...f, tempDesc: e.target.value } : f
                        )
                      )
                    }
                    placeholder="Optional description"
                  />
                  <div className="flex gap-2">
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                      onClick={() => handleSave(field.id)}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-300 px-2 py-1 rounded"
                      onClick={() => handleCancel(field.id)}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-red-400 text-white px-2 py-1 rounded"
                      onClick={() => handleDelete(field.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex-1">
                  <div className="font-medium">{field.name}</div>
                  {field.description && (
                    <div className="text-sm text-gray-600">{field.description}</div>
                  )}
                  <button
                    className="text-blue-500 text-sm mt-1 underline"
                    onClick={() => handleEdit(field.id)}
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          ))}
          <button
            className="mt-2 bg-green-500 text-white px-3 py-1 rounded"
            onClick={addNewField}
          >
            + Add new field
          </button>
        </div>
      )}
    </div>
  );
}
