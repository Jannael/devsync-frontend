import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'
import { ROUTES } from './constant/Route.constant'

const HomePage = lazy(() => import('./page/home/Home'))

//todo: loading component

function App() {
	return (
		<Suspense fallback={<div>Loading...</div>}> 
			<Routes>
				<Route element={<HomePage />} path={ROUTES.HOME} />
			</Routes>
		</Suspense>
	)
}

export default App
