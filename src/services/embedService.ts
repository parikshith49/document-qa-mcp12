

import { embedText } from '../tools/answerTool';

export const embedQuery = async (query: string): Promise<number[]> => {
  return await embedText(query);
};
