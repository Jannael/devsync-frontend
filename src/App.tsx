import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'
import { ROUTES } from './constant/Route.constant'

const HomePage = lazy(() => import('./page/home/Home.page'))
const LoginPage = lazy(() => import('./page/Login.page'))

//todo: loading component

function App() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Routes>
				<Route element={<HomePage />} path={ROUTES.HOME} />
				<Route element={<LoginPage />} path={ROUTES.LOGIN} />
			</Routes>
		</Suspense>
	)
}

export default App
