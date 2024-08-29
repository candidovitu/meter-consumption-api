import * as mimeTypes from 'mime-types';

import { FileProperties } from '../interfaces/file-type.interface';

export const getBase64FilePropertiesUtil = (
  base64String: string,
): FileProperties => {
  const mimeTypeMatch = base64String.match(
    /^data:([a-zA-Z0-9]+\/[a-zA-Z0-9.-]+);base64,/,
  );

  const mimeType = mimeTypeMatch[1];
  const extension = String(mimeTypes.extension(mimeType));
  const content = base64String.substring(mimeTypeMatch[0].length);

  return {
    mimeType,
    extension,
    base64: content,
  };
};
