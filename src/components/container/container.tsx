import React from "react";

interface ContainerProp {
    children: React.ReactNode,
    id?: string | undefined
}

const Container = ({ children,id }: ContainerProp) => {
    return <div id={id} className="min-w-[320px] max-w-[425px] w-full px-2 h-screen m-auto relative">
        {children}
    </div>
}

export default Container;