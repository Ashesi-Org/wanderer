import {create} from 'zustand';

interface ActiveChallengeStore {
  activeChallengeId: string | null;
  setActiveChallenge: (challengeId: string | null) => void;
}

export const useActiveChallengeStore = create<ActiveChallengeStore>((set) => ({
  activeChallengeId: null,
  setActiveChallenge: (challengeId) => set((state) => ({ ...state, activeChallengeId: challengeId })),
}));
