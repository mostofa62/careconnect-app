import {Field} from 'formik';
import { ReactNode } from 'react';

interface FormHolderProps{
    label:string;
    name:string;
    placeHolder:string;   
    errorMessage:string|false|undefined;
    onChangeField?:(e:any)=>void,
    type?:string;

}

export default function FormikFieldInput({
    label,
    name,
    placeHolder,    
    errorMessage,
    onChangeField,
    type
    }:FormHolderProps){
        

        return (
            <>
            <label className="mb-[10px] block text-[16px] font-medium text-[#000000]">
                {label}
            </label>
            <div className="relative">
             <Field
             type={type?type:'text'} 
             className="w-full rounded border border-stroke bg-transparent py-2 pl-6 pr-10 outline-none focus:border-[#0a4a82] focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-[#0a4a82]"
             name={name} placeholder={`Provide ${placeHolder}`} onchange={onChangeField?onChangeField:(e:any)=>{}}  />
                   {errorMessage &&

                        <span className="mt-5 ml-1 font-semibold text-[#B45454]">
                                                {errorMessage}
                                            </span>  
                    }
                  

                                         
        </div>
            </>
        )

}