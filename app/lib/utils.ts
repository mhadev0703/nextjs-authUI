export function formatToTimeAgo(date: string): string {
  const dayInMs = 1000 * 60 * 60 * 24;
  const time = new Date(date).getTime();
  const now = new Date().getTime();
  const diff = Math.round((time - now) / dayInMs);

  const formatter = new Intl.RelativeTimeFormat("ko");

  return formatter.format(diff, "days");
}

/**
 * arr 이 배열이고 길이가 0이 아니라면 참
 */
export function isValidArray<T>(arr: T[] | undefined | null): arr is Array<T> {
  return Array.isArray(arr) && arr.length !== 0;
}
