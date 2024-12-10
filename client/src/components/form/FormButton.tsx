import Loading from "../shared/Ui/Loading";

interface ButtonProps {
    disabled: boolean;
    loading?: boolean;
    text: string;
    className?: string;
}
const FormButton = ({ disabled, text, className, loading }: ButtonProps) => {
    return (
        <button
            type="submit"
            disabled={disabled || loading}
            className={`mt-[40px] p-[16px] flex justify-center items-center text-body-18-m text-white rounded-[10px] bg-grey-500 disabled:bg-grey-200 hover:bg-grey-700 active:bg-grey-800 duration-300 ${className}`}
        >
            {loading ? <Loading size="25" /> : text}
        </button>
    );
};

export default FormButton;
