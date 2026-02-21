export const INVITATION_KEYS = {
	ALL: ['invitation'] as const,
	// Usually invitations are fetched via Group (group invitations)
	// or via User (user invitations).
	// We might not need a specific INVITATION_KEYS.ALL for queries
	// if they are managed by GROUP_KEYS and USER_KEYS,
	// but having a base key is good practice.
}
