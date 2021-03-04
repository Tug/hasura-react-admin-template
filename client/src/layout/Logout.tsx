import { useLogout } from 'react-admin';

interface LogoutProps {
	redirectTo: string;
}

const Logout = ({ redirectTo }: LogoutProps) => {
	const logout = useLogout();
	logout(redirectTo);

	return null;
};

export default Logout;
