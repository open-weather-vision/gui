import { Outlet } from "react-router-dom";
import { useState } from "react";
import useGlobalContext, { GlobalContextProvider } from "../utils/useGlobalContext";

import {
    setTranslations,
    setDefaultLanguage,
    useTranslation,
} from "react-multi-lang";

import { ReactComponent as LoadingIcon } from "../img/icons/loading.svg";

import styles from "./layout.module.css";

import de from "../languages/de.json";
import en from "../languages/en.json";
import utils from "../utils/utils";
setTranslations({ de, en });
setDefaultLanguage("en");

function WrappedLayout(){
    const globals = useGlobalContext();

    return <div className={`${styles.blackOverlay} ${!globals.blackOverlay ? styles.closed : ""}`} >
        <LoadingIcon className={styles.loadingIcon} />
    </div>;
}


export default function Layout(){
    return <GlobalContextProvider>
        <WrappedLayout />
        <Outlet />
    </GlobalContextProvider>
}