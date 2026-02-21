export const TASK_KEYS = {
	ALL: ['task'] as const,
	LIST: (groupId: string) => ['task', 'list', groupId] as const,
	DETAIL: (taskId: string) => ['task', 'detail', taskId] as const,
}
