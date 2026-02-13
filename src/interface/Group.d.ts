interface Group {
	_id: string
	name: string
	color: string
	repository: string
}

export interface UserGroupList {
	groupId: string
	role: string
}

export default Group
