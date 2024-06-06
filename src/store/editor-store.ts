

import { create } from 'zustand';
import axios from 'axios';
import { api } from '@/lib/api';

interface Status {
    id: number;
    description: string;
}

interface Result {
    input: string;
    expectedOutput: string;
    output: string;
    status: Status;
    time: number;
    memory: number;
}

interface OutputData {
    results: Result[];
    averageRuntime: number;
    averageMemory: number;
}

interface OutputDetails {
    output_data: OutputData;
    status: string;
}


interface CompilerStore {
  code:string,
  setCode: (code: string) => void;
  running: boolean;
  outputDetails: OutputDetails | null;
  setRunning: (running: boolean) => void;
  setOutputDetails: (outputDetails: OutputDetails | null) => void;
  handleCompile: (code: string, customInput: string, language_id: number, problemId: number, userId:number, sessionId: string) => void;
}

const useCompilerStore = create<CompilerStore>((set, get) => ({
  code: '',
  setCode: (code) => set({ code }),
  running: false,
  outputDetails: null,
  setRunning: (running) => set({ running }),
  setOutputDetails: (outputDetails) => set({ outputDetails }),
  handleCompile: async (code, customInput, language_id, problemId, userId, sessionId) => {
    const setRunning = get().setRunning;
    const setOutputDetails = get().setOutputDetails;

    setRunning(true);
    const formData = {
      languageId: language_id || 63,
      code:code,
      problemId: problemId,
      userId:userId,
      sessionId:sessionId
    
    };

    const options = {
      method: 'POST',
      url: '/api/submission', 
      params: { type: 'test' }, // Or 'submit'
      data: formData,
    };

    try {
      const response = await api.request(options);
      const results = response.data;
      console.log(results)
      setRunning(false);
      setOutputDetails(results);
    } catch (err: any) {
      let error = err.response ? err.response.data : err;
      let status = err.response?.status;
      console.log('error', error);
      console.log('status', status);

      if (status === 429) {
        console.log('too many requests', status);
      }

      setRunning(false);
      console.log('catch block...', error);
    }
  },

}));

export default useCompilerStore;
