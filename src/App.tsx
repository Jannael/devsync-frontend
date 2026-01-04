import { Route, Routes } from 'react-router'
import Login from './pages/Login'
import ValidateLoginCode from './pages/VerifyLoginCode'

function App() {
	return (
		<Routes>
			<Route index></Route>
			<Route element={<Login />} path='/login'></Route>
			<Route element={<ValidateLoginCode />} path='/login/verify'></Route>
			<Route path='/signup'></Route>
			<Route path='/changeAccount'></Route>
			<Route path='/createGroup'></Route>
			<Route path='/forgotPwd'></Route>
			<Route path='/groupInfo'></Route>
		</Routes>
	)
}

export default App
