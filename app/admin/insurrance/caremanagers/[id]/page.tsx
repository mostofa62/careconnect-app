"use client";
import DefaultLayout from "@/app/layout/DefaultLayout";
import Link from "next/link";
import {useEffect, useMemo, useRef, useState} from 'react';
import useAuth from '@/app/hooks/useAuth';

import { useReactTable, ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, getPaginationRowModel, SortingState, PaginationState } from '@tanstack/react-table';
import useFetchGridData,{getPageNumbers,GetInVisibleColumn, GetShowingText, PerPageList} from "@/app/components/grid/useFetchGridData";
import GridGlobalSearch from "@/app/components/grid/GridGlobalSearch";
import GridPaginationHolder from "@/app/components/grid/GridPaginationHolder";

const per_page_list = PerPageList();
const per_page = per_page_list[0];


interface DataRow {
    _id:string;    
    name: string;
    phoneNumber: string;
}

export default function CareManagers({
  params,
  searchParams
}:{
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }

}) {
    const authCtx = useAuth();


    const [sorting, setSorting] = useState<SortingState>([]);       
    const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: per_page });
    
    
    const [globalFilter, setGlobalFilter] = useState('');
    const [filterInput, setFilterInput] = useState<string>('');

    const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);


    /* ROW HEIGHT CALCULATION FOR UI */

    const [hoveredRowHeight, setHoveredRowHeight] = useState<number | null>(null);
    const rowRefs = useRef<{ [key: number]: HTMLTableRowElement | null }>({});

    const handleMouseEnter = (rowId: any) => {
      const rowElement = rowRefs.current[rowId];
      if (rowElement) {
        setHoveredRowHeight(rowElement.offsetHeight);
        setHoveredRowId(rowId);
      }
    };
  
    const handleMouseLeave = () => {
      setHoveredRowHeight(null);
      setHoveredRowId(null);
    };

    /* END ROW HEIGHT CALCUALTION */

    
    const id = params.id;

    const {data,error,loading,totalRows,pageCount} = useFetchGridData({
    urlSuffix:`caremanagers/${id}`,
    pagination:pagination,
    sorting:sorting,
    globalFilter:globalFilter    
    })

    const columns: ColumnDef<DataRow>[] = useMemo(() => [
    
        {
            accessorKey: '_id',
            header: 'ID',
            visible: false
            
        },
        
        
        {
            accessorKey: 'name',
            header: 'Caremanager Name',
        },
        
        {
            accessorKey: 'phoneNumber',
            header: 'Phone',
        },
        /*
        {
            accessorKey: 'insurance',
            header: 'Insurance',
        },
        */
        /*
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
            hoveredRowId === row.original.id ? 
            <button onClick={() => alert(`Action for ${row.original.name}`)}>Action</button> : 
            null
            ),
        },
        */
    
        ], [/*hoveredRowId*/]);
    
        const table = useReactTable({
            data,
            columns,
            initialState: {
              columnVisibility: GetInVisibleColumn(columns)
    
            },
            state: {
              sorting,
              globalFilter,
              pagination,
            },
            onSortingChange: setSorting,
            onGlobalFilterChange: setGlobalFilter,
            onPaginationChange: setPagination,
            globalFilterFn: 'includesString',
            getCoreRowModel: getCoreRowModel(),
            getSortedRowModel: getSortedRowModel(),
            getPaginationRowModel: getPaginationRowModel(),
            manualPagination: true,
            manualSorting: true,
            /*manualFiltering:true,*/
            enableGlobalFilter: true,
            pageCount:pageCount
          });
        
        const showingText = GetShowingText(pagination.pageIndex, pagination.pageSize,totalRows);

        const pageNumbers = getPageNumbers(table.getPageCount(),pagination.pageIndex);
      
      
        const handlePageChange = (pageIndex: number) => {
              setPagination(old => ({
                ...old,
                pageIndex,
              }));
            };
      
      
        const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          setFilterInput(e.target.value);        
          };
      
      
        const applyFilter = () => {
          setGlobalFilter(filterInput);
          };
      
        useEffect(()=>{
          if(filterInput.length < 1){
              setGlobalFilter("");
          }
          },[filterInput])

    return(
        <>
        <DefaultLayout>
        <div className="grid grid-flow-row">

        <div className="mt-4">
                <div className="flex flex-row">
                    <div className="p-3">
                        <span className="text-lg capitalize font-semibold text-[#4F4F4F]">Caremanager List</span>
                    </div>
                    <div className="p-3">
                        <span className="text-xs font-semibold">{showingText}</span>
                    </div>
                    <div className="p-2.5">
                      <GridGlobalSearch 
                      filterInput={filterInput}
                      handleFilterChange={handleFilterChange}
                      applyFilter={applyFilter}
                      searchButtonText="Search"
                      placeHolderText="Search here"
                      />
                    </div>
                    <div className="p-2.5">
                        <Link
                            href={'/admin/insurrance/caremanagers/cu'}
                            className={`text-sm h-8 capitalize group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out   bg-[#0166FF] text-white`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={20} height={20} stroke-width="1.5" stroke="currentColor" className="">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>

                            Add Caremanager
                        </Link>
                    </div>
                </div>
        </div>

        <div className="mt-4 p-2">  
            
      <table className="table-auto w-full text-center">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th className={
                  header.column.getCanSort()
                    ? 'cursor-pointer select-none'
                    : ''
                } key={header.id} onClick={header.column.getToggleSortingHandler()}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
       
                <tbody>
                {error &&
                <>
                <tr className="col-span-full row-span-full">
                  <td className="text-center w-full p-2">
                    <span>{error}</span>
                  </td>
                </tr>
                </>
                }  
                {loading ?  
                <>
                <tr className="col-span-full row-span-full">
                  <td className="text-center w-full p-2">
                    <span>... Loading ...</span>
                  </td>
                </tr>
                </>
                :
                <>   
                {table.getRowModel().rows.map((row:any) => (
                    <>                    
                    
                    <tr 
                    ref={el => (rowRefs.current[row.original._id] = el)}
                    onMouseEnter={() => handleMouseEnter(row.original._id)}
                    onMouseLeave={handleMouseLeave}   
                    key={row.id} className="border-t">
                    {row.getVisibleCells().map((cell:any) => (
                        <td className="py-1" key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                    ))}

                    {
                    hoveredRowId == row.original._id &&
                    <div style={{ height:`${hoveredRowHeight ? hoveredRowHeight-1:20}px`,paddingTop:`${hoveredRowHeight ? ((hoveredRowHeight/4)-3):5}px`, paddingBottom:`${hoveredRowHeight ? ((hoveredRowHeight/4)):5}px` }} className={`absolute float-right right-3.5 px-3.5 w-[10%] flex flex-row bg-white`}>
                    <div> 
                    <Link  title="Edit" className={`cursor-pointer hover:text-[#0166FF]`}  href={`caremanagers/cu/${row.getValue('_id')}`}>
                    
                    <svg width={22} height={22} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>

                    
                    
                    
                    </Link>
                    </div>

                    {/*
                    <div> 
                    <Link  title="Edit" className={`cursor-pointer`}  href={`clients/cu/${row.getValue('_id')}`}>
                    
                    <svg width={22} height={22} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>

                    
                    
                    
                    </Link>
                    </div>
                    */}
                   
                    </div>
                    }
                                    
                    </tr>

                      
                    
                    </>
                ))}
                </> 
                }
                </tbody>
                
        
      </table>
      
            </div>


            {
        !loading 
        && 
        !error 
        &&
        data.length > 0
        &&
      <GridPaginationHolder 
      table={table}
      pageNumbers={pageNumbers}
      handlePageChange={handlePageChange}
      per_page_list={per_page_list}
      />

}

        </div>

        </DefaultLayout>
        </>

    )
}