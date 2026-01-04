import { Route, Routes } from 'react-router'
import Login from './pages/Login'

function App() {
	return (
		<Routes>
			<Route index></Route>
			<Route element={<Login />} path='/login'></Route>
			<Route path='/signup'></Route>
			<Route path='/changeAccount'></Route>
			<Route path='/createGroup'></Route>
			<Route path='/forgotPwd'></Route>
			<Route path='/groupInfo'></Route>
		</Routes>
	)
}

export default App
