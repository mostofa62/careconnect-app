import { object, array, string, number, StringSchema } from "yup";
export const DataSchema = {

    current_insurance:{'label':'','value':''},
    allocated_insurance:{'label':'','value':''},
    current_plancode:'',
    allocated_plancode:'',
    consumer_status:{'label':'','value':''},
    case_status:{'label':'','value':''},
    projected_encrollment_date:'',
    confirmed_encrollment_date:'',

    internal_marketer:{'label':'','value':''},
    external_marketer:{'label':'','value':''},

    first_name:'',
    middle_name:'',
    last_name:'',

    dob:'',
    ssn:'',
    medicaid_id:'',

    address:'',

    zipCode:'',
    restriction_code:{'label':'','value':''},


    city:{'label':'','value':''},
    county:{'label':'','value':''},

    phone:'',
    cell_phone:'',

    email:'',

    pay_rate:0,
    allocated_hours:0,


    cha_appointment_date:'',
    ipp_appointment_date:'',

    insrn_assessment_date:'',
    addn_assessment_date:'',

    service_start_date:'',
    service_end_date:'',

    service_type:{'label':'','value':''},
    recertification:{'label':'','value':''},


    primary_caregiver:{'label':'','value':''},
    secondary_caregiver:{'label':'','value':''},

    working_schedule: [
      { weekDay: {'label':'','value':''}, from: 0, to: 0 },
    ],


};

export const DataLabel = {

    current_insurance:'Current Insurance',
    allocated_insurance:'Allocated Insurnace',
    current_plancode:'Plan Code ( Current )',
    allocated_plancode:'Plan Code ( Allocated )',
    consumer_status:'Consumer Status',
    case_status:'Case Status',
    projected_encrollment_date:'Projected Enrollment Date',
    confirmed_encrollment_date:'Confirmed Enrollment Date',

    internal_marketer:'Internal ( Bangladesh Team )',
    external_marketer:'External ( Us Team )',

    first_name:'First Name',
    middle_name:'Middle Name',
    last_name:'Last Name',

    dob:'DOB',
    ssn:'SSN',
    medicaid_id:'Medicaid ID',

    address:'Address',

    zipCode:'Zip Code',
    restriction_code:'Restriction Code',

    city:'City',
    county:'County',

    phone:'Home Phone',
    cell_phone:'Cell Phone',

    email:'Email',

    pay_rate:'Pay Rate',
    allocated_hours:'Allocated Hours',


    cha_appointment_date:'CHA appointment date',
    ipp_appointment_date:'IPP appointment date',

    insrn_assessment_date:'Insurance RN Assessment Date',
    addn_assessment_date:'Additional assessment Date',


    service_start_date:'Service Start Date',
    service_end_date:'Service End Date',
    

    service_type:'Service Type',
    recertification:'Recertification',

    primary_caregiver:'Primary Caregiver',
    secondary_caregiver:'Secondary Caregiver',

    working_schedule:'Working Schedule',
    weekDay:'Week Day',
    from:'From',
    to:'To'


}

export const ValidationSchema =  object().shape({
  fetchdata:object().shape({

            current_insurance:object().shape({
              value: string().required(),
              label: string().required(`${DataLabel.current_insurance} is required`)
            }),

            allocated_insurance:object().shape({
              value: string().required(),
              label: string().required(`${DataLabel.allocated_insurance} is required`)
            }),
            
            

              medicaid_id: string()
              .ensure()
              .required(`${DataLabel.medicaid_id} is required`),

              ssn: string()
              .ensure()
              .required(`${DataLabel.ssn} is required`),


              email: string()
              .ensure()
              .email(`Provide a ${DataLabel.email} Email address`)
              .required(`${DataLabel.email} is required`),

              

              phone: string()
              .ensure()
              .matches(/^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d*)\)?)[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?)+)(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i,`provide valid ${DataLabel.phone}`)
              .required(`${DataLabel.phone} is required`),


              cell_phone: string()
              .ensure()
              .matches(/^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d*)\)?)[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?)+)(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i,`provide valid ${DataLabel.cell_phone}`)
              .required(`${DataLabel.cell_phone} is required`),
             

              zipCode: string()
              .ensure()
              .matches(/^(?!00000)\d{5}(?:[-\s](?!0000)\d{4})?$/,`provide valid ${DataLabel.zipCode}`)
              .required(`${DataLabel.zipCode} is required`),

              restriction_code:object().shape({
                value: string().required(),
                label: string().required(`${DataLabel.restriction_code} is required`)
              }),


              pay_rate: number().min(0,`${DataLabel.pay_rate} least 0`)              
                .required(`${DataLabel.pay_rate} is required`),

              allocated_hours: number().min(0,`${DataLabel.allocated_hours} least 0`)              
              .required(`${DataLabel.allocated_hours} is required`),


              service_start_date: string()
                .ensure()
                .matches(/^\d{4}-\d{2}-\d{2}$/i,`provide valid ${DataLabel.service_start_date}`)
                .required(`${DataLabel.service_start_date} is required`),

                service_end_date: string()
                .ensure()
                .matches(/^\d{4}-\d{2}-\d{2}$/i,`provide valid ${DataLabel.service_end_date}`)
                .required(`${DataLabel.service_end_date} is required`),
              
             
})
});



