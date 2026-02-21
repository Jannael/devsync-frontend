export const MEMBER_KEYS = {
	ALL: ['member'] as const,
	LIST: (groupId: string) => ['member', 'list', groupId] as const,
}
