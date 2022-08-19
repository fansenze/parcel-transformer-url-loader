import mime from 'mime';
import fs from 'fs';
import util from 'util';

export const read = util.promisify(fs.readFile);

export const write = util.promisify(fs.writeFile);

export const unlink = util.promisify(fs.unlink);

export async function base64(file: string, name: string): Promise<string> {
  const mimetype = mime.getType(name) || '';
  const buffer = Buffer.from(file, 'binary');
  return `data:${mimetype};base64,${buffer.toString('base64')}`;
}
