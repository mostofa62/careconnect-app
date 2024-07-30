"use client";
import DefaultLayout from "@/app/layout/DefaultLayout";
import Link from "next/link";
import {useEffect} from 'react';
import useAuth from '@/app/hooks/useAuth';


export default function Contract() {
    const authCtx = useAuth();


    return(
        <>
        <DefaultLayout>
        <div className="grid grid-flow-row">

        <div className="grid grid-flow-row">
            <div className="mt-4">
                <div className="flex flex-row">
                    <div className="p-3">
                        <span className="text-lg capitalize font-semibold text-[#4F4F4F]">Contract List</span>
                    </div>
                    <div className="p-3">
                        <span className="text-xs font-semibold">1-50 of 100</span>
                    </div>
                    <div className="p-2">
                       
                    </div>
                </div>
            </div>

        </div>

        </div>

        </DefaultLayout>
        </>

    )
}