export function parseJson(text: string) {
  try {
    return JSON.parse(text);
  } catch (e) {
    console.warn('Invalid JSON:', text);
    throw e;
  }
}
