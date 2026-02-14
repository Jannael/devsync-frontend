import { Route, Routes } from 'react-router'
import { ROUTES } from './constant/Route.constant'
import HomePage from './page/Home'

function App() {
	return (
		<Routes>
			<Route element={<HomePage />} path={ROUTES.HOME} />
		</Routes>
	)
}

export default App
