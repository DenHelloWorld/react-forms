import { create } from 'zustand';

export type SubmissionData = {
  id: string;
  name: string;
  age: number;
  email: string;
  gender: string;
  country: string;
  image: string;
  createdAt: number;
};

export type CountryObject = {
  name: string;
  flag: string;
};

export type FormSubmissionPayload = Omit<SubmissionData, 'id' | 'createdAt'>;

type FormState = {
  successfulSubmissions: SubmissionData[];
  countries: CountryObject[];
  addSubmission: (data: FormSubmissionPayload) => void;
};

export const useFormStore = create<FormState>((set) => ({
  successfulSubmissions: [],

  countries: [
    { name: 'Algeria', flag: '🇩🇿' },
    { name: 'Argentina', flag: '🇦🇷' },
    { name: 'Australia', flag: '🇦🇺' },
    { name: 'Austria', flag: '🇦🇹' },
    { name: 'Belgium', flag: '🇧🇪' },
    { name: 'Brazil', flag: '🇧🇷' },
    { name: 'Canada', flag: '🇨🇦' },
    { name: 'Chile', flag: '🇨🇱' },
    { name: 'China', flag: '🇨🇳' },
    { name: 'Colombia', flag: '🇨🇴' },
    { name: 'Croatia', flag: '🇭🇷' },
    { name: 'Cuba', flag: '🇨🇺' },
    { name: 'Czechia', flag: '🇨🇿' },
    { name: 'Denmark', flag: '🇩🇰' },
    { name: 'Ecuador', flag: '🇪🇨' },
    { name: 'Egypt', flag: '🇪🇬' },
    { name: 'Estonia', flag: '🇪🇪' },
    { name: 'Finland', flag: '🇫🇮' },
    { name: 'France', flag: '🇫🇷' },
    { name: 'Georgia', flag: '🇬🇪' },
    { name: 'Germany', flag: '🇩🇪' },
    { name: 'Greece', flag: '🇬🇷' },
    { name: 'Hungary', flag: '🇭🇺' },
    { name: 'Iceland', flag: '🇮🇸' },
    { name: 'India', flag: '🇮🇳' },
    { name: 'Indonesia', flag: '🇮🇩' },
    { name: 'Ireland', flag: '🇮🇪' },
    { name: 'Israel', flag: '🇮🇱' },
    { name: 'Italy', flag: '🇮🇹' },
    { name: 'Japan', flag: '🇯🇵' },
    { name: 'Kazakhstan', flag: '🇰🇿' },
    { name: 'Kenya', flag: '🇰🇪' },
    { name: 'Luxembourg', flag: '🇱🇺' },
    { name: 'Malaysia', flag: '🇲🇾' },
    { name: 'Mexico', flag: '🇲🇽' },
    { name: 'Morocco', flag: '🇲🇦' },
    { name: 'Netherlands', flag: '🇳🇱' },
    { name: 'New Zealand', flag: '🇳🇿' },
    { name: 'Nigeria', flag: '🇳🇬' },
    { name: 'Norway', flag: '🇳🇴' },
    { name: 'Peru', flag: '🇵🇪' },
    { name: 'Philippines', flag: '🇵🇭' },
    { name: 'Poland', flag: '🇵🇱' },
    { name: 'Portugal', flag: '🇵🇹' },
    { name: 'Romania', flag: '🇷🇴' },
    { name: 'Russia', flag: '🇷🇺' },
    { name: 'Saudi Arabia', flag: '🇸🇦' },
    { name: 'Singapore', flag: '🇸🇬' },
    { name: 'Slovakia', flag: '🇸🇰' },
    { name: 'South Africa', flag: '🇿🇦' },
    { name: 'South Korea', flag: '🇰🇷' },
    { name: 'Spain', flag: '🇪🇸' },
    { name: 'Sweden', flag: '🇸🇪' },
    { name: 'Switzerland', flag: '🇨🇭' },
    { name: 'Thailand', flag: '🇹🇭' },
    { name: 'Turkey', flag: '🇹🇷' },
    { name: 'Ukraine', flag: '🇺🇦' },
    { name: 'United Arab Emirates', flag: '🇦🇪' },
    { name: 'United Kingdom', flag: '🇬🇧' },
    { name: 'United States', flag: '🇺🇸' },
    { name: 'Vietnam', flag: '🇻🇳' },
  ],

  addSubmission: (newData) => {
    set((state) => ({
      successfulSubmissions: [
        ...state.successfulSubmissions,
        {
          ...newData,
          id: crypto.randomUUID(),
          createdAt: Date.now(),
        },
      ],
    }));
  },
}));
