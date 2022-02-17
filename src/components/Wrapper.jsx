import { Route, Routes } from 'react-router-dom'
import LoginPage from './loginPage/LoginPage'
import SecondPage from './secondPage/SecondPage'

const Wrapper = () => {
	
	return (
		<>
			<Routes>
				<Route path='/' element={<LoginPage />} />
				<Route path={'/Hello'} element={<SecondPage />} />
			</Routes>
		</>
	)
}

export default Wrapper
