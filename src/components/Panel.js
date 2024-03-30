import { useEffect, useRef, useState } from "react";
import InputGroup from "./InputForm/InputGroup";
import { v4 } from "uuid";
import { gsap } from "gsap";
import { useSourceContext } from "@/context/sourceData";

const Panel = () => {
    const { src, companySelect } = useSourceContext();
    const [load, setLoad] = useState();
    const [tempData, setTempData] = useState([]);
    const setTemp = (idx, value) => {
        setTempData(prev => {
            return prev.map((v, i) => {
                if (i === idx) {
                    return value;
                } else {
                    return v;
                }
            })

        })
    }

    const panel = useRef(null);
    useEffect(() => {
        gsap.to(panel.current, {
            opacity: 0, duration: 0.3, ease: "power1", onComplete: () => {
                if (companySelect) {

                    console.log(src);
                    console.log(src.filter(e => e.companyName === companySelect));

                    const selectData = src.filter(e => e.companyName === companySelect)[0];
                    setLoad(selectData);
                    setTempData(selectData.products.map(() => {
                        return 0;
                    }));
                    gsap.to(panel.current, {
                        opacity: 1, duration: 0.3, ease: "power1"
                    });
                }

            }
        })
    }, [companySelect]);

    return (
        <div ref={panel} className="flex flex-wrap px-4 py-2 pb-[13vh]">
            {load &&
                load.products.map((v, i) => {
                    return <InputGroup key={v4()} idx={i} value={tempData[i]} setTemp={setTemp} data={v} />
                })
            }
        </div>
    )
}

export default Panel;