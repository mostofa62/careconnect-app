import {ReactNode} from 'react';
import './CardHolder.css';

interface CardHolderType{

  title:string; 
  children: ReactNode; 
}

const CardHolder = ({title, children}:CardHolderType)=>{


return(    
<div className='mt-[43px]'>
        <span className="text-[#0166FF] font-medium relative top-[10px] left-[22px] px-[6px] bg-white  text-[20px] text-center">
                {title}
        </span>
        <div className="border-[1px] rounded w-full border-[#C3C9CE] px-[24px] pt-[36px] pb-[24px] h-full">

           
            {children}
        </div>
</div>
);

}
export default CardHolder;