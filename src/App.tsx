import { Route, Routes } from 'react-router'
import ChangeAccount from './pages/ChangeAccount'
import CreateGroup from './pages/CreateGroup'
import ForgotPwd from './pages/ForgotPwd'
import Login from './pages/Login'
import Main from './pages/Main'
import Signup from './pages/Signup'
import VerifyCode from './pages/VerifyCode'
import ValidateLoginCode from './pages/VerifyLoginCode'
import { routesConst } from './routes.constants'

function App() {
	return (
		<Routes>
			<Route element={<Main />} index></Route>
			<Route path={routesConst.groupInfo}></Route>

			{/* Forms */}
			<Route element={<Login />} path={routesConst.login}></Route>
			<Route
				element={<ValidateLoginCode />}
				path={routesConst.verifyLogin}
			></Route>
			<Route
				element={<ChangeAccount />}
				path={routesConst.changeAccount}
			></Route>
			<Route element={<Signup />} path={routesConst.signup}></Route>
			<Route element={<CreateGroup />} path={routesConst.createGroup}></Route>
			<Route element={<ForgotPwd />} path={routesConst.forgotPwd}></Route>
			<Route element={<VerifyCode />} path={routesConst.verifyCode}></Route>
		</Routes>
	)
}

export default App
