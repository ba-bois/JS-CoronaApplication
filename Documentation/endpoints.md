  **/anmeldung / POST** : {
   surname: string,
   lastName: string,
   phoneNumber: string,
   mail: string,
   postCode: string,
   city: string,
   street: string,
   houseNumber: string,
   birthdate: date
 }

 **/anmeldung / GET** : {
   surname: string,
   lastName: string,
   phoneNumber: string,
   mail: string,
   postCode: string,
   city: string,
   street: string,
   houseNumber: string,
   birthdate: date,
   dateRegistered: date (server generated)
 }

**/neuigkeiten / GET**:{
  [
    {
      title: string,
      text: string, 
      pictureName: string
    }
  ]
} 
