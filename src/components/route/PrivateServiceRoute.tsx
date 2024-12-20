import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserData } from '../../types';

interface PrivateRouteProps {
	element: React.ReactElement; // 렌더링할 요소
	user: UserData | null; // 사용자 데이터
	requireSignUp?: boolean;
}

const PrivateServiceRoute = ({
	element,
	user,
	requireSignUp,
}: PrivateRouteProps) => {
	console.log('로그인 상태:: ', user);

	// 회원가입한 사용자만 접근할 수 있도록 설정
	if (requireSignUp && !user) {
		alert('회원가입이 필요한 서비스입니다.');
		return <Navigate to={'/signUp'} replace />;
	}

	// 모든 조건을 통과한 경우 렌더링
	return element;
};

export default PrivateServiceRoute;
