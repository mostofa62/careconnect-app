"use client";
import DefaultLayout from "@/app/layout/DefaultLayout";
import Link from "next/link";
import { useState, useRef } from "react";
import axios from "axios";
import useAuth from '@/app/hooks/useAuth';
import { useRouter } from "next/navigation";
import {Formik} from 'formik';
import { DataSchema,DataLabel,ValidationSchema,CountyData } from "./DataValidationSchema";
import FormikFormHolder from "@/app/components/form/FormikFormHolder";
import FormikFieldInput from "@/app/components/form/FormikFieldInput";
import FormikSelectInput from "@/app/components/form/FormikSelectInput";
import useFetchDropDownData from "@/app/hooks/useFetchDropDownData";

import toast from 'react-hot-toast';

const url = process.env.NEXT_PUBLIC_API_URL;
export default function InsuranceCreate() {
    const authCtx = useAuth();
    const router = useRouter()
    const formRef = useRef<any>(null);    

    //const [fetchFomrData,setFetchFormData] = useState(DataSchema);

    const fetchdata = DataSchema;

    const agencyData = useFetchDropDownData({urlSuffix:'agencys-dropdown'});

    const insuranceData = useFetchDropDownData({urlSuffix:'insurances-dropdown'});
    

    const handleFormSubmit = async(values:any,{ resetForm }:any)=>{
        //alert(JSON.stringify(values));

        await axios.post(`${url}save-agency-rate`, 
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
            resetForm();
          }         
          
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

            

        <div className="mt-[40px]">
                <div className="flex flex-row h-[29px]">
                    <div className="h-[21px] pt-[5px] pb-[3px]">
                            <Link
                                    href={'/admin/agency/contract'}
                                    className={`text-[21px] capitalize group relative flex items-center gap-2 rounded-sm py-[3px] font-medium duration-300 ease-in-out   text-[#0166FF]`}
                                >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" width={15} height={15} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                                </svg>


                                <p className="">Back</p>
                            </Link>
                    </div>
                    <div className="ml-[50px] pt-[5px]">
                        <span className="text-[25px] font-medium capitalize text-[#4F4F4F]">Add Agency Rate</span>
                    </div>
                </div>
            
            </div>

            <div className="mt-[32px]">
            <Formik
            innerRef={formRef}
        initialValues={{ fetchdata }}
        validationSchema={ValidationSchema}
        

        onSubmit={handleFormSubmit}

        render={({isValid, handleChange, isSubmitting,values,errors, touched, setFieldValue, setFieldTouched})=>(
            <FormikFormHolder legend="Agency Rate">

<div className="flex flex-row">
    <div className="w-[50%]">
        
        <FormikSelectInput
            label={DataLabel.agency}
            defaultValue={fetchdata.agency}
            placeHolder={`Select ${DataLabel.agency}`}
            isSearchable={true}
            isClearable={true}
            name="fetchdata.agency"
            dataOptions={agencyData}
            errorMessage={errors.fetchdata &&
                errors.fetchdata.agency &&
                touched.fetchdata &&
                touched.fetchdata.agency &&
                errors.fetchdata.agency.label
            }
        />
        
        
        
    </div>
    
    <div className="ml-[24px] w-[50%]">

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


<div className="flex flex-row">
    <div className="w-[50%]">

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
    
    <div className="ml-[24px] w-[50%]">

    <FormikFieldInput
   
        label={DataLabel.rate} 
        name={`fetchdata.rate`}
        placeHolder={`${DataLabel.rate}`}
        errorMessage ={ errors.fetchdata &&                                        
            errors.fetchdata.rate &&
            touched.fetchdata &&            
            touched.fetchdata.rate &&  errors.fetchdata.rate}
            min={0}
            type={`number`} 
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
            

            <div className="mt-[100px]">
                <div className="flex flex-row-reverse gap-4">
                    <div className="relative right-5 top-0">
                        <button className="text-[15px] h-[40px] bg-[#0166FF] rounded text-white px-4  capitalize text-center font-semibold" onClick={handleSubmit}>
                            Save
                        </button>
                    </div>
                    <div className="relative right-[30px] top-[10px]">
                    <Link
                                    href={'/admin/agency/contract'}
                                    className={`text-[15px] h-[40px] capitalize text-center px-4 py-2.5  font-semibold bg-[#0166FF] rounded bg-opacity-5 text-[#0166FF]`}
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