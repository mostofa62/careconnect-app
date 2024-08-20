"use client";
import DefaultLayout from "@/app/layout/DefaultLayout";
import Link from "next/link";
import {useEffect, useMemo, useRef, useState} from 'react';
import useAuth from '@/app/hooks/useAuth';
import { useReactTable, ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, getPaginationRowModel, SortingState, PaginationState } from '@tanstack/react-table';
import useFetchGridData,{getPageNumbers,GetInVisibleColumn, GetShowingText, PerPageList,DeleteActionGlobal, AlertBox} from "@/app/components/grid/useFetchGridData";
import GridGlobalSearch from "@/app/components/grid/GridGlobalSearch";
import GridPaginationHolder from "@/app/components/grid/GridPaginationHolder";
import GridActionLink from "@/app/components/grid/GridActionLink";
import { confirmAlert } from "react-confirm-alert";


const per_page_list = PerPageList();
const per_page = per_page_list[0];

interface DataRow {
    _id:string;    
    name: string;
    address:string;
    county:string;
    state:string;
    zipCode:string;
    phoneNumber: string;
}



export default function Patient() {
    
    const authCtx = useAuth();
    
    


    return(
        <>
        <DefaultLayout>
        <div className="grid grid-flow-row">
            <div className="mt-[40px]">
                <div className="flex flex-row h-[45px]">
                    <div className="py-[10px]">
                        <p className="text-[25px]  leading-[25px] capitalize  font-medium text-[#000000]">Patient List</p>
                    </div>
                    <div className="py-[15px] px-10">
                        <p className="text-[15px] leading-[15px] text-[#4F4F4F]"></p>
                    </div>


                    <div>
                      
                    </div>

                    <div className="px-10">
                        <Link
                            href={'/admin/patient/cu'}
                            className={`text-sm h-[45px] capitalize group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out   bg-[#0166FF] text-white`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={20} height={20} strokeWidth="1.5" stroke="currentColor" className="">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>

                            <p className="text-[18px] font-medium">Add Patient</p>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="mt-10 p-2">  
            
     
      
      
            </div>
      


        </div>

        </DefaultLayout>
        </>

    )
}