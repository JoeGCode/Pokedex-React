export default function getURLSearchParam(param: string): string | null {
  const params = new URLSearchParams(document.location.search);
  const value = params.get(param);
  return value;
}
