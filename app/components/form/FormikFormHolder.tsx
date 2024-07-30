import {Form} from 'formik';
import { ReactNode } from 'react';
interface FormHolderProps{
    legend:string;
    children:ReactNode
}

export default function FormikFormHolder({legend,children}:FormHolderProps){


    return(
        <>
        <span className="text-[#0166FF] font-bold relative top-[10px] left-[15px] px-[6px] bg-white  text-[1rem] text-center">
                {legend}
        </span>
        <Form className="border-[1px] rounded w-[70%] border-[#909aa3] pb-3">

           
            {children}
        </Form>
        </>
    )

}