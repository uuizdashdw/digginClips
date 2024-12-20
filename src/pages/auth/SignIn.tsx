import { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Components
import CustomButton from '../../components/button/CustomButton';

// Utils
import { validateFormData } from '../../utils/vaildates/isValidateAuth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../plugins/firebase';
import { FirebaseError } from 'firebase/app';
import useStore from '../../store';

const SignIn = () => {
	const setUser = useStore(state => state.setUser);
	const [formData, setFormData] = useState({
		userAccount: '',
		userPassword: '',
	});

	const [isValidated, setIsValidated] = useState<{
		userAccount: boolean | null;
		userPassword: boolean | null;
	}>({
		userAccount: null,
		userPassword: null,
	});

	const [isDisabled, setIsDisabled] = useState(true);

	const navigate = useNavigate();

	const handleFormData = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value,
		}));

		const result = validateFormData({ formData, fieldName: name });

		setIsValidated(prev => ({
			...prev,
			[name]: result,
		}));
	};

	// 이메일 자동완성 대응
	useEffect(() => {
		if (isValidated.userAccount === false) {
			const result = validateFormData({ formData, fieldName: 'userAccount' });
			setIsValidated(prev => ({
				...prev,
				userAccount: result,
			}));
		}
	}, [formData.userAccount]);

	// 자둉완성 대응
	useEffect(() => {
		if (isValidated.userPassword === false) {
			const result = validateFormData({ formData, fieldName: 'userPassword' });
			setIsValidated(prev => ({
				...prev,
				userPassword: result,
			}));
		}
	}, [formData.userPassword]);

	// 필드 값 유효성 검사
	useEffect(() => {
		const allValidated = Object.values(isValidated).every(
			valid => valid === true,
		);
		setIsDisabled(!allValidated);
	}, [isValidated]);

	const handleSignInError = (code: string) => {
		if (code === 'auth/user-not-found') {
			alert('존재하지 않는 이메일입니다');
		}

		if (code === 'auth/wrong-password') {
			alert('틀린 비밀번호입니다');
		}

		if (code === 'auth/invalid-email') {
			alert('유효하지 않은 이메일입니다');
		}

		navigate('/');
	};

	const onSubmitFormData = async () => {
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				formData.userAccount,
				formData.userPassword,
			);

			const user = userCredential.user;
			setUser(user);

			alert(`${user.displayName} 님, 환영합니다`);
			navigate('/');
		} catch (err) {
			if (err instanceof FirebaseError) {
				handleSignInError(err.code);
			}

			console.error(err);
			// alert('로그인 실패: ', +err);
		}
	};
	return (
		<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
					로그인
				</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<ul className="space-y-6 mb-10">
					<li>
						<label
							htmlFor="email"
							className="block text-sm/6 font-medium text-gray-900"
						>
							이메일
						</label>
						<div className="mt-2">
							<input
								type="email"
								name="userAccount"
								value={formData.userAccount}
								autoComplete="email"
								required
								onChange={e => handleFormData(e)}
								className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
							/>
							{isValidated.userAccount === false && (
								<span className="text-red-500 text-xs">
									이메일 형식을 확인해주세요
								</span>
							)}
						</div>
					</li>
					<li>
						<div className="flex items-center justify-between">
							<label
								htmlFor="password"
								className="block text-sm/6 font-medium text-gray-900"
							>
								비밀번호
							</label>
							<div className="text-sm">
								<Link
									to={'/'}
									className="font-semibold text-indigo-600 hover:text-indigo-500"
								>
									비밀번호를 잊어버리셨나요?
								</Link>
							</div>
						</div>
						<div className="mt-2">
							<input
								type="password"
								name="userPassword"
								value={formData.userPassword}
								autoComplete="current-password"
								required
								onChange={e => handleFormData(e)}
								className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
							/>
							{isValidated.userPassword === false && (
								<span className="text-red-500 text-xs">
									비밀번호를 확인해주세요
								</span>
							)}
						</div>
					</li>
				</ul>

				<div>
					<CustomButton
						title="로그인"
						disabled={isDisabled}
						onHandler={onSubmitFormData}
					/>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
