import { DifficultyLevelEnum } from "../components/Card/types";

export type FlashCard = {
  id: number;
  category: string;
  question: string;
  answer: string;
  difficulty_level: DifficultyLevelEnum;
  is_auto: number;
};

export type MarathonType = {
  marathon_id: string;
  category: string;
  total_days: number;
  current_day: number;
};
