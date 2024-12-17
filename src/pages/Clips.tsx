import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Clips = () => {
	const [formData, setFormData] = useState({
		id: 1,
		clipName: '',
		clipPath: '',
		description: '',
		createdAt: new Date().toLocaleString(),
	});

	const navigate = useNavigate();

	const onChangeFormData = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value,
		}));
	};

	// 필드 값 유효성 체크
	const isFormValid = () => {
		return formData.clipName && formData.clipPath && formData.description;
	};

	const onSubmitFormData = () => {
		if (window.confirm('클립을 추가하시겠습니까?')) {
			alert('추가되었습니다');

			console.log(formData);
			navigate('/');
		}
	};
	return (
		<div className="w-full flex flex-col items-center">
			<h1 className="mb-8 text-2xl font-bold">클립 추가</h1>
			<ul className="flex flex-col items-center gap-8 w-4/12 mb-8">
				<li className="w-full">
					<label htmlFor="" className="block mb-3">
						클립 이름
					</label>
					<input
						type="text"
						name="clipName"
						value={formData.clipName}
						onChange={onChangeFormData}
						className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
					/>
				</li>
				<li className="w-full">
					<label htmlFor="" className="block mb-3">
						클립 주소
					</label>
					<input
						type="text"
						name="clipPath"
						value={formData.clipPath}
						onChange={onChangeFormData}
						className="block w-full last:rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
					/>
				</li>
				<li className="w-full">
					<label htmlFor="" className="block mb-3">
						클립 내용
					</label>
					<textarea
						name="description"
						value={formData.description}
						onChange={onChangeFormData}
						className="block w-full h-64 resize-none rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
					/>
				</li>
			</ul>
			<div className="w-4/12">
				<button
					onClick={onSubmitFormData}
					disabled={!isFormValid()}
					className={`block w-full rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm ${
						isFormValid()
							? 'bg-indigo-600 hover:bg-indigo-500'
							: 'bg-gray-400 cursor-not-allowed'
					} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
				>
					추가
				</button>
			</div>
		</div>
	);
};

export default Clips;
