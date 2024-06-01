import { create } from 'zustand';
import axios from 'axios';

interface OutputDetails {
  stdout?: string;
  stderr?: string;
  compile_output?: string;
  message?: string;
  exit_code?: number;
  exit_signal?: number;
  status?: {
    id: number;
    description: string;
  };
  created_at?: Date;
  finished_at?: Date | null;
  token?: string;
  time?: number;
  wall_time?: number;
  memory_used?: number;
}

interface CompilerStore {
  running: boolean;
  outputDetails: OutputDetails | null;
  code: string; // Add code state
  setCode: (code: string) => void; // Add setCode function
  setRunning: (running: boolean) => void;
  setOutputDetails: (outputDetails: OutputDetails | null) => void;
  handleCompile: (customInput: string, language_id?: number) => void;
  checkStatus: (token: string) => Promise<void>;
}

const useCompilerStore = create<CompilerStore>((set, get) => ({
  running: false,
  outputDetails: null,
  code: '', // Initialize code state
  setCode: (code) => set({ code }), // Implement setCode function
  setRunning: (running) => set({ running }),
  setOutputDetails: (outputDetails) => set({ outputDetails }),
  handleCompile: async (customInput, language_id) => {
    const setRunning = get().setRunning;
    const checkStatus = get().checkStatus;
    const code = get().code; // Get the code from the state

    setRunning(true);

    const formData = {
      language_id: language_id || 63,
      source_code: btoa(code),
      stdin: btoa(customInput),
    };

    const options = {
      method: 'POST',
      url: 'https://judge0-ce.p.rapidapi.com/submissions',
      params: { base64_encoded: 'true', fields: '*' },
      headers: {
        'content-type': 'application/json',
        'Content-Type': 'application/json',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
        'X-RapidAPI-Key': '0e58c401femsh4bc6914c8b658f0p1108a6jsn88ac8d898095',
      },
      data: formData,
    };

    try {
      const response = await axios.request(options);
      const token = response.data.token;
      await checkStatus(token);
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
  checkStatus: async (token) => {
    const setRunning = get().setRunning;
    const setOutputDetails = get().setOutputDetails;

    const options = {
      method: 'GET',
      url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
      params: { base64_encoded: 'true', fields: '*' },
      headers: {
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
        'X-RapidAPI-Key': '0e58c401femsh4bc6914c8b658f0p1108a6jsn88ac8d898095',
      },
    };

    try {
      const response = await axios.request(options);
      const statusId = response.data.status?.id;

      if (statusId === 1 || statusId === 2) {
        setTimeout(() => {
          get().checkStatus(token);
        }, 2000);
        return;
      } else {
        setRunning(false);
        setOutputDetails(response.data);
        console.log(`Compiled Successfully!`);
        console.log('response.data', response.data);
        return;
      }
    } catch (err) {
      console.log('err', err);
      setRunning(false);
    }
  },
}));

export default useCompilerStore;
