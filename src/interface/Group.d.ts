interface Group {
	_id: string
	name: string
	color: string
	repository: string
}

export interface UserGroupListItem {
	groupId: string
	role: string
	name: string
	color: string
}

export default Group
