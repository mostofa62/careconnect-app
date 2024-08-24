"use client";
import DefaultLayout from "@/app/layout/DefaultLayout";
import Link from "next/link";
import { useState,useEffect, useRef, useMemo } from "react";
import axios from "axios";
import useAuth from '@/app/hooks/useAuth';
import { useRouter } from "next/navigation";
import {Formik, Field, yupToFormErrors, validateYupSchema, FieldArray} from 'formik';
import { DataSchema,DataLabel,ValidationSchema } from "./DataValidationSchema";
import SelectNonCreatableComponent from '@/app/components/SelectNonCreatableComponent';
import FormikFormHolder from "@/app/components/form/FormikFormHolder";
import FormikFieldInput from "@/app/components/form/FormikFieldInput";
import FormikSelectInput from "@/app/components/form/FormikSelectInput";
import useFetchDropDownData from "@/app/hooks/useFetchDropDownData";

import toast from 'react-hot-toast';



import CountyData from '@/app/data/CountyData.json'
import CityData from '@/app/data/CityData.json'

import {ConsumerStatus, CaseStatus, RestrictionCode, ServiceType, Recertification, WeekDays} from '@/app/data/PatientOptions.json'

const url = process.env.NEXT_PUBLIC_API_URL;
export default function PatientCreate() {
    const authCtx = useAuth();
    const router = useRouter()
    const formRef = useRef<any>(null);    

    const [fetchFomrData,setFetchFormData] = useState(DataSchema);

    const fetchdata = fetchFomrData;

    const insuranceData = useFetchDropDownData({urlSuffix:'insurances-dropdown'});


    const internalMarketerData = useFetchDropDownData({urlSuffix:`marketer-dropdown/1`});

    const externalMarketerData = useFetchDropDownData({urlSuffix:`marketer-dropdown/2`});



    const caregiverData = useFetchDropDownData({urlSuffix:`caregiver-dropdown`});    
    
    

    const handleFormSubmit = async(values:any,{ resetForm }:any)=>{
        //alert(JSON.stringify(values));

        await axios.post(`${url}save-patient`, 
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
                                    href={'/admin/patient'}
                                    className={`text-[21px] capitalize group relative flex items-center gap-2 rounded-sm py-[3px] font-medium duration-300 ease-in-out   text-[#0166FF]`}
                                >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" width={15} height={15} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                                </svg>


                                <p className="">Back</p>
                            </Link>
                    </div>
                    <div className="ml-[50px] pt-[5px]">
                        <span className="text-[25px] font-medium capitalize text-[#4F4F4F]">Add Patient</span>
                    </div>
                </div>
            
            </div>

            <div className="mt-[32px] w-[70%]">
            <Formik
            innerRef={formRef}
        initialValues={{ fetchdata }}
        validationSchema={ValidationSchema}
        

        onSubmit={handleFormSubmit}

        render={({isValid, handleChange, isSubmitting,values,errors, touched, setFieldValue, setFieldTouched})=>(
            <FormikFormHolder legend="Patient Information">

<p className="text-[16px] uppercase font-medium"> Initial Section</p>

<hr className="mt-2 border-stroke"/>

<div className="flex flex-row">

    <div className="w-[50%]">
        <FormikSelectInput
            label={DataLabel.current_insurance}
            defaultValue={fetchdata.current_insurance}
            placeHolder={``}
            isSearchable={true}
            isClearable={true}
            name="fetchdata.current_insurance"
            dataOptions={insuranceData}
            errorMessage={errors.fetchdata &&
                errors.fetchdata.current_insurance &&
                touched.fetchdata &&
                touched.fetchdata.current_insurance &&
                errors.fetchdata.current_insurance.label
            }
        />
        
        
    </div>        

    <div className="ml-[24px] w-[50%]">

    <FormikFieldInput 
        label={DataLabel.current_plancode} 
        name={`fetchdata.current_plancode`}                
        placeHolder={`${DataLabel.current_plancode}`}
        errorMessage ={ errors.fetchdata &&                                        
            errors.fetchdata.current_plancode &&
            touched.fetchdata &&            
            touched.fetchdata.current_plancode &&  errors.fetchdata.current_plancode}        
        />
        
        
    </div>
    
    
</div>


<div className="flex flex-row">

    <div className="w-[50%]">
        <FormikSelectInput
            label={DataLabel.allocated_insurance}
            defaultValue={fetchdata.allocated_insurance}
            placeHolder={``}
            isSearchable={true}
            isClearable={true}
            name="fetchdata.allocated_insurance"
            dataOptions={insuranceData}
            errorMessage={errors.fetchdata &&
                errors.fetchdata.allocated_insurance &&
                touched.fetchdata &&
                touched.fetchdata.allocated_insurance &&
                errors.fetchdata.allocated_insurance.label
            }
        />
        
        
    </div>        

    <div className="ml-[24px] w-[50%]">

    <FormikFieldInput 
        label={DataLabel.allocated_plancode} 
        name={`fetchdata.allocated_plancode`}            
        placeHolder={`${DataLabel.allocated_plancode}`}
        errorMessage ={ errors.fetchdata &&                                        
            errors.fetchdata.allocated_plancode &&
            touched.fetchdata &&            
            touched.fetchdata.allocated_plancode &&  errors.fetchdata.allocated_plancode}        
        />
        
        
    </div>
    
    
</div>


<div className="flex flex-row">

    <div className="w-[50%]">
        <FormikSelectInput
            label={DataLabel.consumer_status}
            defaultValue={fetchdata.consumer_status}
            placeHolder={``}
            isSearchable={true}
            isClearable={true}
            name="fetchdata.consumer_status"
            dataOptions={ConsumerStatus}
            errorMessage={errors.fetchdata &&
                errors.fetchdata.consumer_status &&
                touched.fetchdata &&
                touched.fetchdata.consumer_status &&
                errors.fetchdata.consumer_status.label
            }
        />
        
        
    </div>        

    <div className="ml-[24px] w-[50%]">

    <FormikSelectInput
            label={DataLabel.case_status}
            defaultValue={fetchdata.case_status}
            placeHolder={``}
            isSearchable={true}
            isClearable={true}
            name="fetchdata.case_status"
            dataOptions={CaseStatus}
            errorMessage={errors.fetchdata &&
                errors.fetchdata.case_status &&
                touched.fetchdata &&
                touched.fetchdata.case_status &&
                errors.fetchdata.case_status.label
            }
        />
        
        
    </div>
    
    
</div>


<div className="flex flex-row">
    <div className="w-[50%]">
        
    <FormikFieldInput 
                type="date"
                label={DataLabel.projected_encrollment_date} 
                name={`fetchdata.projected_encrollment_date`}
                placeHolder={`${DataLabel.projected_encrollment_date}`}
                errorMessage ={ errors.fetchdata &&                                        
                    errors.fetchdata.projected_encrollment_date &&
                    touched.fetchdata &&            
                    touched.fetchdata.projected_encrollment_date &&  errors.fetchdata.projected_encrollment_date}        
                />
        
        
        
    </div>
    
    <div className="ml-[24px] w-[50%]">

    <FormikFieldInput 
                type="date"
                label={DataLabel.confirmed_encrollment_date} 
                name={`fetchdata.confirmed_encrollment_date`}
                placeHolder={`${DataLabel.confirmed_encrollment_date}`}
                errorMessage ={ errors.fetchdata &&                                        
                    errors.fetchdata.confirmed_encrollment_date &&
                    touched.fetchdata &&            
                    touched.fetchdata.confirmed_encrollment_date &&  errors.fetchdata.confirmed_encrollment_date}        
                />
        
        
    </div>
</div>

<p className="text-[16px] uppercase font-medium mt-5"> Marketer Section</p>

<hr className="mt-2 border-stroke"/>


<div className="flex flex-row">

    <div className="w-[50%]">
        <FormikSelectInput
            label={DataLabel.internal_marketer}
            defaultValue={fetchdata.internal_marketer}
            placeHolder={``}
            isSearchable={true}
            isClearable={true}
            name="fetchdata.internal_marketer"
            dataOptions={internalMarketerData}
            errorMessage={errors.fetchdata &&
                errors.fetchdata.internal_marketer &&
                touched.fetchdata &&
                touched.fetchdata.internal_marketer &&
                errors.fetchdata.internal_marketer.label
            }
        />
        
        
    </div>        

    <div className="ml-[24px] w-[50%]">

    <FormikSelectInput
            label={DataLabel.external_marketer}
            defaultValue={fetchdata.external_marketer}
            placeHolder={``}
            isSearchable={true}
            isClearable={true}
            name="fetchdata.external_marketer"
            dataOptions={externalMarketerData}
            errorMessage={errors.fetchdata &&
                errors.fetchdata.external_marketer &&
                touched.fetchdata &&
                touched.fetchdata.external_marketer &&
                errors.fetchdata.external_marketer.label
            }
        />
        
        
    </div>
    
    
</div>



<p className="text-[16px] uppercase font-medium mt-5"> Patient Section</p>

<hr className="mt-2 border-stroke"/>

<div className="flex flex-row">
    <div className="w-[32%]">
        
        <FormikFieldInput 
        label={DataLabel.first_name} 
        name={`fetchdata.first_name`}
        placeHolder={`${DataLabel.first_name}`}
        errorMessage ={ errors.fetchdata &&                                        
            errors.fetchdata.first_name &&
            touched.fetchdata &&            
            touched.fetchdata.first_name &&  errors.fetchdata.first_name}        
        />
        
        
        
    </div>
    
    <div className="ml-[24px] w-[32%]">

    <FormikFieldInput 
        label={DataLabel.middle_name} 
        name={`fetchdata.middle_name`}
        placeHolder={`${DataLabel.middle_name}`}
        errorMessage ={ errors.fetchdata &&                                        
            errors.fetchdata.middle_name &&
            touched.fetchdata &&            
            touched.fetchdata.middle_name &&  errors.fetchdata.middle_name}        
        />
        
        
    </div>

    <div className="ml-[24px] w-[32%]">

    <FormikFieldInput 
        label={DataLabel.last_name} 
        name={`fetchdata.last_name`}
        placeHolder={`${DataLabel.last_name}`}
        errorMessage ={ errors.fetchdata &&                                        
            errors.fetchdata.last_name &&
            touched.fetchdata &&            
            touched.fetchdata.last_name &&  errors.fetchdata.last_name}        
        />
        
        
    </div>
</div>


<div className="flex flex-row">
    <div className="w-[50%]">
        
    <FormikFieldInput 
                type="date"
                label={DataLabel.dob} 
                name={`fetchdata.dob`}
                placeHolder={`${DataLabel.dob}`}
                errorMessage ={ errors.fetchdata &&                                        
                    errors.fetchdata.dob &&
                    touched.fetchdata &&            
                    touched.fetchdata.dob &&  errors.fetchdata.dob}        
                />
        
        
        
    </div>
    
    <div className="ml-[24px] w-[50%]">

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


<div className="flex flex-row">
        <div className="w-[50%]">

        <FormikFieldInput 
            label={DataLabel.medicaid_id} 
            name={`fetchdata.medicaid_id`}
            placeHolder={`${DataLabel.medicaid_id}`}
            errorMessage ={ errors.fetchdata &&                                        
                errors.fetchdata.medicaid_id &&
                touched.fetchdata &&            
                touched.fetchdata.medicaid_id &&  errors.fetchdata.medicaid_id}        
            />
            
            
        </div>

        <div className="ml-[24px]  w-[50%]">
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
        <FormikSelectInput
            label={DataLabel.city}
            defaultValue={fetchdata.city}
            placeHolder={``}
            isSearchable={true}
            isClearable={true}
            name="fetchdata.city"
            dataOptions={CityData}
            errorMessage={errors.fetchdata &&
                errors.fetchdata.city &&
                touched.fetchdata &&
                touched.fetchdata.city &&
                errors.fetchdata.city.label
            }
        />
        
        
    </div>        

    <div className="ml-[24px] w-[50%]">

    <FormikSelectInput
            label={DataLabel.county}
            defaultValue={fetchdata.county}
            placeHolder={``}
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
    
    
</div>


<div className="flex flex-row">
        <div className="w-[50%]">

        <FormikFieldInput 
        label={DataLabel.zipCode} 
        name={`fetchdata.zipCode`}
        type="number"
        placeHolder={`${DataLabel.zipCode}`}
        errorMessage ={ errors.fetchdata &&                                        
            errors.fetchdata.zipCode &&
            touched.fetchdata &&            
            touched.fetchdata.zipCode &&  errors.fetchdata.zipCode}        
        />
            
            
        </div>
    <div className="ml-[24px] w-[50%]">

    <FormikSelectInput
            label={DataLabel.restriction_code}
            defaultValue={fetchdata.restriction_code}
            placeHolder={``}
            isSearchable={true}
            isClearable={true}
            name="fetchdata.restriction_code"
            dataOptions={RestrictionCode}
            errorMessage={errors.fetchdata &&
                errors.fetchdata.restriction_code &&
                touched.fetchdata &&
                touched.fetchdata.restriction_code &&
                errors.fetchdata.restriction_code.label
            }
        />
        
        
    </div>
    
   
</div>


<div className="flex flex-row">

    <div className="w-[50%]">
        <FormikFieldInput 
        label={DataLabel.phone} 
        name={`fetchdata.phone`}
        type="tel"        
        placeHolder={`${DataLabel.phone}`}
        errorMessage ={ errors.fetchdata &&                                        
            errors.fetchdata.phone &&
            touched.fetchdata &&            
            touched.fetchdata.phone &&  errors.fetchdata.phone}        
        />
        
        
    </div>        

    <div className="ml-[24px] w-[50%]">

    <FormikFieldInput 
        label={DataLabel.cell_phone} 
        name={`fetchdata.cell_phone`}
        type="tel"        
        placeHolder={`${DataLabel.cell_phone}`}
        errorMessage ={ errors.fetchdata &&                                        
            errors.fetchdata.cell_phone &&
            touched.fetchdata &&            
            touched.fetchdata.cell_phone &&  errors.fetchdata.cell_phone}        
        />
        
        
    </div>
    
    
</div>


<div className="flex flex-row">
    
<div className="w-[100%]">

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
        label={DataLabel.pay_rate} 
        name={`fetchdata.pay_rate`}
        type="number"
        placeHolder={`${DataLabel.pay_rate}`}
        errorMessage ={ errors.fetchdata &&                                        
            errors.fetchdata.pay_rate &&
            touched.fetchdata &&            
            touched.fetchdata.pay_rate &&  errors.fetchdata.pay_rate}        
        />
            
            
        </div>
    <div className="ml-[24px] w-[50%]">

    <FormikFieldInput 
        label={DataLabel.allocated_hours} 
        name={`fetchdata.allocated_hours`}
        type="number"
        placeHolder={`${DataLabel.allocated_hours}`}
        errorMessage ={ errors.fetchdata &&                                        
            errors.fetchdata.allocated_hours &&
            touched.fetchdata &&            
            touched.fetchdata.allocated_hours &&  errors.fetchdata.allocated_hours}        
        />

    </div>

</div>


<div className="flex flex-row">
    <div className="w-[50%]">
        
    <FormikFieldInput 
                type="date"
                label={DataLabel.cha_appointment_date} 
                name={`fetchdata.cha_appointment_date`}
                placeHolder={`${DataLabel.cha_appointment_date}`}
                errorMessage ={ errors.fetchdata &&                                        
                    errors.fetchdata.cha_appointment_date &&
                    touched.fetchdata &&            
                    touched.fetchdata.cha_appointment_date &&  errors.fetchdata.cha_appointment_date}        
                />
        
        
        
    </div>
    
    <div className="ml-[24px] w-[50%]">

    <FormikFieldInput 
                type="date"
                label={DataLabel.ipp_appointment_date} 
                name={`fetchdata.ipp_appointment_date`}
                placeHolder={`${DataLabel.ipp_appointment_date}`}
                errorMessage ={ errors.fetchdata &&                                        
                    errors.fetchdata.ipp_appointment_date &&
                    touched.fetchdata &&            
                    touched.fetchdata.ipp_appointment_date &&  errors.fetchdata.ipp_appointment_date}        
                />
        
        
    </div>
</div>


<div className="flex flex-row">
    <div className="w-[50%]">
        
    <FormikFieldInput 
                type="date"
                label={DataLabel.insrn_assessment_date} 
                name={`fetchdata.insrn_assessment_date`}
                placeHolder={`${DataLabel.insrn_assessment_date}`}
                errorMessage ={ errors.fetchdata &&                                        
                    errors.fetchdata.insrn_assessment_date &&
                    touched.fetchdata &&            
                    touched.fetchdata.insrn_assessment_date &&  errors.fetchdata.insrn_assessment_date}        
                />
        
        
        
    </div>
    
    <div className="ml-[24px] w-[50%]">

    <FormikFieldInput 
                type="date"
                label={DataLabel.addn_assessment_date} 
                name={`fetchdata.addn_assessment_date`}
                placeHolder={`${DataLabel.addn_assessment_date}`}
                errorMessage ={ errors.fetchdata &&                                        
                    errors.fetchdata.addn_assessment_date &&
                    touched.fetchdata &&            
                    touched.fetchdata.addn_assessment_date &&  errors.fetchdata.addn_assessment_date}        
                />
        
        
    </div>
</div>


<div className="flex flex-row">
    <div className="w-[50%]">
        
    <FormikFieldInput 
                type="date"
                label={DataLabel.service_start_date} 
                name={`fetchdata.service_start_date`}
                placeHolder={`${DataLabel.service_start_date}`}
                errorMessage ={ errors.fetchdata &&                                        
                    errors.fetchdata.service_start_date &&
                    touched.fetchdata &&            
                    touched.fetchdata.service_start_date &&  errors.fetchdata.service_start_date}        
                />
        
        
        
    </div>
    
    <div className="ml-[24px] w-[50%]">

    <FormikFieldInput 
                type="date"
                label={DataLabel.service_end_date} 
                name={`fetchdata.service_end_date`}
                placeHolder={`${DataLabel.service_end_date}`}
                errorMessage ={ errors.fetchdata &&                                        
                    errors.fetchdata.service_end_date &&
                    touched.fetchdata &&            
                    touched.fetchdata.service_end_date &&  errors.fetchdata.service_end_date}        
                />
        
        
    </div>
</div>


<div className="flex flex-row">
    <div className="w-[50%]">
        
    <FormikSelectInput
            label={DataLabel.service_type}
            defaultValue={fetchdata.service_type}
            placeHolder={``}
            isSearchable={true}
            isClearable={true}
            name="fetchdata.service_type"
            dataOptions={ServiceType}
            errorMessage={errors.fetchdata &&
                errors.fetchdata.service_type &&
                touched.fetchdata &&
                touched.fetchdata.service_type &&
                errors.fetchdata.service_type.label
            }
        />
        
        
        
    </div>
    
    <div className="ml-[24px] w-[50%]">

    <FormikSelectInput
            label={DataLabel.recertification}
            defaultValue={fetchdata.recertification}
            placeHolder={``}
            isSearchable={true}
            isClearable={true}
            name="fetchdata.recertification"
            dataOptions={Recertification}
            errorMessage={errors.fetchdata &&
                errors.fetchdata.recertification &&
                touched.fetchdata &&
                touched.fetchdata.recertification &&
                errors.fetchdata.recertification.label
            }
        />

    
        
    </div>
</div>


<p className="text-[16px] uppercase font-medium mt-5"> Caregiver Section</p>

<hr className="mt-2 border-stroke"/>


<div className="flex flex-row">

    <div className="w-[50%]">
        <FormikSelectInput
            label={DataLabel.primary_caregiver}
            defaultValue={fetchdata.primary_caregiver}
            placeHolder={``}
            isSearchable={true}
            isClearable={true}
            name="fetchdata.primary_caregiver"
            dataOptions={caregiverData}
            errorMessage={errors.fetchdata &&
                errors.fetchdata.primary_caregiver &&
                touched.fetchdata &&
                touched.fetchdata.primary_caregiver &&
                errors.fetchdata.primary_caregiver.label
            }
        />
        
        
    </div>        

    <div className="ml-[24px] w-[50%]">

    <FormikSelectInput
            label={DataLabel.secondary_caregiver}
            defaultValue={fetchdata.secondary_caregiver}
            placeHolder={``}
            isSearchable={true}
            isClearable={true}
            name="fetchdata.secondary_caregiver"
            dataOptions={caregiverData}
            errorMessage={errors.fetchdata &&
                errors.fetchdata.secondary_caregiver &&
                touched.fetchdata &&
                touched.fetchdata.secondary_caregiver &&
                errors.fetchdata.secondary_caregiver.label
            }
        />
        
        
    </div>
    
    
</div>





{/*
<div className="flex flex-row">
    {JSON.stringify(values.fetchdata.working_schedule)}
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
                                    href={'/admin/patient'}
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