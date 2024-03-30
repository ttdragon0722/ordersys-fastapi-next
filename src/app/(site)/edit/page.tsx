"use client";
import { v4 } from 'uuid';
import Container from "@/components/container/container";
import { SourceProvider, useSourceContext } from "@/context/sourceData";
import React, { useEffect, useState } from "react";
import type { Company } from "@/types/types";
import InputBlock from '@/components/input/inputBlock';

const EditPage = () => {
    const srcContext = useSourceContext();
    let src: Company[] = [];
    let init:()=>void;
    const [newData, setNewData] = useState<Company[]>([]);

    useEffect(() => {
        if (srcContext) {
            src = srcContext.src;
            setNewData(srcContext.src);
            init = srcContext.init;
        }
    }, [srcContext,src]);

    const handleAdd = (companyName: string) => {
        console.log(companyName);
        setNewData((prev) => {
            return prev.map((company) => {
                if (company.companyName === companyName) {
                    return {
                        ...company,
                        products: [...company.products, { name: "", price: 0 }]
                    };
                }
                return company;
            });
        });
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const changeData = e.target.value;
        const changeType = e.currentTarget.dataset.setType as string;
        const changeCompany = e.currentTarget.dataset.companyName as string;
        const changeIndex = parseInt((e.currentTarget.dataset.index as string));
        setNewData((prev) => {
            return prev.map((company) => {
                if (company.companyName === changeCompany) {
                    return {
                        ...company,
                        products: company.products.map((product, productI) => {
                            if (productI === changeIndex) {
                                return {
                                    ...product,
                                    [changeType]: changeData
                                }
                            }
                            return product;
                        })
                    }
                }
                return company;
            })
        });
    }

    const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
        const deleteProduct = e.currentTarget.dataset.name as string;
        const deleteProductIdx = parseInt(e.currentTarget.dataset.index as string);
        const deleteCompany = e.currentTarget.dataset.companyName as string;
        const userConfirm = confirm(`確認刪除 ${deleteCompany} 的 ${deleteProduct} `);
        if (userConfirm) {
            setNewData((prev) => {
                return prev.map((company) => {
                    if (company.companyName === deleteCompany) {
                        const newProducts = company.products.filter((product, index) => index !== deleteProductIdx);
                        return {
                            ...company,
                            products: newProducts,
                        };
                    }
                    return company;
                })
            });
        }
    }

    const handleClickAdd = (e: React.MouseEvent<HTMLElement>) => {
        const companyName = e.currentTarget.dataset.companyName!;
        handleAdd(companyName);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const userConfirm = confirm("確認儲存");
        if (userConfirm) {
            fetch("/api/saveData", {
                method: "POST", body: JSON.stringify(newData)
            }).then(res => res.json()).then((data) => {
                init();
            })
        }
    }


    return <SourceProvider>
        <Container>
            <h1 className="mt-2 mb-3 font-extrabold">Edit Page</h1>
            <hr />
            <form onSubmit={handleSubmit}>
                {
                    newData.map((company) => {
                        return <div key={v4()} className="text-center my-5">
                            <div className="font-bold ">{company.companyName}</div>
                            <table className="my-2 table-auto">
                                <thead className='text-sm font-extrabold text-center'>
                                    <tr>
                                        <th>產品名稱</th>
                                        <th>價錢</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        company.products.map((product, productI) => {
                                            return <tr key={v4()} className='border-y relative'>
                                                <td className='py-3'>
                                                    <InputBlock
                                                        required={true}
                                                        onBlur={handleChange}
                                                        defaultValue={product.name}
                                                        dataIndex={productI}
                                                        dataCompanyName={company.companyName}
                                                        dataSetType="name" type="text" className='text-center' />
                                                </td>
                                                <td>
                                                    <InputBlock
                                                        required={true}
                                                        onBlur={handleChange}
                                                        defaultValue={product.price}
                                                        dataIndex={productI}
                                                        dataCompanyName={company.companyName}
                                                        dataSetType="price" type="number" className='text-center appearance-none' />
                                                </td>
                                                <button onClick={handleDelete} data-name={product.name} data-index={productI} data-company-name={company.companyName} className='absolute right-0 h-full'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </tr>
                                        })
                                    }
                                    <tr>
                                        <td colSpan={2} className='py-3 text-center'>
                                            <button className='bg-gray-200 rounded-full' onClick={handleClickAdd} data-company-name={company.companyName} >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    })
                }
                <button type='submit' className="fixed right-[5%] bottom-[5%] bg-green-500/50 rounded-lg p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375Zm9.586 4.594a.75.75 0 0 0-1.172-.938l-2.476 3.096-.908-.907a.75.75 0 0 0-1.06 1.06l1.5 1.5a.75.75 0 0 0 1.116-.062l3-3.75Z" clipRule="evenodd" />
                    </svg>
                </button>
            </form>
        </Container>
    </SourceProvider>
}

export default EditPage;