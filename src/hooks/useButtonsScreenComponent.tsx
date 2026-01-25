import { useQueryClient } from '@tanstack/react-query'
import { useRef, useState } from 'react'
import { toast } from 'sonner'
import queryKeys from '../queryKeys'
import { routesConst } from '../routes.constants'
import verifyCodeActions from '../verifyCodeActions'
import useLogout from './auth/useLogout'
import useAddGroup from './user/useAddGroup'

function useButtonsScreenComponent() {
	const queryClient = useQueryClient()
	const currentTheme = localStorage.getItem('theme')
		? localStorage.getItem('theme')
		: window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light'
	const [changeTheme, setChangeTheme] = useState(currentTheme)
	const addGroupRef = useRef<HTMLInputElement>(null)

	const { logoutMutation } = useLogout(() => {
		window.location.href = routesConst.login
	})

	const { addGroup } = useAddGroup(() => {
		queryClient.invalidateQueries({ queryKey: [queryKeys.groupsList] })
	})

	const handleAddGroup = () => {
		if (!addGroupRef.current?.value) return
		addGroup.mutate({
			_id: addGroupRef.current!.value,
		})
	}

	const handleLogout = () => {
		logoutMutation.mutate({})
	}

	const handleChangeTheme = () => {
		const theme = changeTheme === 'dark' ? 'light' : 'dark'
		localStorage.setItem('theme', theme)
		document.documentElement.setAttribute('data-theme', theme)
		setChangeTheme(theme)
	}

	const handleDeleteUser = () => {
		window.location.href = `${routesConst.verifyCode}?action=${verifyCodeActions.deleteUser}`
	}

	if (addGroup.isError) toast.error(addGroup.error.message)
	if (logoutMutation.isError) toast.error(logoutMutation.error.message)

	return {
		addGroup,
		handleAddGroup,
		addGroupRef,
		setChangeTheme,
		changeTheme,
		handleLogout,
		handleChangeTheme,
		handleDeleteUser,
	}
}

export default useButtonsScreenComponent
