"use client";
import { v4 } from 'uuid';
import Container from "@/components/container/container";
import { SourceProvider, useSourceContext } from "@/context/sourceData";
import React, { useEffect, useState } from "react";
import type { Company } from "@/types/types";
import InputBlock from '@/components/input/inputBlock';
import { Block, Header, Item } from './components/blocks';
import styles from './css/style.module.css';
import { useRouter } from 'next/navigation';

const EditPage = () => {
    const srcContext = useSourceContext();
    let src: Company[] = [];
    let init: () => void;
    const [newData, setNewData] = useState<Company[]>([]);

    useEffect(() => {
        if (srcContext) {
            src = srcContext.src;
            setNewData(srcContext.src);
            init = srcContext.init;
        }
    }, [srcContext]);

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

    const [editCompany, setEditCompany] = useState<string>("DEFAULT");
    const editCompanyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setEditCompany(e.target.value);
    }

    const router = useRouter();
    useEffect(() => {
        router.push(`/edit/#${editCompany}`);
    }, [editCompany]);

    return <SourceProvider>
        <Container id="DEFAULT">
            <div className='pt-2 px-3 fixed top-0 left-0 font-extrabold flex justify-between items-center bg-gradient-to-b to-transparent bg-slate-50/80 w-full h-[6vh] z-50'>
                <h1>Edit Page</h1>
                <select id="compony" value={editCompany} className="select px-5 py-1 rounded-lg font-bold shadow-lg bg-white/50 mx-2"
                    onChange={editCompanyChange}>
                    <option value="DEFAULT">選擇廠商</option>
                    {newData &&
                        newData.map((value, index) => (
                            <option key={index} value={value.companyName}>
                                {value.companyName}
                            </option>
                        ))}
                </select>
            </div>
            <form onSubmit={handleSubmit} className='scroll-smooth'>
                <hr />
                {
                    newData.map((company) => {
                        return <div key={v4()} className="text-center pt-[8vh] my-5" id={company.companyName}>
                            <div className="font-bold ">{company.companyName}</div>
                            <div className="my-2 flex-col">
                                <Header>
                                    <Item>產品名稱</Item>
                                    <Item>價錢</Item>
                                </Header>
                                {
                                    company.products.map((product, productI) => {
                                        return <Block key={v4()}>
                                            <Item>
                                                <InputBlock
                                                    required={true}
                                                    onBlur={handleChange}
                                                    defaultValue={product.name}
                                                    dataIndex={productI}
                                                    dataCompanyName={company.companyName}
                                                    dataSetType="name" type="text" className={`text-center w-full ${styles.inputBox}`} />
                                            </Item>
                                            <Item>
                                                <InputBlock
                                                    required={true}
                                                    onBlur={handleChange}
                                                    defaultValue={product.price}
                                                    dataIndex={productI}
                                                    dataCompanyName={company.companyName}
                                                    dataSetType="price" type="number" className={`text-center appearance-none w-1/2 ${styles.inputBox}`} />
                                            </Item>
                                            <button onClick={handleDelete} data-name={product.name} data-index={productI} data-company-name={company.companyName} className='absolute right-0 h-full'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </Block>
                                    })
                                }
                                <div className='border-t'>
                                    <Item>
                                        <button className='bg-gray-200 rounded-full' onClick={handleClickAdd} data-company-name={company.companyName} >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>
                                        </button>
                                    </Item>
                                </div>
                            </div>
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