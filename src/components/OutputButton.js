const OutputButton = ({output}) => {
    return (
        <button type="button" className="focus:outline-none shadow-lg text-white bg-black/90 hover:bg-white-500 focus:ring-4 focus:ring-white font-medium rounded-lg text-sm px-5 py-1 mx-1 dark:focus:ring-white/50" onClick={output}>Output</button>
    )
}

export default OutputButton;