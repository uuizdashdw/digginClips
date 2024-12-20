import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserData } from '../../types';

interface PrivateRouteProps {
	element: React.ReactElement; // 렌더링할 요소
	user: UserData | null; // 사용자 데이터
	requireSignUp?: boolean;
}

const PrivateAuthRoute = ({
	element,
	user,
	requireSignUp,
}: PrivateRouteProps) => {
	console.log('로그인 상태:: ', user);

	if (user) {
		alert('유효하지 않은 접근입니다');
		return <Navigate to="/" replace />;
	}

	// 모든 조건을 통과한 경우 렌더링
	return element;
};

export default PrivateAuthRoute;
