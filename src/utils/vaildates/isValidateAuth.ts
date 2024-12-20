// 이메일 형식 검증
const validateEmail = (email: string): boolean => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};

// 비밀번호 형식 검증
const validatePassword = (password: string): boolean => {
	const passwordRegex =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
	return passwordRegex.test(password);
};

// 비밀번호 일치 검증
const validatePasswordCheck = (
	password: string,
	checkPasssword: string,
): boolean => {
	return password === checkPasssword;
};

const validateUserName = (userName: string): boolean => {
	return userName.length > 2;
};

// 회원가입 폼 데이터 검증
interface ValidatedFormData {
	formData: {
		userAccount: string;
		userPassword: string;
		userName?: string;
	};
	fieldName: string;
}

const validateFormData = ({ formData, fieldName }: ValidatedFormData) => {
	if (fieldName === 'userAccount') {
		return validateEmail(formData.userAccount);
	}

	if (fieldName === 'userPassword') {
		return validatePassword(formData.userPassword);
	}

	if (formData.userName && fieldName === 'userName') {
		return validateUserName(formData.userName);
	}

	return false;
};

export { validateFormData, validatePasswordCheck };
