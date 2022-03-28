import * as Yup from "yup";
import {countriesList} from "../../Common/countries";

const validationSchema = Yup.object({
    firstName: Yup.string()
        .max(50, 'First name must be shorter than 30 characters')
        .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field'),
    lastName: Yup.string()
        .max(50, 'Last name must be shorter than 50 characters')
        .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field'),
    gender: Yup.string()
        .oneOf(['M', 'F', 'U'], 'Gender is invalid'),
    country: Yup.string()
        .oneOf([...countriesList.map(c => c.value)], 'Country is invalid'),
    birthDay: Yup.date()
});

export default validationSchema;