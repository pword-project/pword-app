import * as yup from 'yup'

const EmailSchema = yup.string().email().required()

export default EmailSchema
