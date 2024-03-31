"use client"
import React, { createContext, useContext, useEffect, useState } from "react";
import type { Company } from "@/types/types";
import { handleError } from "@/lib/error";

interface SourceProviderProp {
    children: React.ReactNode
}

interface SourceValue {
    src: Company[],
    setSrc: React.Dispatch<React.SetStateAction<Company[]>>,
    companySelect: string | undefined,
    setCompanySelect: React.Dispatch<React.SetStateAction<string>>,
    allCompany: string[],
    handleAdd: (companyName: string) => void,
    init: () => void
}

const sourceContext = createContext<SourceValue | null>(null);
export const useSourceContext = () => {
    return useContext(sourceContext);
}

export const SourceProvider = ({ children }: SourceProviderProp) => {
    const [src, setSrc] = useState<Company[]>([]);
    const [companySelect, setCompanySelect] = useState<string>("DEFAULT");
    const [allCompany, setAllCompany] = useState<string[]>([]);

    const init = () => {
        fetch("/api/getSourceData").then(res => res.json())
            .then((data: Company[]) => {
                setSrc(data);
                setAllCompany(data.map((company) => {
                    return company.companyName
                }));
                console.log(data);
            }).catch((reason) => {
                handleError(reason);
            });
    }

    useEffect(() => {
        init();
    }, []);

    const handleAdd = (companyName: string) => {
        console.log(companyName);
        setSrc((prev) => {
            return prev.map((company) => {
                if (company.companyName === companyName) {
                    return {
                        ...company,
                        products: [...company.products, { name: "", price: 0 }]
                    };
                }
                return company;
            })
        })
    }

    const values = {
        src, setSrc, companySelect, setCompanySelect, allCompany, handleAdd,init
    };

    return <sourceContext.Provider value={values}>{children}</sourceContext.Provider>
}
