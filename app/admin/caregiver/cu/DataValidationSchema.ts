import { object, array, string, number, StringSchema } from "yup";
export const DataSchema = {
    name:'',
    address:'',
    phoneNumber:'',
    email:'',
    ssn:'',
    bank_acc_no:'',
    bank_routing_no:''
    
    
};

export const DataLabel = {
    name:'Name',
    address:'Address',
    phoneNumber:'Phone Number',
    email:'Email',
    ssn:'SSN',
    bank_acc_no:'Bank Account Number',
    bank_routing_no:'Bank Routing Number'
       
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


