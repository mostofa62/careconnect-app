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
import CardHolder from "@/app/components/ui/CardHolder";
import { DataLabel } from "./cu/DataValidationSchema";
import Loading from "@/app/loading";

const url = process.env.NEXT_PUBLIC_API_URL;
const per_page_list = PerPageList();
const per_page = per_page_list[0];

interface DataRow {
    _id:string;    
    name: string;
    address:string;
    ssn:string;
    bank_name:string;
    bank_acc_no:string;
    bank_routing_no:string;
    email:string;
    phoneNumber: string;
    total_hour:number;
    gender:any;
    pay_rate:number;

    photo_attachment_id:string;
    ssn_attachment_id:string;
    bank_attachment_id:string;
    physical_form_attachment_id:string;
    wfour_form_attachment_id:string;

    working_schedule:any[];
}



export default function Caregiver() {
    
    const authCtx = useAuth();
    
    const [data, setData] = useState<DataRow[]>([]);
    
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

    
    const setTableData=(tableData:[])=>{
      setData(tableData);
    }

    const {error,loading,totalRows,pageCount} = useFetchGridData({
    urlSuffix:'caregiver',
    pagination:pagination,
    sorting:sorting,
    globalFilter:globalFilter,
    setTableData:setTableData    
    })


    const columns: ColumnDef<DataRow>[] = useMemo(() => [
    
    {
        accessorKey: '_id',
        header: 'ID',
        visible: false
        
    },
    
    
    {
        accessorKey: 'name',
        header: 'Name',
        //cell: info => <a className="text-[#0166FF] font-medium" href={`caregiver/caremanagers/${info.row.original._id}`}  rel="noopener noreferrer">{info.getValue()}</a>,
    },
    {
      accessorKey: 'gender.label',
      header: 'Gender',
      //cell: info => <a className="text-[#0166FF] font-medium" href={`caregiver/caremanagers/${info.row.original._id}`}  rel="noopener noreferrer">{info.getValue()}</a>,
  },
    {
      accessorKey: 'address',
      header: 'Address',
    },

    
    
    {
      accessorKey: 'email',
      header: 'Email',
    },
    
    {
        accessorKey: 'phoneNumber',
        header: 'Phone',
    },

    {
      accessorKey: 'ssn',
      header: 'SSN',
    },

    {
      accessorKey: 'bank_acc_no',
      header: 'Bank Account Number',
    },
    {
      accessorKey: 'bank_routing_no',
      header: 'Bank Routing Number',
    },
    {
      accessorKey: 'total_hour',
      header: 'Total Working Hours',
      cell:info=><p className="font-semibold">{info.getValue()} hours</p>
    },
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

    const deleteAction=async(id:string)=>{


      confirmAlert({
        title: 'Do you want to delete this row?',
        message: 'Are you sure to do this?',
        buttons: [
          {
            label: 'Yes',
            onClick: async()=>{ 

              DeleteActionGlobal({        
                action:'delete-caregiver',        
                data:{'id':id}
              }).then((deletedData)=>{
                  //console.log(deletedData)
                  AlertBox(deletedData.message, deletedData.deleted_done);
                  if(deletedData.deleted_done > 0){
                    const updatedData:any = data.filter((row:any) => row._id !== id);              
                    setData(updatedData)
                  }
              })
              
            }
          },
          {
            label: 'No',
            onClick: () => ()=>{                

            }
          }
        ],
        closeOnEscape: true,
        closeOnClickOutside: true,
      
      });

      

      

      
      
      
      
      
    }


    return(
        <>
        <DefaultLayout>
        <div className="grid grid-flow-row">
            <div className="mt-[40px]">
                <div className="flex flex-row h-[45px]">
                    <div className="py-[10px]">
                        <p className="text-[25px]  leading-[25px] capitalize  font-medium text-[#000000]">Caregiver List</p>
                    </div>
                    <div className="py-[15px] px-10">
                        <p className="text-[15px] leading-[15px] text-[#4F4F4F]">{showingText}</p>
                    </div>


                    <div>
                      <GridGlobalSearch 
                      filterInput={filterInput}
                      handleFilterChange={handleFilterChange}
                      applyFilter={applyFilter}
                      searchButtonText="Search"
                      placeHolderText="Search here"
                      />
                    </div>

                    <div className="px-10">
                        <Link
                            href={'/admin/caregiver/cu'}
                            className={`text-sm h-[45px] capitalize group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out   bg-[#0166FF] text-white`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={20} height={20} strokeWidth="1.5" stroke="currentColor" className="">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>

                            <p className="text-[18px] font-medium">Add Caregiver</p>
                        </Link>
                    </div>
                </div>
            </div>
            {/*
            <div className="mt-10 p-2">  
            
      <table className="tanstack-table table-auto w-full text-left">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th className={`font-medium
                  ${header.column.getCanSort()
                    ? 'cursor-pointer select-none'
                    : ''}`
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
                  <td className="text-center w-full p-2 font-normal">
                    <span>{error}</span>
                  </td>
                </tr>
                </>
                }  
                {loading ?  
                <>
                <tr className="col-span-full row-span-full">
                  <td className="text-center w-full p-2 font-normal">
                    <span>... Loading ...</span>
                  </td>
                </tr>
                </>
                :
                <>   
                {!loading 
        && 
        !error 
        && 
        table.getRowModel().rows.map((row:any) => {
                    
                    return(
                                        
                    
                    <tr 
                    ref={el => (rowRefs.current[row.original._id] = el)}
                    onMouseOver={() => handleMouseEnter(row.original._id)}
                    onMouseOut={handleMouseLeave}  
                    key={row.id}>
                    {row.getVisibleCells().map((cell:any) => (
                        <td className="font-normal" key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                    ))}

                    {
                    hoveredRowId == row.original._id &&
                    <GridActionLink items={[
                      {
                        actionId:'edit',
                        title:'Edit',
                        link:`caregiver/cu/${row.getValue('_id')}`,                        
                        icon :<svg width={22} height={22} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                      },
                      {
                        actionId:'delete',
                        title:'Delete',
                        link:`delete-caregiver`, 
                        onClick:()=>{deleteAction(row.getValue('_id'))},                       
                        icon :<svg width={18} height={20} viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.41406 1.54297L5.81641 2.5H11.6836L11.0859 1.54297C10.9727 1.35938 10.7695 1.25 10.5547 1.25H6.94141C6.72656 1.25 6.52734 1.35938 6.41016 1.54297H6.41406ZM12.1484 0.882812L13.1602 2.5H15H16.25H16.875C17.2188 2.5 17.5 2.78125 17.5 3.125C17.5 3.46875 17.2188 3.75 16.875 3.75H16.25V16.875C16.25 18.6016 14.8516 20 13.125 20H4.375C2.64844 20 1.25 18.6016 1.25 16.875V3.75H0.625C0.28125 3.75 0 3.46875 0 3.125C0 2.78125 0.28125 2.5 0.625 2.5H1.25H2.5H4.33984L5.35156 0.882812C5.69531 0.332031 6.29688 0 6.94141 0H10.5547C11.2031 0 11.8008 0.332031 12.1445 0.882812H12.1484ZM2.5 3.75V16.875C2.5 17.9102 3.33984 18.75 4.375 18.75H13.125C14.1602 18.75 15 17.9102 15 16.875V3.75H2.5ZM5.625 6.875V15.625C5.625 15.9688 5.34375 16.25 5 16.25C4.65625 16.25 4.375 15.9688 4.375 15.625V6.875C4.375 6.53125 4.65625 6.25 5 6.25C5.34375 6.25 5.625 6.53125 5.625 6.875ZM9.375 6.875V15.625C9.375 15.9688 9.09375 16.25 8.75 16.25C8.40625 16.25 8.125 15.9688 8.125 15.625V6.875C8.125 6.53125 8.40625 6.25 8.75 6.25C9.09375 6.25 9.375 6.53125 9.375 6.875ZM13.125 6.875V15.625C13.125 15.9688 12.8438 16.25 12.5 16.25C12.1562 16.25 11.875 15.9688 11.875 15.625V6.875C11.875 6.53125 12.1562 6.25 12.5 6.25C12.8438 6.25 13.125 6.53125 13.125 6.875Z" fill="currentColor"/>
                    </svg>
                    
                      }
                    ]}
                    hoveredRowHeight={hoveredRowHeight}
                    />
                   
                    }
                                    
                    </tr>

                      
                    
                    
                    )
                })}
                </> 
                }
                </tbody>
                
        
      </table>
      
      
            </div>
            */}


            <div className="mt-[10px] p-2">

              
              <div className="grid grid-cols-1 gap-4">
              {
                    loading &&
                    <div className="border rounded p-4 mt-5 text-[15px] border-[#C3C9CE] w-[full] flex justify-center">
                    <Loading/>
                    </div>
                }
                

                {
                    !loading && table.getRowModel().rows.length < 1 && error &&

                    <div className="border rounded p-4 mt-5 text-[15px] border-[#C3C9CE] w-[full] flex justify-center">
                        <p className="text-[20px] capitalize">{error}</p>
                    </div>

                }

                {
                    !loading && table.getRowModel().rows.length < 1 &&

                    <div className="border rounded p-4 mt-5 text-[15px] border-[#C3C9CE] w-[full] flex justify-center">
                        <p className="text-[20px] capitalize">no result found!</p>
                    </div>

                }

              {!loading && table.getRowModel().rows.map(row => (

                  <CardHolder  key={row.original._id} title={row.original.name}>

                    <div className="grid grid-cols-2 gap-4">

                      <div className="border rounded p-2 text-[15px] border-[#C3C9CE] w-[full]">

                        <table className="table-auto w-full text-left divide-y">

                          <tbody>

                          <tr>
                            <th>{DataLabel.name}</th>
                            <td>{row.original.name}</td>
                          </tr>

                          <tr>
                            <th>{DataLabel.gender}</th>
                            <td>{row.original.gender.label}</td>
                          </tr>

                          <tr>
                              <th>{DataLabel.address}</th>
                              <td>{row.original.address}</td>
                          </tr>

                          <tr>
                              <th>{DataLabel.phoneNumber}</th>
                              <td>{row.original.phoneNumber}</td>
                          </tr>
                          <tr>
                              <th>{DataLabel.email}</th>
                              <td>{row.original.email}</td>
                          </tr>

                          <tr>
                              <th>{DataLabel.ssn}</th>
                              <td>{row.original.ssn}</td>
                          </tr>

                          <tr>
                              <th>{DataLabel.pay_rate}</th>
                              <td>{row.original.pay_rate}</td>
                          </tr>

                          <tr>
                              <th>{DataLabel.bank_name}</th>
                              <td>{row.original.bank_name}</td>
                          </tr>

                        

                          <tr>
                              <th>{DataLabel.bank_acc_no}</th>
                              <td>{row.original.bank_acc_no}</td>
                          </tr>

                          <tr>
                              <th>{DataLabel.bank_routing_no}</th>
                              <td>{row.original.bank_routing_no}</td>
                          </tr>

                          {

                            row.original.working_schedule.length > 0 &&
                            row.original.working_schedule.map((data, index)=>{

                                if(data.weekDay.label =='') return;
                                return(
                                <tr key={index}>
                                    <th>{`${DataLabel.working_schedule} ${index+1}`}</th>
                                    <td>
                                      <span>{data.weekDay.label}</span>
                                      <span className="ml-2">{data.from.label}</span> 
                                      <span className="ml-1">{data.from_am.label}</span>
                                      <span className="mx-1"> - </span>
                                      <span className="ml-1">{data.to.label}</span> 
                                      <span className="ml-1">{data.to_am.label}</span>
                                      <span className="ml-2">{data.total_hour} HOUR</span>
                                    </td>
                                </tr>
                                )
                            })

                          }
                          </tbody>

                        </table>
                      </div>


                      <div className="border rounded p-2 border-[#C3C9CE] w-[full]">

                    <table className="table-auto w-full text-left divide-y">
                        <tbody>
                        <tr>
                            <th>{DataLabel.photo_attachment_id}</th>
                            <td>
                            {row.original.photo_attachment_id!=null &&
                            <Link className="text-[16px] text-[#0166FF] border-[#C3C9CE] bg-[#F5F7F9] px-3 py-2 rounded"  target="blank" href={`${url}/download/${row.original.photo_attachment_id}`}>
                                Download
                            </Link>
                            }
                            </td>
                        </tr>

                        <tr>
                            <th>{DataLabel.ssn_attachment_id}</th>
                            <td>

                            {row.original.ssn_attachment_id!=null &&
                            <Link className="text-[16px] text-[#0166FF] border-[#C3C9CE] bg-[#F5F7F9] px-3 py-2 rounded"  target="blank" href={`${url}/download/${row.original.ssn_attachment_id}`}>
                                Download
                            </Link>
                            }
                            </td>
                        </tr>

                        <tr>
                            <th>{DataLabel.bank_attachment_id}</th>
                            <td>
                            {row.original.bank_attachment_id!=null &&
                            <Link className="text-[16px] text-[#0166FF] border-[#C3C9CE] bg-[#F5F7F9] px-3 py-2 rounded"  target="blank" href={`${url}/download/${row.original.bank_attachment_id}`}>
                                Download
                            </Link>
                            }
                            </td>
                        </tr>


                        <tr>
                            <th>{DataLabel.physical_form_attachment_id}</th>
                            <td>
                            {row.original.physical_form_attachment_id!=null &&
                            <Link className="text-[16px] text-[#0166FF] border-[#C3C9CE] bg-[#F5F7F9] px-3 py-2 rounded"  target="blank" href={`${url}/download/${row.original.physical_form_attachment_id}`}>
                                Download
                            </Link>
                            }
                            </td>
                        </tr>

                        <tr>
                            <th>{DataLabel.wfour_form_attachment_id}</th>
                            <td>
                            {row.original.wfour_form_attachment_id!=null &&
                            <Link className="text-[16px] text-[#0166FF] border-[#C3C9CE] bg-[#F5F7F9] px-3 py-2 rounded"  target="blank" href={`${url}/download/${row.original.wfour_form_attachment_id}`}>
                                Download
                            </Link>
                            }
                            </td>
                        </tr>

                     


                       

                        </tbody>

                    </table>

                    </div>


                    </div>


                    <div className="grid grid-cols-1">

                        <div className="w-[full text-right">

                            <div className="relative float-right right-1 top-4">

                        <GridActionLink items={[
                      {
                        actionId:'edit',
                        title:'Edit',
                        link:`caregiver/cu/${row.getValue('_id')}`,                        
                        icon :<svg width={22} height={22} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                      },
                      {
                        actionId:'delete',
                        title:'Delete',
                        link:`delete-caregiver`, 
                        onClick:()=>{deleteAction(row.getValue('_id'))},                       
                        icon :<svg width={18} height={20} viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.41406 1.54297L5.81641 2.5H11.6836L11.0859 1.54297C10.9727 1.35938 10.7695 1.25 10.5547 1.25H6.94141C6.72656 1.25 6.52734 1.35938 6.41016 1.54297H6.41406ZM12.1484 0.882812L13.1602 2.5H15H16.25H16.875C17.2188 2.5 17.5 2.78125 17.5 3.125C17.5 3.46875 17.2188 3.75 16.875 3.75H16.25V16.875C16.25 18.6016 14.8516 20 13.125 20H4.375C2.64844 20 1.25 18.6016 1.25 16.875V3.75H0.625C0.28125 3.75 0 3.46875 0 3.125C0 2.78125 0.28125 2.5 0.625 2.5H1.25H2.5H4.33984L5.35156 0.882812C5.69531 0.332031 6.29688 0 6.94141 0H10.5547C11.2031 0 11.8008 0.332031 12.1445 0.882812H12.1484ZM2.5 3.75V16.875C2.5 17.9102 3.33984 18.75 4.375 18.75H13.125C14.1602 18.75 15 17.9102 15 16.875V3.75H2.5ZM5.625 6.875V15.625C5.625 15.9688 5.34375 16.25 5 16.25C4.65625 16.25 4.375 15.9688 4.375 15.625V6.875C4.375 6.53125 4.65625 6.25 5 6.25C5.34375 6.25 5.625 6.53125 5.625 6.875ZM9.375 6.875V15.625C9.375 15.9688 9.09375 16.25 8.75 16.25C8.40625 16.25 8.125 15.9688 8.125 15.625V6.875C8.125 6.53125 8.40625 6.25 8.75 6.25C9.09375 6.25 9.375 6.53125 9.375 6.875ZM13.125 6.875V15.625C13.125 15.9688 12.8438 16.25 12.5 16.25C12.1562 16.25 11.875 15.9688 11.875 15.625V6.875C11.875 6.53125 12.1562 6.25 12.5 6.25C12.8438 6.25 13.125 6.53125 13.125 6.875Z" fill="currentColor"/>
                    </svg>
                    
                      }
                    ]}
                    hoveredRowHeight={0}
                    />
                    </div>

                        </div>

                    </div>

                  </CardHolder>

                                
                ))}
              </div>
            </div>

      {
        !loading 
        && 
        !error 
        &&
        data.length > 0
        &&
        <div className="mt-[100px]">
      <GridPaginationHolder 
      table={table}
      pageNumbers={pageNumbers}
      handlePageChange={handlePageChange}
      per_page_list={per_page_list}
      />
      </div>

}


        </div>

        </DefaultLayout>
        </>

    )
}