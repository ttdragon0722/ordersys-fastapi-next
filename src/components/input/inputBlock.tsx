"use client";
import React, { useState } from "react";

interface InputBlockProp {
    defaultValue: string | number | readonly string[] | undefined,
    type: React.HTMLInputTypeAttribute | undefined,
    className?: string | undefined,
    dataCompanyName: string,
    dataIndex: number,
    dataSetType: "name" | "price",
    required?: boolean | undefined,
    onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined,
    onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined
}

const InputBlock: React.FC<InputBlockProp> = ({ defaultValue, type, className, dataCompanyName, dataSetType, dataIndex, onChange, onBlur, required }) => {
    const [defaultV, setDefault] = useState(defaultValue);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDefault(e.target.value);
        if (onChange) {
            onChange(e);
        }
    }
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (onBlur) {
            onBlur(e);
        }
    }

    return <input
        data-company-name={dataCompanyName}
        data-index={dataIndex}
        data-set-type={dataSetType}
        className={className ? className : undefined}
        type={type} value={defaultV}
        onChange={handleChange} onBlur={handleBlur} required={required} ></input>
}

export default InputBlock;