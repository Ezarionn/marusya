export const formatRuntime = (runtime: number): string => {

  const hours = Math.floor(runtime / 60)
  const mins = runtime % 60

  return `${hours} ч ${mins} мин`
}