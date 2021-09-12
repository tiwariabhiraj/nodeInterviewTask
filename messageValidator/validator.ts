import Joi from 'joi'
export const messageValidator = (data: any) => {
    function validateUser(data: any) {
        const JoiSchema = Joi.object({
            message: Joi.string()
                .required(),
            messageTime: Joi.string()
                .required()
        }).options({ abortEarly: false });
        return JoiSchema.validate(data)
    }
    let response = validateUser(data)

    if (response.error) {
        return { status: false, error: response.error }
    }
    else {
        return { status: true }
    }
}