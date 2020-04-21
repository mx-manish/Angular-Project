const userProfileSchema = {
    id: 'UserProfileValidation',
    type: 'object',
    properties: {
        email: {
            type: 'string',
            required: true,
            maxLength: 50,
            minLength: 8
        },
        name: {
            type: 'string',
            required: true,
            maxLength: 100,
            minLength: 4
        },
        mobile: {
            type: 'string',
            required: true,
            maxLength: 10,
            minLength: 10
        },
        dob: {
            type: 'string',
            required: true,
            maxLength: 10,
            minLength: 10
        },
        user_id: {
            type: 'number',
            required: true
        },
        city: {
            type: 'string',
            required: true,
            maxLength: 100,
            minLength: 3
        },
    },
    additionalProperties: false
}

const userProfileStore = {
    'email': {
        'type': 'Email should be of string type',
        'required': 'Email id is required',
        'maxLength': 'Email exceeds maximum character length of 50',
        'minLength': 'Email should have minimum character length of 8'
    },
    'name': {
        'type': 'name should be of type: String',
        'required': 'name is required',
        'maxLength': 'name exceeds maximum character length of 100',
        'minLength': 'name should have minimum character length of 4'
    },
    'mobile': {
        'type': 'Mobile Number should be of type: String',
        'required': 'Mobile Number is required',
        'maxLength': 'Mobile Number exceeds maximum character length of 10',
        'minLength': 'Mobile Number should have minimum character length of 10'
    },
    'dob': {
        'type': 'DOB should be of type: String',
        'required': 'DOB is required',
        'maxLength': 'DOB exceeds maximum character length of 10',
        'minLength': 'DOB should have minimum character length of 10'
    },
    'city': {
        'type': 'City should be of type: String',
        'required': 'City is required',
        'maxLength': 'City exceeds maximum character length of 100',
        'minLength': 'City should have minimum character length of 3'
    },
    'user_id': {
        'type': 'User Id should be of type: Number',
        'required': 'User Id is required'
    }
}

const userLoginSchema = {
    id: 'UserLoginValidation',
    type: 'object',
    properties: {
        email: {
            type: 'string',
            required: true,
            maxLength: 50,
            minLength: 8
        },
        password: {
            type: 'string',
            required: true,
            maxLength: 50,
            minLength: 8
        }
    },
    additionalProperties: false
}

const userLoginStore = {
    'email': {
        'type': 'Email should be of string type',
        'required': 'Email id is required',
        'maxLength': 'Email exceeds maximum character length of 20',
        'minLength': 'Email should have minimum character length of 7'
    },
    'password': {
        'type': 'Password should be of type: String',
        'required': 'Password is required',
        'maxLength': 'Password exceeds maximum character length of 20',
        'minLength': 'Password should have minimum character length of 8'
    }
}

exports.errStore = {
    userLoginStore,
    userProfileStore
}

exports.schema = {
    userLoginSchema,
    userProfileSchema
}