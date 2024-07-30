import {Field} from 'formik';
import { ReactNode } from 'react';

interface FormHolderProps{
    label:string;
    name:string;
    placeHolder:string;   
    errorMessage:string|false|undefined;
    onChangeField?:(e:any)=>void   
}

export default function FormikFieldInput({
    label,
    name,
    placeHolder,    
    errorMessage,
    onChangeField,
    }:FormHolderProps){
        

        return (
            <>
            <label className="mb-2.5 block font-bold text-[#4F4F4F]">
                {label}
            </label>
            <div className="relative">
             {onChangeField ?   
            <Field 
                  className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 outline-none focus:border-[#0a4a82] focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-[#0a4a82]"
                  name={name} placeholder={`Provide ${placeHolder}`}  />

             : <Field 
             className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 outline-none focus:border-[#0a4a82] focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-[#0a4a82]"
             name={name} placeholder={`Provide ${placeHolder}`} onchange={onChangeField}  />}
                   {errorMessage &&

                        <span className="mt-5 ml-1 font-semibold text-[#B45454]">
                                                {errorMessage}
                                            </span>  
                    }
                  

                                         
        </div>
            </>
        )

}