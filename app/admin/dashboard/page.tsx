"use client";
import DefaultLayout from "@/app/layout/DefaultLayout";
import Link from "next/link";
import {useEffect} from 'react';
import useAuth from '@/app/hooks/useAuth';


export default function DashBoard() {
    const authCtx = useAuth();


    return(
        <>
        <DefaultLayout>
        <div className="grid grid-flow-row">

        </div>

        </DefaultLayout>
        </>

    )
}