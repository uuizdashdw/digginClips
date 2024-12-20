interface CustomButtonProps {
	title: string;
	disabled: boolean;
	onHandler: () => void;
}

const CustomButton = ({ title, disabled, onHandler }: CustomButtonProps) => {
	return (
		<button
			disabled={disabled}
			onClick={onHandler}
			className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm 
        ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'}`}
		>
			{title}
		</button>
	);
};

export default CustomButton;
