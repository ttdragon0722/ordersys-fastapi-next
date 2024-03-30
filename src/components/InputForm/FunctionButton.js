const FunctionButton = ({ children, direction, amount, setAmount }) => {

    const click = () => {
        if (direction === "left") {
            setAmount(
                parseInt(amount) === 0 ? 0 : amount - 1
            )
        } else {
            setAmount(amount + 1);
        }
    }

    return (
        <button type="button" onClick={click} className={
            (direction === "left" ? "rounded-s-lg " : "rounded-e-lg ") +
            "px-2 py-2 text-sm font-bold text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
        }>
            {children}
        </button>
    )
}

export default FunctionButton;