const queryKeys = {
	groupsList: 'groupsList',
	taskList: (groupId: string, page: number) => `taskList=${groupId}&page=${page}`,
	groupDetail: (groupId: string) => `group=${groupId}`,
	taskDetail: (taskId: string) => `task=${taskId}`,
}

export default queryKeys
