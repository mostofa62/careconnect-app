"use client";
import DefaultLayout from "@/app/layout/DefaultLayout";
import Link from "next/link";
import { useState,useEffect, useRef, useCallback,useMemo } from "react";
import axios from "axios";
import useAuth from '@/app/hooks/useAuth';
import { useRouter } from "next/navigation";
import {Formik, Field, yupToFormErrors, validateYupSchema} from 'formik';
import { DataSchema,DataLabel,ValidationSchema,CountyData } from "../DataValidationSchema";
import SelectNonCreatableComponent from '@/app/components/SelectNonCreatableComponent';
import FormikFormHolder from "@/app/components/form/FormikFormHolder";
import FormikFieldInput from "@/app/components/form/FormikFieldInput";
import FormikSelectInput from "@/app/components/form/FormikSelectInput";
import useFetchDropDownData from "@/app/hooks/useFetchDropDownData";
import toast from 'react-hot-toast';

const url = process.env.NEXT_PUBLIC_API_URL;
export default function InsuranceCreate({
    params,
    searchParams
  }:{
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
  
  }) {
    const authCtx = useAuth();
    const router = useRouter()
    const formRef = useRef<any>(null);
    

    const [fetchFomrData,setFetchFormData] = useState(DataSchema);
    //console.log(fetchFomrData)
    
      
    const id = params.id;
    const fetchDataCallback=useCallback(async()=>{
        //console.log(id);
        const response = await axios.get(`${url}caremanager/${id}`);
        //return response.data.user;
        setFetchFormData(response.data.caremanager);
    },[id]);
    useEffect(()=>{
        fetchDataCallback();
    
    },[fetchDataCallback]);
    const fetchdata = fetchFomrData;
    //console.log(fetchdata);

    const insuranceData = useFetchDropDownData({urlSuffix:'insurances-dropdown'});

    const handleFormSubmit = async(values:any,{ resetForm }:any)=>{
        //alert(JSON.stringify(values));
        
        await axios.post(`${url}save-caremanager/${id}`, 
            values.fetchdata, {
            
            headers: {
              'Content-Type': 'application/json'
            }
          }
        ) .then(function (response) {
          //console.log(response);

          if(response.data.error > 0){
            toast.error(response.data.message);
          }else{
            toast.success(response.data.message);
            router.push('/admin/insurrance/caremanagers');
            //resetForm();
          }
          /*
          if(response.data.insurance_id!=null){

            resetForm();

            
            
            
            //router.push('/admin/insurrance/cu');
          }*/
          
        })
        .catch(function (error) {
            toast.error(error);
          //console.log(error);
        });
        

    }

    const handleSubmit = ()=> {
        formRef.current?.handleSubmit();
      }

    return(
        <>
        <DefaultLayout>
        <div className="grid grid-flow-row">

           

            <div className="mt-4">
                <div className="flex flex-row">
                    <div className="">
                            <Link
                                    href={'/admin/insurrance/caremanagers'}
                                    className={`text-xs capitalize group relative flex items-center gap-2 rounded-sm py-2 font-medium duration-300 ease-in-out   text-[#0166FF]`}
                                >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" width={15} height={15} viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                                </svg>


                                Back
                            </Link>
                    </div>
                    <div className="ml-4">
                        <span className="text-lg font-bold capitalize text-[#4F4F4F]">Update Caremanager</span>
                    </div>
                </div>
            
            </div>

            <div className="mt-8">
            <Formik
            innerRef={formRef}
        initialValues={{ fetchdata }}
        enableReinitialize
        validationSchema={ValidationSchema}
        

        onSubmit={handleFormSubmit}

        render={({isValid, handleChange, isSubmitting,values,errors, touched, setFieldValue, setFieldTouched})=>(
            <FormikFormHolder legend="Caremanager Details">

<div className="flex flex-row">
    <div className="p-3 w-[50%]">
    <FormikFieldInput 
        label={DataLabel.name} 
        name={`fetchdata.name`}
        placeHolder={`${DataLabel.name}`}
        errorMessage ={ errors.fetchdata &&                                        
            errors.fetchdata.name &&
            touched.fetchdata &&            
            touched.fetchdata.name &&  errors.fetchdata.name}
        onChangeField = {(e:any)=>{
            const {value, name} = e.target;
            setFieldValue(
                name,
                value
              );
        }}
        />
        
        
        
    </div>
    
    <div className="p-3 w-[50%]">
    <FormikFieldInput 
        label={DataLabel.address} 
        name={`fetchdata.address`}
        placeHolder={`${DataLabel.address}`}
        errorMessage ={ errors.fetchdata &&                                        
            errors.fetchdata.address &&
            touched.fetchdata &&            
            touched.fetchdata.address &&  errors.fetchdata.address}        
        />
        
    </div>
</div>


<div className="flex flex-row">
    <div className="p-3 w-[50%]">
    <FormikFieldInput 
        label={DataLabel.phoneNumber} 
        name={`fetchdata.phoneNumber`}
        placeHolder={`${DataLabel.phoneNumber}`}
        errorMessage ={ errors.fetchdata &&                                        
            errors.fetchdata.phoneNumber &&
            touched.fetchdata &&            
            touched.fetchdata.phoneNumber &&  errors.fetchdata.phoneNumber}        
        />
        
    </div>
    
    <div className="p-3 w-[50%]">
        <FormikFieldInput 
        label={DataLabel.zipCode} 
        name={`fetchdata.zipCode`}
        placeHolder={`${DataLabel.zipCode}`}
        errorMessage ={ errors.fetchdata &&                                        
            errors.fetchdata.zipCode &&
            touched.fetchdata &&            
            touched.fetchdata.zipCode &&  errors.fetchdata.zipCode}        
        />
        
    </div>
</div>


<div className="flex flex-row">
    <div className="p-3 w-[50%]">
    <FormikSelectInput
        label={DataLabel.county}
        defaultValue={fetchdata.county}
        placeHolder={`Select ${DataLabel.county}`}
        isSearchable={true}
        isClearable={true}
        name="fetchdata.county"
        dataOptions={CountyData}
        errorMessage={errors.fetchdata &&
            errors.fetchdata.county &&
            touched.fetchdata &&
            touched.fetchdata.county &&
            errors.fetchdata.county.label
        }
        />
        
    </div>
    
    
    <div className="p-3 w-[50%]">
    <FormikSelectInput
            label={DataLabel.insurance}
            defaultValue={fetchdata.insurance}
            placeHolder={`Select ${DataLabel.insurance}`}
            isSearchable={true}
            isClearable={true}
            name="fetchdata.insurance"
            dataOptions={insuranceData}
            errorMessage={errors.fetchdata &&
                errors.fetchdata.insurance &&
                touched.fetchdata &&
                touched.fetchdata.insurance &&
                errors.fetchdata.insurance.label
            }
        />
        
    </div>


</div>
{/*
<div className="flex flex-row">
    {JSON.stringify(values)}
    {JSON.stringify(errors)}
</div>
*/}

</FormikFormHolder>
        )}
        />
            </div>
            

            <div className="mt-6">
                <div className="flex flex-row-reverse gap-4">
                    <div className="relative right-3 top-0">
                        <button className="text-[15px] h-[35px] bg-[#0166FF] rounded text-white px-4  capitalize text-center font-semibold" onClick={handleSubmit}>
                            Save
                        </button>
                    </div>
                    <div className="relative right-5 top-[5px]">
                    <Link
                                    href={'/admin/insurrance'}
                                    className={`text-[15px] h-[35px] capitalize text-center px-4 py-2  font-semibold bg-[#0166FF] rounded bg-opacity-5 text-[#0166FF]`}
                                >                               


                                Cancel
                            </Link>
                    </div>
                    
                    

                </div> 
                
            </div>

        </div>
        </DefaultLayout>
        </>

    )
}