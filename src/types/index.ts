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


export interface ProblemDescriptionProps {
    challenge_id?: number;
    title?: string;
    description?: string;
    difficulty?: string;
    content?: string;
    constraints?: string;
    assumptions?: string[];
    topicTags?: string[];
    similarQuestions?: string[];
    sampleTestCase?: any;
    allTestCases?: string[];
    driverCode?: string;
    hints?: string[];
    created_at?: string;
    updated_at?: string;
    loading: boolean;
}