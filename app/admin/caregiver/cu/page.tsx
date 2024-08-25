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

import {WeekDays, WorkingHour, TimeAmPm} from '@/app/data/PatientOptions.json'
import FileUpload from "@/app/components/utils/FileUpload";
import CardLegendHolder from "@/app/components/ui/CardLegendHolder";



const url = process.env.NEXT_PUBLIC_API_URL;
export default function CaregiverCreate() {
    const authCtx = useAuth();
    const router = useRouter()
    const formRef = useRef<any>(null);

    const [fetchFomrData,setFetchFormData] = useState(DataSchema);


    const [photoId,setPhotoId] = useState<string>('');
    const [ssnId,setSsnId] = useState<string>('');
    const [bankAttchId,setBankAttchId] = useState<string>('');
    const [phyFormId,setPhyFormId] = useState<string>('');
    const [wfourId,setWfourId] = useState<string>('');

    const fetchdata = fetchFomrData;

    

    const handleFormSubmit = async(values:any,{ resetForm }:any)=>{
        //alert(JSON.stringify(values));
        const photo_attachment_id = photoId;
        const ssn_attachment_id = ssnId;
        const bank_attachment_id = bankAttchId;
        const physical_form_attachment_id = phyFormId;
        const wfour_form_attachment_id = wfourId;

        await axios.post(`${url}save-caregiver`, 
            {
                ...values.fetchdata,
                photo_attachment_id,
                ssn_attachment_id,
                bank_attachment_id,
                physical_form_attachment_id,
                wfour_form_attachment_id
                }, {
            
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
            setSsnId('');
            setPhotoId('');
            setPhyFormId('');
            setBankAttchId('');
            setWfourId('');
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

            <div className="mt-[32px] flex flex-row gap-2">
<div className="w-[70%]">
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

<div className="flex flex-row mt-5">

    <div className="w-full">

    <FieldArray name="fetchdata.working_schedule">
          {({ insert, remove, push }:any) => (
            <div>
              {values.fetchdata.working_schedule.length > 0 &&
                values.fetchdata.working_schedule.map((field, index) => (
                  <div key={index} className="flex flex-row">
                    <div className="w-[20%]">

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
                    <div className="ml-[10px] w-[35%] grid grid-cols-2 gap-1 items-center justify-center">
                        <div className="w-full">                    
                                <FormikSelectInput
                                label={DataLabel.from}
                                defaultValue={fetchdata.working_schedule[index]?.from}
                                placeHolder={``}
                                isSearchable={true}
                                isClearable={true}
                                name={`fetchdata.working_schedule.${index}.from`}
                                dataOptions={WorkingHour}
                                errorMessage={''}
                            />
                        </div>
                        <div className="w-full">
                        <FormikSelectInput
                            label={DataLabel.am_pm}
                            defaultValue={fetchdata.working_schedule[index]?.from_am}
                            placeHolder={``}
                            isSearchable={true}
                            isClearable={true}
                            name={`fetchdata.working_schedule.${index}.from_am`}
                            dataOptions={TimeAmPm}
                            errorMessage={''}
                        />
                        </div>
                    </div>
                    <div className="ml-[10px] w-[35%] grid grid-cols-2 gap-1 items-center justify-center"> 
                    <div className="w-full">
                        <FormikSelectInput
                            label={DataLabel.to}
                            defaultValue={fetchdata.working_schedule[index]?.to}
                            placeHolder={``}
                            isSearchable={true}
                            isClearable={true}
                            name={`fetchdata.working_schedule.${index}.to`}
                            dataOptions={WorkingHour}
                            errorMessage={''}
                        />
                    </div>
                    
                    <div className="w-full">
                        <FormikSelectInput
                            label={DataLabel.am_pm}
                            defaultValue={fetchdata.working_schedule[index]?.to_am}
                            placeHolder={``}
                            isSearchable={true}
                            isClearable={true}
                            name={`fetchdata.working_schedule.${index}.to_am`}
                            dataOptions={TimeAmPm}
                            errorMessage={''}
                        />
                    </div>

                    </div>
                    
                    
                    <div className="w-[10%] ml-[10px]">
                    <button
                      type="button"
                      className="bg-meta-1 rounded text-white mt-8"
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
                        onClick={() => push({ 
                            weekDay: {'label':'','value':''}, 
                            from: {'label':'','value':''},
                            to: {'label':'','value':''},
                            from_am: {'label':'','value':''},
                            to_am:{'label':'','value':''}
                          })}
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



</FormikFormHolder>
        )}
        />
            </div>

            <div className="w-[30%]">

            <CardLegendHolder legend={`Attachments`}>

            <div className="flex flex-row">

                <div className="w-full">

                <div className="flex flex-col">
                        <div className="h-[90px] w-full">
                            <FileUpload
                            label={DataLabel.ssn}
                            allowed_extension={['png','jpg','jpeg','pdf']} 
                            onFileUpload={(fileId: string)=>{ setSsnId(fileId) }} chunkUrl={`${url}upload-chunk/caregiverssn`} />
                        </div>
                        {ssnId!='' &&
                        <div className="w-full mt-1 mb-5 h-8">
                            <div className="flex flex-row items-center justify-center">
                                <div className="w-[70%] flex justify-center">
                                    <Link className="text-[16px] text-[#0166FF] border-[#C3C9CE] bg-[#F5F7F9] px-3 py-2 rounded"  target="blank" href={`${url}/download/${ssnId}`}>
                                        Download / Preview
                                    </Link>
                                </div>
                                <div className="w-[30%] flex justify-center">
                                    <button onClick={()=>{ setSsnId('')}} className="bg-meta-1 rounded text-white text-[16px] px-4 py-[2px]">
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                        }
                    </div>


                    <div className="flex flex-col">
                        <div className="h-[90px] w-full">
                            <FileUpload
                            label={DataLabel.photo_attachment_id}
                            allowed_extension={['png','jpg','jpeg']} 
                            onFileUpload={(fileId: string)=>{ setPhotoId(fileId) }} chunkUrl={`${url}upload-chunk/caregiverphotoid`} />
                        </div>
                        {photoId!='' &&
                        <div className="w-full mt-1 mb-5 h-8">
                            <div className="flex flex-row items-center justify-center">
                                <div className="w-[70%] flex justify-center">
                                    <Link className="text-[16px] text-[#0166FF] border-[#C3C9CE] bg-[#F5F7F9] px-3 py-2 rounded"  target="blank" href={`${url}/download/${photoId}`}>
                                        Download / Preview
                                    </Link>
                                </div>
                                <div className="w-[30%] flex justify-center">
                                    <button onClick={()=>{ setPhotoId('')}} className="bg-meta-1 rounded text-white text-[16px] px-4 py-[2px]">
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                        }
                    </div>



                    <div className="flex flex-col">
                        <div className="h-[90px] w-full">
                            <FileUpload
                            label={DataLabel.bank_attachment_id}
                            allowed_extension={['png','jpg','jpeg','pdf']} 
                            onFileUpload={(fileId: string)=>{ setBankAttchId(fileId) }} chunkUrl={`${url}upload-chunk/caregiverbankdoc`} />
                        </div>
                        {bankAttchId!='' &&
                        <div className="w-full mt-1 mb-5 h-8">
                            <div className="flex flex-row items-center justify-center">
                                <div className="w-[70%] flex justify-center">
                                    <Link className="text-[16px] text-[#0166FF] border-[#C3C9CE] bg-[#F5F7F9] px-3 py-2 rounded"  target="blank" href={`${url}/download/${bankAttchId}`}>
                                        Download / Preview
                                    </Link>
                                </div>
                                <div className="w-[30%] flex justify-center">
                                    <button onClick={()=>{ setBankAttchId('')}} className="bg-meta-1 rounded text-white text-[16px] px-4 py-[2px]">
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                        }
                    </div>


                    <div className="flex flex-col">
                        <div className="h-[90px] w-full">
                            <FileUpload
                            label={DataLabel.physical_form_attachment_id}
                            allowed_extension={['png','jpg','jpeg','pdf']} 
                            onFileUpload={(fileId: string)=>{ setPhyFormId(fileId) }} chunkUrl={`${url}upload-chunk/caregiverphysicalform`} />
                        </div>
                        {phyFormId!='' &&
                        <div className="w-full mt-1 mb-5 h-8">
                            <div className="flex flex-row items-center justify-center">
                                <div className="w-[70%] flex justify-center">
                                    <Link className="text-[16px] text-[#0166FF] border-[#C3C9CE] bg-[#F5F7F9] px-3 py-2 rounded"  target="blank" href={`${url}/download/${phyFormId}`}>
                                        Download / Preview
                                    </Link>
                                </div>
                                <div className="w-[30%] flex justify-center">
                                    <button onClick={()=>{ setPhyFormId('')}} className="bg-meta-1 rounded text-white text-[16px] px-4 py-[2px]">
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                        }
                    </div>



                    <div className="flex flex-col">
                        <div className="h-[90px] w-full">
                            <FileUpload
                            label={DataLabel.wfour_form_attachment_id}
                            allowed_extension={['png','jpg','jpeg','pdf']} 
                            onFileUpload={(fileId: string)=>{ setWfourId(fileId) }} chunkUrl={`${url}upload-chunk/caregiverwfour`} />
                        </div>
                        {wfourId!='' &&
                        <div className="w-full mt-1 mb-5 h-8">
                            <div className="flex flex-row items-center justify-center">
                                <div className="w-[70%] flex justify-center">
                                    <Link className="text-[16px] text-[#0166FF] border-[#C3C9CE] bg-[#F5F7F9] px-3 py-2 rounded"  target="blank" href={`${url}/download/${wfourId}`}>
                                        Download / Preview
                                    </Link>
                                </div>
                                <div className="w-[30%] flex justify-center">
                                    <button onClick={()=>{ setWfourId('')}} className="bg-meta-1 rounded text-white text-[16px] px-4 py-[2px]">
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                        }
                    </div>


                    


                    
                </div>


            </div>
            </CardLegendHolder>



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