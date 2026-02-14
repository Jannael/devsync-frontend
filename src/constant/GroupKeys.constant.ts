export const GROUP_KEYS = {
	ALL: ['group'] as const,
	DETAIL: (groupId: string) => ['group', 'detail', groupId] as const,
	INVITATIONS: (groupId: string) => ['group', 'invitations', groupId] as const,
}

// I'll also add a USER_KEYS here if I plan to invalidate them,
// or I can just use raw strings for now if User keys aren't defined yet.
// For now, let's keep it simple.
