"use client";
import DefaultLayout from "@/app/layout/DefaultLayout";
import Link from "next/link";
import { useState,useEffect, useRef } from "react";
import axios from "axios";
import useAuth from '@/app/hooks/useAuth';
import { useRouter } from "next/navigation";
import {Formik, Field, yupToFormErrors, validateYupSchema, FieldArray} from 'formik';
import { DataSchema,DataLabel,ValidationSchema } from "./DataValidationSchema";
import SelectNonCreatableComponent from '@/app/components/SelectNonCreatableComponent';
import FormikFormHolder from "@/app/components/form/FormikFormHolder";
import FormikFieldInput from "@/app/components/form/FormikFieldInput";
import FormikSelectInput from "@/app/components/form/FormikSelectInput";

import toast from 'react-hot-toast';

import {WeekDays} from '@/app/data/PatientOptions.json'
import FileUpload from "@/app/components/utils/FileUpload";



const url = process.env.NEXT_PUBLIC_API_URL;
export default function CaregiverCreate() {
    const authCtx = useAuth();
    const router = useRouter()
    const formRef = useRef<any>(null);

    const [fetchFomrData,setFetchFormData] = useState(DataSchema);

    const fetchdata = fetchFomrData;

    const handleFormSubmit = async(values:any,{ resetForm }:any)=>{
        //alert(JSON.stringify(values));

        await axios.post(`${url}save-caregiver`, 
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
                                    href={'/admin/caregiver'}
                                    className={`text-[21px] capitalize group relative flex items-center gap-2 rounded-sm py-[3px] font-medium duration-300 ease-in-out   text-[#0166FF]`}
                                >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" width={15} height={15} viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                                </svg>


                                <p className="">Back</p>
                            </Link>
                    </div>
                    <div className="ml-[50px] pt-[5px]">
                        <span className="text-[25px] font-medium capitalize text-[#4F4F4F]">Add Caregiver</span>
                    </div>
                </div>
            
            </div>

            <div className="mt-[32px] flex flex-row">
<div className="w-full">
            <Formik
            innerRef={formRef}
        initialValues={{ fetchdata }}
        validationSchema={ValidationSchema}
        

        onSubmit={handleFormSubmit}

        render={({isValid, handleChange, isSubmitting,values,errors, touched, setFieldValue, setFieldTouched})=>(
            <FormikFormHolder legend="Caregiver Details">

<div className="flex flex-row">
    <div className="w-[50%]">
        
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
    
    <div className="ml-[24px] w-[50%]">

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
    <div className="w-[50%]">
        
            
    <FormikFieldInput 
        label={DataLabel.phoneNumber} 
        name={`fetchdata.phoneNumber`}
        type="tel"        
        placeHolder={`${DataLabel.phoneNumber}`}
        errorMessage ={ errors.fetchdata &&                                        
            errors.fetchdata.phoneNumber &&
            touched.fetchdata &&            
            touched.fetchdata.phoneNumber &&  errors.fetchdata.phoneNumber}        
        />

        
        
        
    </div>
    
    <div className="ml-[24px] w-[50%]">

    <FormikFieldInput 
        label={DataLabel.email} 
        name={`fetchdata.email`}
        type="email"
        placeHolder={`${DataLabel.email}`}
        errorMessage ={ errors.fetchdata &&                                        
            errors.fetchdata.email &&
            touched.fetchdata &&            
            touched.fetchdata.email &&  errors.fetchdata.email}        
        />
        
        
    </div>
</div>


<div className="flex flex-row">
    <div className="w-[50%]">
        
        <FormikFieldInput
        type="number" 
        label={DataLabel.bank_acc_no} 
        name={`fetchdata.bank_acc_no`}
        placeHolder={`${DataLabel.bank_acc_no}`}
        errorMessage ={ errors.fetchdata &&                                        
            errors.fetchdata.bank_acc_no &&
            touched.fetchdata &&            
            touched.fetchdata.bank_acc_no &&  errors.fetchdata.bank_acc_no}
        
        />
        
        
        
    </div>
    
    <div className="ml-[24px] w-[50%]">

    <FormikFieldInput 
    type="number" 
        label={DataLabel.bank_routing_no} 
        name={`fetchdata.bank_routing_no`}
        placeHolder={`${DataLabel.bank_routing_no}`}
        errorMessage ={ errors.fetchdata &&                                        
            errors.fetchdata.bank_routing_no &&
            touched.fetchdata &&            
            touched.fetchdata.bank_routing_no &&  errors.fetchdata.bank_routing_no}        
        />
        
        
    </div>
</div>

<div className="flex flex-row">
    <div className="w-[50%]">
        
        <FormikFieldInput 
        label={DataLabel.ssn} 
        name={`fetchdata.ssn`}
        placeHolder={`${DataLabel.ssn}`}
        errorMessage ={ errors.fetchdata &&                                        
            errors.fetchdata.ssn &&
            touched.fetchdata &&            
            touched.fetchdata.ssn &&  errors.fetchdata.ssn}
        
        />
        
        
        
    </div>
    
   
</div>

<p className="text-[16px] uppercase font-medium mt-5"> Working Schedule Section</p>

<hr className="mt-2 border-stroke"/>

<div className="flex flex-row">

    <div className="w-[100%]">

    <FieldArray name="fetchdata.working_schedule">
          {({ insert, remove, push }:any) => (
            <div>
              {values.fetchdata.working_schedule.length > 0 &&
                values.fetchdata.working_schedule.map((field, index) => (
                  <div key={index} className="flex flex-row">
                    <div className="w-[30%]">

                    <FormikSelectInput
            label={DataLabel.weekDay}
            defaultValue={fetchdata.working_schedule[index]?.weekDay}
            placeHolder={``}
            isSearchable={true}
            isClearable={true}
            name={`fetchdata.working_schedule.${index}.weekDay`}
            dataOptions={WeekDays}
            errorMessage={''}
        />
                    
                    </div>
                    <div className="ml-[10px] w-[25%]">                    
                    <FormikFieldInput 
                    type="number"
                    min="0"
                    max="23"
                    label={DataLabel.from} 
                    name={`fetchdata.working_schedule.${index}.from`}
                    placeHolder={`${DataLabel.from}`}
                    errorMessage ={''}        
                    />
                    </div>
                    <div className="ml-[10px] w-[25%]"> 
                    <FormikFieldInput 
                    type="number"
                    min="0"
                    max="23"
                    label={DataLabel.to} 
                    name={`fetchdata.working_schedule.${index}.to`}
                    placeHolder={`${DataLabel.to}`}
                    errorMessage ={''}        
                    />
                    </div>
                    
                    
                    <div className="ml-[10px] w-[20%]">
                    <button
                      type="button"
                      className="bg-meta-1 rounded text-white mt-10 ml-8"
                      onClick={() => remove(index)}
                    >
                      <p className="py-2 px-2">Remove</p>
                    </button>
                    </div>
                    
                    </div>

                  
                ))}

            <div className="flex flex-row">
                <div className="w-[30%]">    
                    <button
                        type="button"
                        className=" bg-meta-5 rounded text-white mt-10 ml-8 flex items-center gap-2.5 py-1 px-2"
                        onClick={() => push({ weekDay: {'label':'','value':''}, from: 0, to: 0 })}
                    >

<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={20} height={20} strokeWidth="1.5" stroke="currentColor" className="">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        <p className="py-2 px-2">Add More</p>
                    </button>
                </div>
            </div>
              
            </div>
          )}
        </FieldArray>

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

            <div className="w-[full]">

            <div className="flex flex-row mt-[32px]">

                <div>
                    <FileUpload onFileUpload={(fileId: string)=>{}} chunkUrl={`${url}upload-chunk`} />
                </div>

            </div>



            </div>

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
                                    href={'/admin/caregiver'}
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