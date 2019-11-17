import { User } from './';

interface Donator {
  user: User;
  amount: number;
  date: Date;
}

export interface Campaign {
  id: string;
  title: string;
  user: User;
  description: string;
  launchDate: Date;
  endDate: Date;
  days: number;
  goal: number;
  raised: number;
  percentFunded: number;
  img: string;
  video: string;
  donators: Donator[];
  approved: boolean | null;
}
