import React, { useEffect, useState } from "react";
import { MarathonType } from "../../../types/card.interface";
import { Marathon } from "./Marathon";
import axios from "axios";

type CurrentMarathonsLayoutProps = {
  marathons?: MarathonType[];
};

type Category = {
  category: string;
};

const CurrentMarathonsLayout: React.FC<CurrentMarathonsLayoutProps> = ({
  marathons,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedDays, setSelectedDays] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:4000/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const createMarathon = () => {
    // You can implement the logic to create a marathon with the selected category and days
    // For now, let's just log the selected values
    console.log("Selected Category:", selectedCategory);
    console.log("Selected Days:", selectedDays);
  };

  return (
    <div className="mb-3">
      <div className="current-marathons-layout flex flex-col mt-3 mx-auto max-w-md">
        <p className="mb-1 font-bold text-lg">Active Marathons</p>
        <div className="flex flex-col gap-1 items-center mb-8 justify-between border-1 border-indigo-500/50 rounded-3xl inline-block p-3">
          <Marathon id={1} category="Biology" total_days={6} current_day={3} />
          <Marathon id={2} category="Math" total_days={4} current_day={1} />
        </div>
      </div>
      <div className="existing-marathons-layout flex flex-col mt-3 mx-auto max-w-md">
        <p className="font-bold text-lg">Start a Marathon</p>
        <div className="border-1 border-indigo-500/50 rounded-3xl inline-block p-3">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Category
            </label>
            <select
              className="w-full border-2 border-gray-300 p-2 rounded"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((category) => (
                <option key={category.category} value={category.category}>
                  {category.category}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Number of Days
            </label>
            <input
              type="number"
              className="w-full border-2 border-gray-300 p-2 rounded"
              min="1"
              max="14"
              value={selectedDays || ""}
              onChange={(e) => setSelectedDays(parseInt(e.target.value))}
            />
          </div>
          <div className="flex justify-center">
            <button
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
              onClick={createMarathon}
              disabled={!selectedCategory || !selectedDays}
            >
              Start Marathon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentMarathonsLayout;
