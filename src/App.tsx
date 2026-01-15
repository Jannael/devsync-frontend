import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Route, Routes } from 'react-router'
import ChangeAccount from './pages/ChangeAccount'
import CreateGroup from './pages/CreateGroup'
import CreateTask from './pages/CreateTask'
import ForgotPwd from './pages/ForgotPwd'
import Group from './pages/Group'
import GroupInfo from './pages/GroupInfo'
import Login from './pages/Login'
import Main from './pages/Main'
import Signup from './pages/Signup'
import SolveTask from './pages/SolveTask'
import VerifyCode from './pages/VerifyCode'
import ValidateLoginCode from './pages/VerifyLoginCode'
import { routesConst } from './routes.constants'

const queryClient = new QueryClient()

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Routes>
				<Route element={<Main />} index></Route>
				<Route element={<Group />} path={routesConst.group}></Route>
				<Route element={<GroupInfo />} path={routesConst.groupInfo}></Route>

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
				<Route element={<SolveTask />} path={routesConst.solveTask}></Route>
				<Route element={<CreateTask />} path={routesConst.createTask}></Route>
			</Routes>
		</QueryClientProvider>
	)
}

export default App
