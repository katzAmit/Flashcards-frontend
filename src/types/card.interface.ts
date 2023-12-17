export type FlashCard = {
  id: number;
  category: string;
  question: string;
  answer: string;
  difficulty_level: string;
};

export type MarathonType = {
  id: number;
  category: string;
  total_days: number;
  current_day: number;
};
