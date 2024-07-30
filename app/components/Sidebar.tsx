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
      className={`absolute left-0 top-0 z-9999 flex h-screen w-65 flex-col overflow-y-hidden duration-300 ease-linear lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
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
        */}
        <Image src={Logo} alt={app_name} className="" height={48}  />
      </div>
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
    
            <ul className="mb-6 flex flex-col gap-1.5">

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
<g clip-path="url(#clip0_55_287)">
<path d="M11.1111 16.6667C11.1563 16.6667 11.2014 16.6632 11.2465 16.6597C11.5208 16.9583 11.8229 17.2465 12.1597 17.5174C11.8472 17.684 11.4896 17.7812 11.1111 17.7812H2.22222C0.996528 17.7812 0 16.7847 0 15.559V2.22222C0 0.996528 0.996528 0 2.22222 0H7.64236C8.08333 0 8.50694 0.177083 8.81944 0.489583L12.8438 4.51042C13.1562 4.82292 13.3333 5.24653 13.3333 5.6875V7.1875L12.2222 7.63194V6.66667H8.33333C7.41319 6.66667 6.66667 5.92014 6.66667 5V1.11111H2.22222C1.60764 1.11111 1.11111 1.60764 1.11111 2.22222V15.5556C1.11111 16.1701 1.60764 16.6667 2.22222 16.6667H11.1111ZM12.2049 5.55556C12.1806 5.45833 12.1319 5.36806 12.059 5.29861L8.03472 1.27431C7.96181 1.20139 7.875 1.15278 7.77778 1.12847V5C7.77778 5.30556 8.02778 5.55556 8.33333 5.55556H12.2049ZM11.1146 10.4653C11.1597 12.3056 11.8993 14.9618 14.4444 16.3681V9.13194L11.1146 10.4653ZM18.8889 10.4653L15.5556 9.13194V16.3681C18.1042 14.9618 18.8403 12.3021 18.8854 10.4653H18.8889ZM15.3125 7.8368L19.4792 9.50347C19.7917 9.63194 20 9.9375 20 10.2778C20 12.4757 19.1007 16.1389 15.3194 17.7153C15.1146 17.8021 14.8819 17.8021 14.6771 17.7153C10.8993 16.1389 10 12.4757 10 10.2778C10 9.9375 10.2083 9.63194 10.5243 9.50347L14.691 7.8368C14.8889 7.75694 15.1111 7.75694 15.309 7.8368H15.3125Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_55_287">
<rect width="20" height="17.7778" fill="white"/>
</clipPath>
</defs>
</svg>

Insurrance
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
<g clip-path="url(#clip0_55_302)">
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



            
            </ul>

          

 

    
          </div>

                    
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
