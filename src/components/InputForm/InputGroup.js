import { useEffect, useState } from "react";
import FunctionButton from "./FunctionButton";
import NumberInput from "./NumberInput";

const InputGroup = ({ data: { name, price },value,setTemp,idx}) => {
    const setAmount = (v) => {
        setTemp(idx,v);
    }

    return (
        <div className="product w-1/2 my-3">
            <div className="mb-1">
                <div className="product-name font-bold">{name}</div>
                <div className="product-price text-sm after:content-['$']">{price}</div>
            </div>
            <div>
                <FunctionButton direction="left" amount={value} setAmount={setAmount}>-</FunctionButton>
                <NumberInput amount={value} setAmount={setAmount} />
                <FunctionButton direction="right" amount={value} setAmount={setAmount}>+</FunctionButton>
            </div>
        </div>
    )
}   

export default InputGroup;