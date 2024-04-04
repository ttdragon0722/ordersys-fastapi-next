import Select from "./Select";
import OutputButton from "./OutputButton";

const Menu = ({menuSwitch,output}) => {
    return (
        <div className="fixed  top-0 w-full h-[10vh] bg-gradient-to-b to-transparent from-black/10 p-3 backdrop-blur-sm flex justify-end" >
            <Select />
            <OutputButton menuSwitch={menuSwitch} output={output} />
        </div>
    )
}

export default Menu;