const EmailTemplate = require('email-templates');
const nodemailer = require('nodemailer');
const path = require('path');

const {
    constants,
    errorMessage,
    statusCodes,
    variables
} = require('../config');
const { ErrorHandler } = require('../errors');
const templatesInfo = require('../email-templates');

const templateParser = new EmailTemplate({
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
});

const transporter = nodemailer.createTransport({
    service: constants.SERVICE,
    auth: {
        user: variables.NO_REPLY_EMAIL,
        pass: variables.NO_REPLY_EMAIL_PASSWORD
    }
});

const sendMail = async (userMail, emailAction, context = {}) => {
    const templateToSend = templatesInfo[emailAction];
    context = { ...context, frontendURL: variables.FRONTEND_URL };

    if (!templateToSend) {
        throw new ErrorHandler(statusCodes.INTERNAL_SERVER_ERROR, errorMessage.WRONG_TEMPLATE_NAME);
    }

    const { templateName, subject } = templateToSend;

    const html = await templateParser.render(templateName, context);

    return transporter.sendMail({
        from: constants.NO_REPLY,
        to: userMail,
        subject,
        html
    });
};

module.exports = {
    sendMail
};
