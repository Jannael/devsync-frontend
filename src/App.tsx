import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Route, Routes } from 'react-router'
import ChangeAccount from './pages/auth/ChangeAccount'
import ForgotPwd from './pages/auth/ForgotPwd'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import VerifyCode from './pages/auth/VerifyCode'
import ValidateLoginCode from './pages/auth/VerifyLoginCode'
import CreateGroup from './pages/group/CreateGroup'
import Group from './pages/group/Group'
import GroupInfo from './pages/group/GroupInfo'
import Home from './pages/Home/Home'
import Main from './pages/Main'
import CreateTask from './pages/task/CreateTask'
import SolveTask from './pages/task/SolveTask'
import { routesConst } from './routes.constants'

const queryClient = new QueryClient()

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Routes>
				<Route element={<Main />} index></Route>
				<Route element={<Group />} path={routesConst.group}></Route>
				<Route element={<GroupInfo />} path={routesConst.groupInfo}></Route>
				<Route element={<Home />} path={routesConst.home}></Route>

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
