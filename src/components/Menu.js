import Select from "./Select";
import OutputButton from "./OutputButton";

const Menu = ({menuSwitch,output}) => {
    return (
        <div className="fixed  bottom-0 w-full h-[12vh] bg-gradient-to-t to-transparent from-black/10 p-3 backdrop-blur-sm flex justify-end" >
            <Select />
            <OutputButton menuSwitch={menuSwitch} output={output} />
        </div>
    )
}

export default Menu;