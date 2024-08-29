import { tmpdir } from 'os';
import * as path from 'path';
import * as fs from 'fs';

const tmpPath = path.resolve(tmpdir());

export const saveBase64TempFileUtil = (
  fileName: string,
  base64String: string,
) => {
  const tmpFilePath = path.join(tmpPath, fileName);

  fs.writeFileSync(tmpFilePath, Buffer.from(base64String, 'base64'));

  return tmpFilePath;
};
