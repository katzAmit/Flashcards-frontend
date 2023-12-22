import { DifficultyLevelEnum } from "../components/Card/types";

export type FlashCard = {
  id: number;
  category: string;
  question: string;
  answer: string;
  difficulty_level: DifficultyLevelEnum;
};

export type MarathonType = {
  marathon_id: string,
  category: string
  total_days: number;
  current_day: number;
};
