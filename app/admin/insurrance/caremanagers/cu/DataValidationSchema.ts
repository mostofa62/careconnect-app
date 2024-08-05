import { object, array, string, number, StringSchema } from "yup";
export const DataSchema = {
    name:'',
    designation:'',
    phoneNumber:'',    
    insurance:{'label':'','value':''},

};

export const DataLabel = {
    name:'Caremanager Name',
    designation:'Designation',
    phoneNumber:'Phone Number',    
    insurance:'Insurance'
}

export const ValidationSchema =  object().shape({
  fetchdata:object().shape({
            
            /*  
            email: string()
              .ensure()
              .email("Provide a Valid Email address")
              .required("Email is required"),
              */
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

              designation: string()
              .ensure()
              .required(`${DataLabel.designation} is required`),

              phoneNumber: string()
              .ensure()
              .matches(/^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d*)\)?)[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?)+)(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i,`provide valid ${DataLabel.phoneNumber}`)
              .required(`${DataLabel.phoneNumber} is required`),
             

              insurance:object().shape({
                value: string().required(),
                label: string().required(`${DataLabel.insurance} is required`)
              }),
              
             
})
});


export const CountyData = [
    {'value':'queens','label':'Queens'},
    {'value':'nassau','label':'Nassau'},
]

