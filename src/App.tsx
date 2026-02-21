import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'
import Loading from './component/ui/Loading.ui'
import { ROUTES } from './constant/Route.constant'

const HomePage = lazy(() => import('./page/home/Home.page'))
const LoginPage = lazy(() => import('./page/Login.page'))
const MainPage = lazy(() => import('./page/Main.page'))
const SettingsPage = lazy(() => import('./page/Settings.page'))
const GroupPage = lazy(() => import('./page/Group.page'))

//todo: loading component

function App() {
	return (
		<Suspense fallback={<Loading />}>
			<Routes>
				<Route element={<HomePage />} path={ROUTES.HOME} />
				<Route element={<LoginPage />} path={ROUTES.LOGIN} />
				<Route element={<MainPage />} path={ROUTES.MAIN} />
				<Route element={<SettingsPage />} path={ROUTES.SETTINGS} />
				<Route element={<GroupPage />} path={ROUTES.GROUP_SETTINGS} />
			</Routes>
		</Suspense>
	)
}

export default App
