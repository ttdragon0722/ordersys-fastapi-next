"use client";
import React, { useState } from "react";
import Panel from "@/components/Panel";
import Modal from "@/components/Modal";
import Menu from "@/components/Menu";
import Container from "@/components/container/container";

import type { Output } from "@/types/types";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [outputData, setOutputData] = useState<Output[]>([]);
  const [outputPrice, setOutputPrice] = useState(0);

  const copyToClipboard = async (text: string) => {
    try {
      // 檢查是否支援 clipboard API
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        console.log('Text copied to clipboard!');
      } else {
        // 如果不支援，使用傳統的 document.execCommand 方法
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        console.log('Text copied to clipboard!');
      }
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };


  const output = () => {
    setShowModal(true);
    const data = document.getElementsByClassName("product") as HTMLCollectionOf<HTMLElement>;
    const outputData: Output[] = Array.from(data).map((product) => {
      const name = product.querySelector('.product-name')!.textContent!;
      const price = parseInt(product.querySelector('.product-price')!.textContent!);
      const amount = parseInt((product.querySelector('.amount') as HTMLInputElement).value);
      return { name, price, amount };
    });

    let copy = "";
    setOutputPrice(0);

    for (const list of outputData) {
      if (list.amount > 0) {
        if (copy === "") {
          copy = copy + list.name + "×" + list.amount
        } else {
          copy = copy + "\n" + list.name + "×" + list.amount
        }
        setOutputPrice((prev) => {
          return prev + (list.price) * (list.amount);
        })
      }
    }
    console.log(copy);
    copyToClipboard(copy);
    setOutputData(outputData);
  }

  return (
    <>
      <Container>
        <Panel />
      </Container>
      <Modal showModal={showModal} setShowModal={setShowModal} output={outputData} price={outputPrice} />
      <Menu menuSwitch={setShowModal} output={output} />
    </>
  );
}

export default Home;
