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

const CurrentMarathonsLayout: React.FC<CurrentMarathonsLayoutProps> = ({}) => {
  const [marathons, setMarathons] = useState<MarathonType[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedDays, setSelectedDays] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    fetchCategories();
    fetchMarathons();
  }, []);

  const fetchMarathons = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/marathon`);
      setMarathons(res.data);
    } catch (error) {
      console.error("error fetching marathons", error);
    }
  };
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:4000/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const createMarathon = async (
    selectedCategory: string | undefined,
    selectedDays: number | undefined
  ) => {
    try {
      const response = await axios.post("http://localhost:4000/marathon", {
        category: selectedCategory,
        total_days: selectedDays,
      });
      if (!selectedCategory || !selectedDays) {
        console.error("BAD BAD BAD");
        return;
      }
      const marathon_id = response.data;
      const newMarathon: MarathonType = {
        marathon_id: marathon_id,
        category: selectedCategory,
        total_days: selectedDays,
        current_day: 0,
      };

      setMarathons((prevMarathons) => {
        if (!prevMarathons) {
          return [newMarathon];
        }
        return [...prevMarathons, newMarathon];
      });

      console.log("Marathon added successfully");
      await fetchMarathons();
    } catch (error) {
      console.error("Error adding marathon", error);
    }
  };

  return (
    <div className="mb-3">
      <div className="current-marathons-layout flex flex-col mt-3 mx-auto max-w-md">
        <p className="mb-1 font-bold text-lg">Active Marathons</p>
        <div className="flex flex-col gap-1 items-center mb-8 justify-between border-1 border-indigo-500/50 rounded-3xl inline-block p-3">
          {marathons ? (
            marathons.map((marathon: MarathonType) => (
              <Marathon
                key={marathon.marathon_id}
                marathon_id={marathon.marathon_id}
                category={marathon.category}
                total_days={marathon.total_days}
                current_day={marathon.current_day}
              />
            ))
          ) : (
            <p>None</p>
          )}
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
              onClick={() => createMarathon(selectedCategory, selectedDays)}
              disabled={!selectedCategory || !selectedDays}
            >
              Create Marathon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentMarathonsLayout;
