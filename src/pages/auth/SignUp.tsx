// Hook, Type
import { ChangeEvent, useEffect, useState } from 'react';

// Components
import CustomButton from '../../components/button/CustomButton';
import Loading from '../../components/loading/Loading';

// Firebase Auth
import { auth } from '../../plugins/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

// Utils
import {
	validateFormData,
	validatePasswordCheck,
} from '../../utils/vaildates/isValidateAuth';
import { useNavigate } from 'react-router-dom';
import { addUserToUserList, registerUser } from '../../api/addUserToUserList';

const SignUp = () => {
	const [formData, setFormData] = useState({
		userAccount: '',
		userPassword: '',
		userName: '',
	});

	// 비밀번호 일치 확인
	const [passwordCheck, setPasswordCheck] = useState('');

	const [isValidated, setIsValidated] = useState<{
		userAccount: boolean | null;
		userPassword: boolean | null;
		passwordCheck: boolean | null;
		userName: boolean | null;
	}>({
		userAccount: null,
		userPassword: null,
		passwordCheck: null,
		userName: null,
	});

	const [isDisabled, setIsDisabled] = useState(true);
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		const allValidated = Object.values(isValidated).every(
			valid => valid === true,
		);
		setIsDisabled(!allValidated);
	}, [isValidated]);

	const handlePasswordCheck = (e: ChangeEvent<HTMLInputElement>) => {
		setPasswordCheck(e.target.value);
		const result = validatePasswordCheck(formData.userPassword, e.target.value);

		setIsValidated(prev => ({
			...prev,
			passwordCheck: result,
		}));
	};

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

	const onSubmitFormData = async () => {
		setIsLoading(true);
		try {
			const { user } = await createUserWithEmailAndPassword(
				auth,
				formData.userAccount,
				formData.userPassword,
			);

			await updateProfile(user, {
				displayName: formData.userName,
			});

			await registerUser(user, formData.userName);

			alert('회원가입이 완료되었습니다');
			navigate('/');
		} catch (err: any) {
			if (err.code === 'auth/email-already-in-use') {
				alert('사용중인 이메일입니다');
			}
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			{isLoading && <Loading />}
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
					회원가입
				</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<ul className="flex flex-col gap-6 justify-center text-sm/6 font-medium text-gray-900 mb-10">
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
								required
								autoComplete="email"
								placeholder="example@example.com"
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
						<label
							htmlFor="password"
							className="block text-sm/6 font-medium text-gray-900"
						>
							비밀번호
						</label>
						<div className="mt-2">
							<input
								type="password"
								value={formData.userPassword}
								name="userPassword"
								required
								autoComplete="current-password"
								placeholder="대문자, 소문자, 숫자, 특수문자 포함 8자 이상"
								onChange={handleFormData}
								className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
							/>
							{isValidated.userPassword === false && (
								<span className="text-red-500 text-xs">
									비밀번호 형식을 확인해주세요
								</span>
							)}
						</div>
					</li>
					<li>
						<label
							htmlFor="password"
							className="block text-sm/6 font-medium text-gray-900"
						>
							비밀번호 확인
						</label>
						<div className="mt-2">
							<input
								type="password"
								value={passwordCheck}
								name="userPassowordCheck"
								required
								autoComplete="current-password"
								onChange={e => handlePasswordCheck(e)}
								className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
							/>
							{isValidated.passwordCheck === false && (
								<span className="text-red-500 text-xs">
									비밀번호가 일치하지 않습니다.
								</span>
							)}
						</div>
					</li>
					<li>
						<label
							htmlFor="userName"
							className="block text-sm/6 font-medium text-gray-900"
						>
							이름
						</label>
						<div className="mt-2">
							<input
								type="text"
								value={formData.userName}
								name="userName"
								required
								autoComplete="off"
								onChange={e => handleFormData(e)}
								className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
							/>
							{isValidated.userName === false && (
								<span className="text-red-500 text-xs">
									이름을 입력해주세요
								</span>
							)}
						</div>
					</li>
				</ul>

				<div>
					<CustomButton
						title="회원가입"
						disabled={isDisabled}
						onHandler={onSubmitFormData}
					/>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
