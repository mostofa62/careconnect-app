'use client';

import React, { useEffect, useRef, useState } from 'react';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import Logo from '@/app/images/logo/logo.svg';

import SidebarLinkGroup from './SidebarLinkGroup';

import useAuth from '@/app/hooks/useAuth';

const url = process.env.NEXT_PUBLIC_API_URL;

const app_name:any = process.env.NEXT_PUBLIC_APP_NAME;
interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  
  const pathname  = usePathname();
  const authCtx = useAuth();
  const router = useRouter();

  
  const [callStatus, setCallStatus] =  useState(false);
  let Loguser:any = null;

  

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);
  let storedSidebarExpanded:any= null;
    

  


   const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  if (typeof window !== 'undefined') {

    Loguser = localStorage.getItem('Loguser');
  }

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);


  

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 lg:top-[90px] lg:fixed z-9999 flex h-screen w-65 flex-col overflow-y-hidden duration-300 ease-linear lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      {/*
      <div className="flex items-center justify-between gap-2 px-6 border-b-[1px]">
        
        {/*
        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
        */}{/*
        <Image src={Logo} alt={app_name} className="" height={48}  />
      </div>
      */}
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="py-4 px-4 lg:px-6 min-h-screen">
          {/* <!-- Menu Group --> */}
          <div>
            {/*
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>
    */}
    
            <ul className="sidebar mb-6 flex flex-col gap-1.5">

              {/* <!-- Menu Item Calendar --> */}
              


<li key={1}>
  <Link
    href="/admin/dashboard"
    className={`capitalize text-sm group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium  duration-300 ease-in-out  hover:text-[#0166FF] ${
      pathname.substring(1,pathname.length)=='admin/dashboard' ? 'text-[#0166FF]':'text-[#4F4F4F]'
    }`}
  >
    <svg width="20" height="23" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.14286 2.85713C1.75 2.85713 1.42857 3.17856 1.42857 3.57142V10.7143C1.42857 11.1071 1.75 11.4286 2.14286 11.4286H6.42857C6.82143 11.4286 7.14286 11.1071 7.14286 10.7143V3.57142C7.14286 3.17856 6.82143 2.85713 6.42857 2.85713H2.14286ZM0 3.57142C0 2.38838 0.959821 1.42856 2.14286 1.42856H6.42857C7.61161 1.42856 8.57143 2.38838 8.57143 3.57142V10.7143C8.57143 11.8973 7.61161 12.8571 6.42857 12.8571H2.14286C0.959821 12.8571 0 11.8973 0 10.7143V3.57142ZM13.5714 11.4286C13.1786 11.4286 12.8571 11.75 12.8571 12.1428V19.2857C12.8571 19.6786 13.1786 20 13.5714 20H17.8571C18.25 20 18.5714 19.6786 18.5714 19.2857V12.1428C18.5714 11.75 18.25 11.4286 17.8571 11.4286H13.5714ZM11.4286 12.1428C11.4286 10.9598 12.3884 9.99999 13.5714 9.99999H17.8571C19.0402 9.99999 20 10.9598 20 12.1428V19.2857C20 20.4687 19.0402 21.4286 17.8571 21.4286H13.5714C12.3884 21.4286 11.4286 20.4687 11.4286 19.2857V12.1428ZM6.42857 15.7143H2.14286C1.75 15.7143 1.42857 16.0357 1.42857 16.4286V19.2857C1.42857 19.6786 1.75 20 2.14286 20H6.42857C6.82143 20 7.14286 19.6786 7.14286 19.2857V16.4286C7.14286 16.0357 6.82143 15.7143 6.42857 15.7143ZM2.14286 14.2857H6.42857C7.61161 14.2857 8.57143 15.2455 8.57143 16.4286V19.2857C8.57143 20.4687 7.61161 21.4286 6.42857 21.4286H2.14286C0.959821 21.4286 0 20.4687 0 19.2857V16.4286C0 15.2455 0.959821 14.2857 2.14286 14.2857ZM13.5714 2.85713C13.1786 2.85713 12.8571 3.17856 12.8571 3.57142V6.42856C12.8571 6.82142 13.1786 7.14284 13.5714 7.14284H17.8571C18.25 7.14284 18.5714 6.82142 18.5714 6.42856V3.57142C18.5714 3.17856 18.25 2.85713 17.8571 2.85713H13.5714ZM11.4286 3.57142C11.4286 2.38838 12.3884 1.42856 13.5714 1.42856H17.8571C19.0402 1.42856 20 2.38838 20 3.57142V6.42856C20 7.61159 19.0402 8.57142 17.8571 8.57142H13.5714C12.3884 8.57142 11.4286 7.61159 11.4286 6.42856V3.57142Z" fill="currentColor"/>
</svg>

    Dashboard
  </Link>
</li>


<SidebarLinkGroup
                activeCondition={
                  pathname === '/insurrance' || pathname.includes('insurrance')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out  hover:text-[#0166FF] ${
                          (pathname === '/insurrance' ||
                            pathname.includes('insurrance')) ?
                          'text-[#0166FF]':'text-[#4F4F4F]'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        
                        

                        <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_55_287)">
<path d="M11.1111 16.6667C11.1563 16.6667 11.2014 16.6632 11.2465 16.6597C11.5208 16.9583 11.8229 17.2465 12.1597 17.5174C11.8472 17.684 11.4896 17.7812 11.1111 17.7812H2.22222C0.996528 17.7812 0 16.7847 0 15.559V2.22222C0 0.996528 0.996528 0 2.22222 0H7.64236C8.08333 0 8.50694 0.177083 8.81944 0.489583L12.8438 4.51042C13.1562 4.82292 13.3333 5.24653 13.3333 5.6875V7.1875L12.2222 7.63194V6.66667H8.33333C7.41319 6.66667 6.66667 5.92014 6.66667 5V1.11111H2.22222C1.60764 1.11111 1.11111 1.60764 1.11111 2.22222V15.5556C1.11111 16.1701 1.60764 16.6667 2.22222 16.6667H11.1111ZM12.2049 5.55556C12.1806 5.45833 12.1319 5.36806 12.059 5.29861L8.03472 1.27431C7.96181 1.20139 7.875 1.15278 7.77778 1.12847V5C7.77778 5.30556 8.02778 5.55556 8.33333 5.55556H12.2049ZM11.1146 10.4653C11.1597 12.3056 11.8993 14.9618 14.4444 16.3681V9.13194L11.1146 10.4653ZM18.8889 10.4653L15.5556 9.13194V16.3681C18.1042 14.9618 18.8403 12.3021 18.8854 10.4653H18.8889ZM15.3125 7.8368L19.4792 9.50347C19.7917 9.63194 20 9.9375 20 10.2778C20 12.4757 19.1007 16.1389 15.3194 17.7153C15.1146 17.8021 14.8819 17.8021 14.6771 17.7153C10.8993 16.1389 10 12.4757 10 10.2778C10 9.9375 10.2083 9.63194 10.5243 9.50347L14.691 7.8368C14.8889 7.75694 15.1111 7.75694 15.309 7.8368H15.3125Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_55_287">
<rect width="20" height="17.7778" fill="white"/>
</clipPath>
</defs>
</svg>

Insurance
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </Link>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">

                        

<li key={3}>
  <Link
    href={'/admin/insurrance'}
    className={`text-sm group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out hover:text-[#0166FF] ${
      pathname.slice(-10) =='insurrance' ? 'text-[#0166FF]':'text-[#4F4F4F]'
    }`}
  >
      Insurance Lists 
  </Link>
</li>

<li key={4}>
  <Link
    href={'/admin/insurrance/caremanagers'}
    className={`text-sm group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out  hover:text-[#0166FF] ${
      pathname.includes('caremanagers') ? 'text-[#0166FF]':'text-[#4F4F4F]'
    }`}
  >
      Care Managers
  </Link>
</li>











                          
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>



              <SidebarLinkGroup
                activeCondition={
                  pathname === '/agency' || pathname.includes('agency')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out   hover:text-[#0166FF] ${
                          (pathname === '/agency' ||
                            pathname.includes('agency')) ?
                          'text-[#0166FF]':'text-[#4F4F4F]'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        
                        

                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_55_302)">
<path d="M17.5 1.25C18.1914 1.25 18.75 1.80859 18.75 2.5V17.5C18.75 18.1914 18.1914 18.75 17.5 18.75H11.25C10.5586 18.75 10 18.1914 10 17.5V2.5C10 1.80859 10.5586 1.25 11.25 1.25H17.5ZM11.25 0C9.87109 0 8.75 1.12109 8.75 2.5V17.5C8.75 18.8789 9.87109 20 11.25 20H17.5C18.8789 20 20 18.8789 20 17.5V2.5C20 1.12109 18.8789 0 17.5 0H11.25ZM7.5 5H2.5C1.12109 5 0 6.12109 0 7.5V17.5C0 18.8789 1.12109 20 2.5 20H8.45312C8.12891 19.6406 7.875 19.2148 7.71094 18.75H2.5C1.80859 18.75 1.25 18.1914 1.25 17.5V7.5C1.25 6.80859 1.80859 6.25 2.5 6.25H7.5V5ZM3.4375 12.5C2.91797 12.5 2.5 12.918 2.5 13.4375V15.3125C2.5 15.832 2.91797 16.25 3.4375 16.25H5.3125C5.83203 16.25 6.25 15.832 6.25 15.3125V13.4375C6.25 12.918 5.83203 12.5 5.3125 12.5H3.4375ZM3.75 15V13.75H5V15H3.75ZM12.5 15.3125C12.5 15.832 12.918 16.25 13.4375 16.25H15.3125C15.832 16.25 16.25 15.832 16.25 15.3125V13.4375C16.25 12.918 15.832 12.5 15.3125 12.5H13.4375C12.918 12.5 12.5 12.918 12.5 13.4375V15.3125ZM13.75 15V13.75H15V15H13.75ZM3.4375 7.5C2.91797 7.5 2.5 7.91797 2.5 8.4375V10.3125C2.5 10.832 2.91797 11.25 3.4375 11.25H5.3125C5.83203 11.25 6.25 10.832 6.25 10.3125V8.4375C6.25 7.91797 5.83203 7.5 5.3125 7.5H3.4375ZM3.75 10V8.75H5V10H3.75ZM12.5 3.4375V5.3125C12.5 5.83203 12.918 6.25 13.4375 6.25H15.3125C15.832 6.25 16.25 5.83203 16.25 5.3125V3.4375C16.25 2.91797 15.832 2.5 15.3125 2.5H13.4375C12.918 2.5 12.5 2.91797 12.5 3.4375ZM13.75 3.75H15V5H13.75V3.75ZM13.4375 11.25H15.3125C15.832 11.25 16.25 10.832 16.25 10.3125V8.4375C16.25 7.91797 15.832 7.5 15.3125 7.5H13.4375C12.918 7.5 12.5 7.91797 12.5 8.4375V10.3125C12.5 10.832 12.918 11.25 13.4375 11.25ZM13.75 8.75H15V10H13.75V8.75Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_55_302">
<rect width="20" height="20" fill="white"/>
</clipPath>
</defs>
</svg>


Agency
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </Link>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">

                        

<li key={5}>
  <Link
    href={'/admin/agency'}
    className={`text-sm group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out   hover:text-[#0166FF] ${
      pathname.slice(-6) =='agency' ?'text-[#0166FF]':'text-[#4F4F4F]'
    }`}
  >
      Agency Lists
  </Link>
</li>

<li key={6}>
  <Link
    href={'/admin/agency/contract'}
    className={`text-sm group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out  hover:text-[#0166FF] ${
      pathname.includes('contract') ? 'text-[#0166FF]':'text-[#4F4F4F]'
    }`}
  >
      Agency Contract
  </Link>
</li>



<li key={7}>
  <Link
    href={'/admin/agency/employee'}
    className={`text-sm group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out  hover:text-[#0166FF] ${
      pathname.includes('employee') ? 'text-[#0166FF]':'text-[#4F4F4F]'
    }`}
  >
      Agency Employee
  </Link>
</li>




                          
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>



              <SidebarLinkGroup
                activeCondition={
                  pathname === '/marketer' || pathname.includes('marketer')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out   hover:text-[#0166FF] ${
                          (pathname === '/marketer' ||
                            pathname.includes('marketer')) ?
                          'text-[#0166FF]':'text-[#4F4F4F]'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                                        

<svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_381_1274)">
<path d="M2.5 0C1.11875 0 0 1.11875 0 2.5V13.5C0 14.8813 1.11875 16 2.5 16H17.5C18.8813 16 20 14.8813 20 13.5V2.5C20 1.11875 18.8813 0 17.5 0H2.5ZM1 2.5C1 1.67188 1.67188 1 2.5 1H17.5C18.3281 1 19 1.67188 19 2.5V13.5C19 14.3281 18.3281 15 17.5 15H2.5C1.67188 15 1 14.3281 1 13.5V2.5ZM9 6C9 5.73478 9.10536 5.48043 9.29289 5.29289C9.48043 5.10536 9.73478 5 10 5C10.2652 5 10.5196 5.10536 10.7071 5.29289C10.8946 5.48043 11 5.73478 11 6C11 6.26522 10.8946 6.51957 10.7071 6.70711C10.5196 6.89464 10.2652 7 10 7C9.73478 7 9.48043 6.89464 9.29289 6.70711C9.10536 6.51957 9 6.26522 9 6ZM12 6C12 5.46957 11.7893 4.96086 11.4142 4.58579C11.0391 4.21071 10.5304 4 10 4C9.46957 4 8.96086 4.21071 8.58579 4.58579C8.21071 4.96086 8 5.46957 8 6C8 6.53043 8.21071 7.03914 8.58579 7.41421C8.96086 7.78929 9.46957 8 10 8C10.5304 8 11.0391 7.78929 11.4142 7.41421C11.7893 7.03914 12 6.53043 12 6ZM11.25 10C11.8562 10 12.3594 10.4281 12.475 11H7.525C7.64062 10.4281 8.14375 10 8.75 10H11.25ZM8.75 9C7.50625 9 6.5 10.0063 6.5 11.25C6.5 11.6656 6.83437 12 7.25 12H12.75C13.1656 12 13.5 11.6656 13.5 11.25C13.5 10.0063 12.4937 9 11.25 9H10H8.75ZM4.99375 5.5C4.99375 5.36739 5.04643 5.24021 5.1402 5.14645C5.23396 5.05268 5.36114 5 5.49375 5C5.62636 5 5.75354 5.05268 5.8473 5.14645C5.94107 5.24021 5.99375 5.36739 5.99375 5.5C5.99375 5.63261 5.94107 5.75979 5.8473 5.85355C5.75354 5.94732 5.62636 6 5.49375 6C5.36114 6 5.23396 5.94732 5.1402 5.85355C5.04643 5.75979 4.99375 5.63261 4.99375 5.5ZM6.99375 5.5C6.99375 5.30302 6.95495 5.10796 6.87957 4.92597C6.80419 4.74399 6.6937 4.57863 6.55441 4.43934C6.41512 4.30005 6.24976 4.18956 6.06778 4.11418C5.88579 4.0388 5.69073 4 5.49375 4C5.29677 4 5.10171 4.0388 4.91972 4.11418C4.73774 4.18956 4.57238 4.30005 4.43309 4.43934C4.2938 4.57863 4.18331 4.74399 4.10793 4.92597C4.03255 5.10796 3.99375 5.30302 3.99375 5.5C3.99375 5.69698 4.03255 5.89204 4.10793 6.07403C4.18331 6.25601 4.2938 6.42137 4.43309 6.56066C4.57238 6.69995 4.73774 6.81044 4.91972 6.88582C5.10171 6.9612 5.29677 7 5.49375 7C5.69073 7 5.88579 6.9612 6.06778 6.88582C6.24976 6.81044 6.41512 6.69995 6.55441 6.56066C6.6937 6.42137 6.80419 6.25601 6.87957 6.07403C6.95495 5.89204 6.99375 5.69698 6.99375 5.5ZM4 9.75C4 9.33438 4.33437 9 4.75 9H6.5C6.775 9 7 8.775 7 8.5C7 8.225 6.775 8 6.5 8H4.75C3.78437 8 3 8.78438 3 9.75V10C3 10.275 3.225 10.5 3.5 10.5C3.775 10.5 4 10.275 4 10V9.75ZM14.5063 5C14.6389 5 14.766 5.05268 14.8598 5.14645C14.9536 5.24021 15.0063 5.36739 15.0063 5.5C15.0063 5.63261 14.9536 5.75979 14.8598 5.85355C14.766 5.94732 14.6389 6 14.5063 6C14.3736 6 14.2465 5.94732 14.1527 5.85355C14.0589 5.75979 14.0063 5.63261 14.0063 5.5C14.0063 5.36739 14.0589 5.24021 14.1527 5.14645C14.2465 5.05268 14.3736 5 14.5063 5ZM14.5063 7C14.7032 7 14.8983 6.9612 15.0803 6.88582C15.2623 6.81044 15.4276 6.69995 15.5669 6.56066C15.7062 6.42137 15.8167 6.25601 15.8921 6.07403C15.9675 5.89204 16.0063 5.69698 16.0063 5.5C16.0063 5.30302 15.9675 5.10796 15.8921 4.92597C15.8167 4.74399 15.7062 4.57863 15.5669 4.43934C15.4276 4.30005 15.2623 4.18956 15.0803 4.11418C14.8983 4.0388 14.7032 4 14.5063 4C14.3093 4 14.1142 4.0388 13.9322 4.11418C13.7502 4.18956 13.5849 4.30005 13.4456 4.43934C13.3063 4.57863 13.1958 4.74399 13.1204 4.92597C13.045 5.10796 13.0063 5.30302 13.0063 5.5C13.0063 5.69698 13.045 5.89204 13.1204 6.07403C13.1958 6.25601 13.3063 6.42137 13.4456 6.56066C13.5849 6.69995 13.7502 6.81044 13.9322 6.88582C14.1142 6.9612 14.3093 7 14.5063 7ZM15.25 9C15.6656 9 16 9.33438 16 9.75V10C16 10.275 16.225 10.5 16.5 10.5C16.775 10.5 17 10.275 17 10V9.75C17 8.78438 16.2156 8 15.25 8H13.5C13.225 8 13 8.225 13 8.5C13 8.775 13.225 9 13.5 9H15.25Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_381_1274">
<rect width="20" height="16" fill="white"/>
</clipPath>
</defs>
</svg>


Marketer
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </Link>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">

                        

<li key={15}>
  <Link
    href={'/admin/marketer'}
    className={`text-sm group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out   hover:text-[#0166FF] ${
      pathname.slice(-8) =='marketer' ?'text-[#0166FF]':'text-[#4F4F4F]'
    }`}
  >
      Marketer Lists
  </Link>
</li>

                          
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>



              <SidebarLinkGroup
                activeCondition={
                  pathname === '/patient' || pathname.includes('patient')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out   hover:text-[#0166FF] ${
                          (pathname === '/patient' ||
                            pathname.includes('patient')) ?
                          'text-[#0166FF]':'text-[#4F4F4F]'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        
                        

                        


<svg width="23" height="20" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_346_31)">
<path d="M2.5 0C1.12109 0 0 1.12109 0 2.5V17.5C0 18.8789 1.12109 20 2.5 20H10C10.125 20 10.25 19.9922 10.3711 19.9727C10.1562 19.6133 10.0234 19.1953 10.0039 18.75H10H2.5C1.80859 18.75 1.25 18.1914 1.25 17.5V16.25H5.625C5.96875 16.25 6.25 15.9688 6.25 15.625C6.25 15.2812 5.96875 15 5.625 15H1.25V12.5H5.625C5.96875 12.5 6.25 12.2188 6.25 11.875C6.25 11.5312 5.96875 11.25 5.625 11.25H1.25V2.5C1.25 1.80859 1.80859 1.25 2.5 1.25H10C10.6914 1.25 11.25 1.80859 11.25 2.5V13.125V15.3672C11.6094 14.9688 12.0312 14.6289 12.5 14.3672V13.125V10.6172V2.5C12.5 1.12109 11.3789 0 10 0H2.5ZM5.625 3.125C5.10547 3.125 4.6875 3.54297 4.6875 4.0625V4.6875H4.0625C3.54297 4.6875 3.125 5.10547 3.125 5.625V6.875C3.125 7.39453 3.54297 7.8125 4.0625 7.8125H4.6875V8.4375C4.6875 8.95703 5.10547 9.375 5.625 9.375H6.875C7.39453 9.375 7.8125 8.95703 7.8125 8.4375V7.8125H8.4375C8.95703 7.8125 9.375 7.39453 9.375 6.875V5.625C9.375 5.10547 8.95703 4.6875 8.4375 4.6875H7.8125V4.0625C7.8125 3.54297 7.39453 3.125 6.875 3.125H5.625ZM5.9375 5.3125V4.375H6.5625V5.3125C6.5625 5.65625 6.84375 5.9375 7.1875 5.9375H8.125V6.5625H7.1875C6.84375 6.5625 6.5625 6.84375 6.5625 7.1875V8.125H5.9375V7.1875C5.9375 6.84375 5.65625 6.5625 5.3125 6.5625H4.375V5.9375H5.3125C5.65625 5.9375 5.9375 5.65625 5.9375 5.3125ZM15 10.625C15 10.1277 15.1975 9.65081 15.5492 9.29917C15.9008 8.94754 16.3777 8.75 16.875 8.75C17.3723 8.75 17.8492 8.94754 18.2008 9.29917C18.5525 9.65081 18.75 10.1277 18.75 10.625C18.75 11.1223 18.5525 11.5992 18.2008 11.9508C17.8492 12.3025 17.3723 12.5 16.875 12.5C16.3777 12.5 15.9008 12.3025 15.5492 11.9508C15.1975 11.5992 15 11.1223 15 10.625ZM20 10.625C20 9.7962 19.6708 9.00134 19.0847 8.41529C18.4987 7.82924 17.7038 7.5 16.875 7.5C16.0462 7.5 15.2513 7.82924 14.6653 8.41529C14.0792 9.00134 13.75 9.7962 13.75 10.625C13.75 11.4538 14.0792 12.2487 14.6653 12.8347C15.2513 13.4208 16.0462 13.75 16.875 13.75C17.7038 13.75 18.4987 13.4208 19.0847 12.8347C19.6708 12.2487 20 11.4538 20 10.625ZM12.5 18.6367C12.5 17.3203 13.5703 16.25 14.8867 16.25H18.8633C20.1797 16.25 21.25 17.3203 21.25 18.6367C21.25 18.6992 21.1992 18.75 21.1367 18.75H12.6133C12.5508 18.75 12.5 18.6992 12.5 18.6367ZM14.8867 15C12.8789 15 11.25 16.6289 11.25 18.6367C11.25 19.3906 11.8594 20 12.6133 20H21.1367C21.8906 20 22.5 19.3906 22.5 18.6367C22.5 16.6289 20.8711 15 18.8633 15H16.875H14.8867Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_346_31">
<rect width="22.5" height="20" fill="white"/>
</clipPath>
</defs>
</svg>



Patient
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </Link>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">

                        

<li key={30}>
  <Link
    href={'/admin/patient'}
    className={`text-sm group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out   hover:text-[#0166FF] ${
      pathname.slice(-7) =='patient' ?'text-[#0166FF]':'text-[#4F4F4F]'
    }`}
  >
      Patient Lists
  </Link>
</li>








                          
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>


              <SidebarLinkGroup
                activeCondition={
                  pathname === '/caregiver' || pathname.includes('caregiver')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out   hover:text-[#0166FF] ${
                          (pathname === '/caregiver' ||
                            pathname.includes('caregiver')) ?
                          'text-[#0166FF]':'text-[#4F4F4F]'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                                        

<svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_381_1274)">
<path d="M2.5 0C1.11875 0 0 1.11875 0 2.5V13.5C0 14.8813 1.11875 16 2.5 16H17.5C18.8813 16 20 14.8813 20 13.5V2.5C20 1.11875 18.8813 0 17.5 0H2.5ZM1 2.5C1 1.67188 1.67188 1 2.5 1H17.5C18.3281 1 19 1.67188 19 2.5V13.5C19 14.3281 18.3281 15 17.5 15H2.5C1.67188 15 1 14.3281 1 13.5V2.5ZM9 6C9 5.73478 9.10536 5.48043 9.29289 5.29289C9.48043 5.10536 9.73478 5 10 5C10.2652 5 10.5196 5.10536 10.7071 5.29289C10.8946 5.48043 11 5.73478 11 6C11 6.26522 10.8946 6.51957 10.7071 6.70711C10.5196 6.89464 10.2652 7 10 7C9.73478 7 9.48043 6.89464 9.29289 6.70711C9.10536 6.51957 9 6.26522 9 6ZM12 6C12 5.46957 11.7893 4.96086 11.4142 4.58579C11.0391 4.21071 10.5304 4 10 4C9.46957 4 8.96086 4.21071 8.58579 4.58579C8.21071 4.96086 8 5.46957 8 6C8 6.53043 8.21071 7.03914 8.58579 7.41421C8.96086 7.78929 9.46957 8 10 8C10.5304 8 11.0391 7.78929 11.4142 7.41421C11.7893 7.03914 12 6.53043 12 6ZM11.25 10C11.8562 10 12.3594 10.4281 12.475 11H7.525C7.64062 10.4281 8.14375 10 8.75 10H11.25ZM8.75 9C7.50625 9 6.5 10.0063 6.5 11.25C6.5 11.6656 6.83437 12 7.25 12H12.75C13.1656 12 13.5 11.6656 13.5 11.25C13.5 10.0063 12.4937 9 11.25 9H10H8.75ZM4.99375 5.5C4.99375 5.36739 5.04643 5.24021 5.1402 5.14645C5.23396 5.05268 5.36114 5 5.49375 5C5.62636 5 5.75354 5.05268 5.8473 5.14645C5.94107 5.24021 5.99375 5.36739 5.99375 5.5C5.99375 5.63261 5.94107 5.75979 5.8473 5.85355C5.75354 5.94732 5.62636 6 5.49375 6C5.36114 6 5.23396 5.94732 5.1402 5.85355C5.04643 5.75979 4.99375 5.63261 4.99375 5.5ZM6.99375 5.5C6.99375 5.30302 6.95495 5.10796 6.87957 4.92597C6.80419 4.74399 6.6937 4.57863 6.55441 4.43934C6.41512 4.30005 6.24976 4.18956 6.06778 4.11418C5.88579 4.0388 5.69073 4 5.49375 4C5.29677 4 5.10171 4.0388 4.91972 4.11418C4.73774 4.18956 4.57238 4.30005 4.43309 4.43934C4.2938 4.57863 4.18331 4.74399 4.10793 4.92597C4.03255 5.10796 3.99375 5.30302 3.99375 5.5C3.99375 5.69698 4.03255 5.89204 4.10793 6.07403C4.18331 6.25601 4.2938 6.42137 4.43309 6.56066C4.57238 6.69995 4.73774 6.81044 4.91972 6.88582C5.10171 6.9612 5.29677 7 5.49375 7C5.69073 7 5.88579 6.9612 6.06778 6.88582C6.24976 6.81044 6.41512 6.69995 6.55441 6.56066C6.6937 6.42137 6.80419 6.25601 6.87957 6.07403C6.95495 5.89204 6.99375 5.69698 6.99375 5.5ZM4 9.75C4 9.33438 4.33437 9 4.75 9H6.5C6.775 9 7 8.775 7 8.5C7 8.225 6.775 8 6.5 8H4.75C3.78437 8 3 8.78438 3 9.75V10C3 10.275 3.225 10.5 3.5 10.5C3.775 10.5 4 10.275 4 10V9.75ZM14.5063 5C14.6389 5 14.766 5.05268 14.8598 5.14645C14.9536 5.24021 15.0063 5.36739 15.0063 5.5C15.0063 5.63261 14.9536 5.75979 14.8598 5.85355C14.766 5.94732 14.6389 6 14.5063 6C14.3736 6 14.2465 5.94732 14.1527 5.85355C14.0589 5.75979 14.0063 5.63261 14.0063 5.5C14.0063 5.36739 14.0589 5.24021 14.1527 5.14645C14.2465 5.05268 14.3736 5 14.5063 5ZM14.5063 7C14.7032 7 14.8983 6.9612 15.0803 6.88582C15.2623 6.81044 15.4276 6.69995 15.5669 6.56066C15.7062 6.42137 15.8167 6.25601 15.8921 6.07403C15.9675 5.89204 16.0063 5.69698 16.0063 5.5C16.0063 5.30302 15.9675 5.10796 15.8921 4.92597C15.8167 4.74399 15.7062 4.57863 15.5669 4.43934C15.4276 4.30005 15.2623 4.18956 15.0803 4.11418C14.8983 4.0388 14.7032 4 14.5063 4C14.3093 4 14.1142 4.0388 13.9322 4.11418C13.7502 4.18956 13.5849 4.30005 13.4456 4.43934C13.3063 4.57863 13.1958 4.74399 13.1204 4.92597C13.045 5.10796 13.0063 5.30302 13.0063 5.5C13.0063 5.69698 13.045 5.89204 13.1204 6.07403C13.1958 6.25601 13.3063 6.42137 13.4456 6.56066C13.5849 6.69995 13.7502 6.81044 13.9322 6.88582C14.1142 6.9612 14.3093 7 14.5063 7ZM15.25 9C15.6656 9 16 9.33438 16 9.75V10C16 10.275 16.225 10.5 16.5 10.5C16.775 10.5 17 10.275 17 10V9.75C17 8.78438 16.2156 8 15.25 8H13.5C13.225 8 13 8.225 13 8.5C13 8.775 13.225 9 13.5 9H15.25Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_381_1274">
<rect width="20" height="16" fill="white"/>
</clipPath>
</defs>
</svg>


Caregiver
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </Link>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">

                        

<li key={31}>
  <Link
    href={'/admin/caregiver'}
    className={`text-sm group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out   hover:text-[#0166FF] ${
      pathname.slice(-9) =='caregiver' ?'text-[#0166FF]':'text-[#4F4F4F]'
    }`}
  >
      Caregiver Lists
  </Link>
</li>

                          
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>



            
            </ul>

          

 

    
          </div>

                    
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
