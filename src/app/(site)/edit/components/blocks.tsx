import React from "react";
import styles from "../css/style.module.css"

interface RowBlockProp {
    children: React.ReactNode
}

const Header: React.FC<RowBlockProp> = ({ children }) => {
    return <div className={styles.header}>
        {children}
    </div>
}

const Block: React.FC<RowBlockProp> = ({ children }) => {
    return <div className={`${styles.blockCol}`}>
        {children}
    </div>
}

const Item: React.FC<RowBlockProp> = ({ children }) => {
    return <div className={styles.item}>
        {children}
    </div>
}

export { Header, Block, Item };