const Block = ({ children }) => {
    return (
        <div className="my-4 text-blueGray-500 text-lg leading-relaxed">
            <div className="p-4 my-4 border-s-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800">
                <div className="text-sm italic font-medium leading-relaxed text-gray-900 dark:text-white">{children}</div>
            </div>
        </div>
    )
}

export default Block;