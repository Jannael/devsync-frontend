import { Route, Routes } from 'react-router'
import { ROUTE } from './constant/Route.constant'
import HomePage from './page/Home'

function App() {
	return (
		<Routes>
			<Route element={<HomePage />} path={ROUTE.HOME} />
		</Routes>
	)
}

export default App
