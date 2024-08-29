import { object, array, string, number, StringSchema } from "yup";
export const DataSchema = {
    name:'',
    address:'',
    phoneNumber:'',
    email:'',
    ssn:'',
    bank_name:'',
    bank_acc_no:'',
    bank_routing_no:'',
    gender:{'label':'','value':''},

    working_schedule: [
      { 
        weekDay: {'label':'','value':''}, 
        from: {'label':'','value':''},
        to: {'label':'','value':''},
        from_am: {'label':'','value':''},
        to_am:{'label':'','value':''},
        total_hour:0,
      },
    ],

    //attachments

    photo_attachment_id:'',
    ssn_attachment_id:'',
    bank_attachment_id:'',
    physical_form_attachment_id:'',
    wfour_form_attachment_id:''
    
    
};

export const DataLabel = {
    name:'Name',
    address:'Address',
    phoneNumber:'Phone Number',
    email:'Email',
    ssn:'SSN',
    bank_name:'Bank name',
    bank_acc_no:'Bank Account Number',
    bank_routing_no:'Bank Routing Number',
    gender:'Gender',

    working_schedule:'Working Schedule',
    weekDay:'Week Day',
    from:'From',
    to:'To',

    am_pm:'AM / PM',

    photo_attachment_id:'Photo ID',
    ssn_attachment_id:'SSN',
    bank_attachment_id:'Bank Documents',
    physical_form_attachment_id:'Physical Form',
    wfour_form_attachment_id:'W4 Form'
       
}

export const ValidationSchema =  object().shape({
  fetchdata:object().shape({
            
            
            email: string()
              .ensure()
              .email(`Provide a Valid ${DataLabel.name} address`)
              .required(`${DataLabel.email} is required`),
              
             /*
              email: string().when("isEmail", {
                is: (val:string)=>val && parseInt(val) > 0 ,
                then: (schema) =>{
                  //console.log('coming here')
                  return schema.email("provide a valid email address")
                  .required("email is required")
                },
                otherwise:(schema)=>{
                  //console.log('coming here ..too')
                  return schema.matches(/^[a-z0-9]{2,20}$/,"username can contain only alphanumeric characters, with minimum 2 length and maximum 20 length.")
                  .required("username is required")
                }
                
              }),
              */

              gender:object().shape({
                value: string().required(),
                label: string().required(`${DataLabel.gender} is required`)
              }),

              name: string()
              .ensure()
              .required(`${DataLabel.name} is required`),

              address: string()
              .ensure()
              .required(`${DataLabel.address} is required`),

              phoneNumber: string()
              .ensure()
              .matches(/^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d*)\)?)[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?)+)(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i,`provide valid ${DataLabel.phoneNumber}`)
              .required(`${DataLabel.phoneNumber} is required`),

             
              
              


              
              
             
})
});


