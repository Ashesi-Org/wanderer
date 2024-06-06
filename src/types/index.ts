import { languageOptions } from '../lib/constants';
export type Judge0SubmissionOutput = {
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


export type languageOptionsType = typeof languageOptions


export interface TestCase {
    input: string;
    output: string;
    explanation?: string;
}

export interface TestCasesProps {
    testCases: TestCase[]
}
