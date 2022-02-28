export default function checkIfFieldsFilled(obj) {
    const allElements = ["surname", "lastName", "phoneNumber", "mail", "postCode", "city", "street", "houseNumber", "birthdate"];

    const isEveryElementFilled = Object.values(obj).every((el) => !!el);
    const isEveryElementAvailable = allElements.every((el) => Object.keys(obj).includes(el));

    return isEveryElementFilled && isEveryElementAvailable;
}
