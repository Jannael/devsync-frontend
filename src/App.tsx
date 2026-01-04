import { Route, Routes } from 'react-router'
import Login from './pages/Login'
import ValidateLoginCode from './pages/VerifyLoginCode'
import { routesConst } from './routes.constants'

function App() {
	return (
		<Routes>
			<Route index></Route>
			<Route element={<Login />} path={routesConst.login}></Route>
			<Route element={<ValidateLoginCode />} path={routesConst.verifyLogin}></Route>
			<Route path={routesConst.signup}></Route>
			<Route path={routesConst.changeAccount}></Route>
			<Route path={routesConst.createGroup}></Route>
			<Route path={routesConst.forgotPwd}></Route>
			<Route path={routesConst.groupInfo}></Route>
		</Routes>
	)
}

export default App
