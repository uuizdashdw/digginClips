import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<header className="p-4">
			<nav>
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
			</nav>
		</header>
	);
};

export default Header;
