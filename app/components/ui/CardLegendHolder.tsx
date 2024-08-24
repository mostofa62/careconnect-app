import {Form} from 'formik';
import { ReactNode } from 'react';
interface CardLegendHolderProps{
    legend:string;
    children:ReactNode
}

export default function CardLegendHolder({legend,children}:CardLegendHolderProps){


    return(
        <>
        <span className="text-[#0166FF] font-medium relative top-[10px] left-[22px] px-[6px] bg-white  text-[20px] text-center">
                {legend}
        </span>
        <div className="cuform border-[1px] rounded  border-[#C3C9CE] px-[24px] pt-[36px] pb-[24px]">

           
            {children}
        </div>
        </>
    )

}