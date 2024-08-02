import { object, array, string, number, StringSchema } from "yup";
export const DataSchema = {
    name:'',
    address:'',
    phoneNumber:'',
    zipCode:'',
    county:{'label':'','value':''},
    state:{'label':'','value':''},

};

export const DataLabel = {
    name:'Insurance Name',
    address:'Address',
    phoneNumber:'Phone Number',
    zipCode:'Zip Code',
    county:'County',
    state:'State'
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

              address: string()
              .ensure()
              .required(`${DataLabel.address} is required`),

              phoneNumber: string()
              .ensure()
              .matches(/^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d*)\)?)[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?)+)(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i,`provide valid ${DataLabel.phoneNumber}`)
              .required(`${DataLabel.phoneNumber} is required`),

              zipCode: string()
              .ensure()
              .matches(/^(?!00000)\d{5}(?:[-\s](?!0000)\d{4})?$/,`provide valid ${DataLabel.zipCode}`)
              .required(`${DataLabel.zipCode} is required`),


              county:object().shape({
                value: string().required(),
                label: string().required(`${DataLabel.county} is required`)
              }),

              state:object().shape({
                value: string().required(),
                label: string().required(`${DataLabel.state} is required`)
              }),
              
             
})
});


export const CountyData = [
    {'value':'queens','label':'Queens'},
    {'value':'nassau','label':'Nassau'},
]

export const StateData = [
    {'value':'NY','label':'New York'},
    {'value':'CA','label':'California'},
]