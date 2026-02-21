export const SOLUTION_KEYS = {
	ALL: ['solution'] as const,
	DETAIL: (solutionId: string) => ['solution', 'detail', solutionId] as const,
}
