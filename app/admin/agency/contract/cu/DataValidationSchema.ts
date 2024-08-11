import { object, array, string, number, StringSchema } from "yup";
export const DataSchema = {
    agency:{'label':'','value':''},
    insurance:{'label':'','value':''},
    county:{'label':'','value':''},
    rate:0
    
};

export const DataLabel = {     
    agency:'Agency',
    insurance:'Insurance',
    county:'County',
    rate:'Rate',
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

              rate: number().min(1,`${DataLabel.rate} least 1`)              
              .required(`${DataLabel.rate} is required`),             
              

              agency:object().shape({
                value: string().required(),
                label: string().required(`${DataLabel.agency} is required`)
              }),

              insurance:object().shape({
                value: string().required(),
                label: string().required(`${DataLabel.insurance} is required`)
              }),

              county:object().shape({
                value: string().required(),
                label: string().required(`${DataLabel.county} is required`)
              }),
              
             
})
});


export const CountyData = [
  {'value':'queens','label':'Queens'},
  {'value':'nassau','label':'Nassau'},
]


