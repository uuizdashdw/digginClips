import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// Type
import { UserData } from '../../types';
import CustomButton from '../button/CustomButton';

// Utils
import { handleSignOut } from '../../api/signOut';

interface HeaderProps {
	user: UserData | null;
}
const Header = ({ user }: HeaderProps) => {
	const navigate = useNavigate();
	const signOutHandler = async () => {
		const res = await handleSignOut();

		alert(res.message);
		navigate('/');
	};
	return (
		<header className="p-4">
			<nav className="flex items-center justify-between">
				<ul className="flex gap-4 items-center justify-center">
					<li>
						<Link to={'/'}>HOME</Link>
					</li>
					<li>
						<Link to={'/about'}>About</Link>
					</li>
					<li>
						<Link to={'/clips'}>Clips</Link>
					</li>
				</ul>

				<ul className="flex items-center gap-4">
					<li>
						{user && (
							<>
								<span className="text-sm font-bold">{user.displayName}</span>
								<span className="text-sm"> 님</span>
							</>
						)}
						{!user && (
							<CustomButton
								title="회원가입"
								disabled={false}
								onHandler={() => navigate('/signUp')}
							/>
						)}
					</li>
					<li>
						{user && (
							<CustomButton
								title="로그아웃"
								disabled={false}
								onHandler={signOutHandler}
							/>
						)}
						{!user && (
							<CustomButton
								title="로그인"
								disabled={false}
								onHandler={() => navigate('/signIn')}
							/>
						)}
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
