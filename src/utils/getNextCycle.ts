const MAX_CYCLE = 8;

export function getNextCycle(currentCycle: number) {
    if (currentCycle === 0) return 1;
    return currentCycle >= MAX_CYCLE ? 1 : currentCycle + 1;
}