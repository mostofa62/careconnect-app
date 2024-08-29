import {Field} from 'formik';
import RemoteSelect from '../RemoteSelect';
const url = process.env.NEXT_PUBLIC_API_URL;
const per_page:any = process.env.NEXT_PUBLIC_PER_PAGE;
interface FormHolderProps{
    urlSuffix:string;
    fetchLimit?:number;
    label:string;
    name:string;
    placeHolder:string;   
    errorMessage:string|false|undefined;
    defaultValue:{};    
    isSearchable:boolean;
    isClearable:boolean;
    onParentChangeSelect?:(value:any, name:any)=>void;       
}

export default function FormikSelectRemote({
    urlSuffix,
    fetchLimit,
    label,
    name,
    placeHolder,    
    errorMessage,
    defaultValue,    
    isSearchable,
    isClearable,
    onParentChangeSelect,
    }:FormHolderProps){
        
        const path = `${url}${urlSuffix}`;
        return (
            <>
            <label className="mb-[10px] block text-[16px] font-medium text-[#000000]">
                {label}
            </label>
            <div className="relative">
                
            <RemoteSelect defaultValueOptions={defaultValue}
                                 placeholder={`Select ${placeHolder}`}
                                 isSearchable={isSearchable}
                                 isClearable={isClearable}                                 
                                  name={name} 
                                  urlSuffix={path}
                                  onParentChange={
                                    onParentChangeSelect? 
                                    onParentChangeSelect:
                                    (value:any,name:any)=>{}
                                }
                                fetchLimit={fetchLimit? fetchLimit:per_page} 
                                  
                     />
             
                   {errorMessage &&

                        <span className="mt-5 ml-1 font-semibold text-[#B45454]">
                                                {errorMessage}
                                            </span>  
                    }
                  

                                         
            </div>
            </>
        )

}