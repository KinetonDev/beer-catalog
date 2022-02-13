import IdentificationStepContainer from "../../../../containers/Steps/IdentificationStepContainer";
import EmailConfirmationStepContainer from "../../../../containers/Steps/EmailConfirmationStepContainer";
import PasswordStepContainer from "../../../../containers/Steps/PasswordStepContainer";

function selectStepByValue(step, props) {
    switch(step) {
        case 1:
            return (
                <IdentificationStepContainer
                    nextStep={props.nextStep}
                    handleChange={props.handleChange}
                    handleBlur={props.handleBlur}
                    values={props.values}
                    errors={props.errors}
                    touched={props.touched}
                />
            );
        case 2:
            return (
                <PasswordStepContainer
                    nextStep={props.nextStep}
                    prevStep={props.prevStep}
                    handleChange={props.handleChange}
                    handleBlur={props.handleBlur}
                    values={props.values}
                    errors={props.errors}
                    touched={props.touched}
                />
            );
        case 3:
            return (
                <EmailConfirmationStepContainer
                    isSubmitting={props.isSubmitting}
                    handleChange={props.handleChange}
                    handleBlur={props.handleBlur}
                    values={props.values}
                    errors={props.errors}
                    touched={props.touched}
                    handleSubmit={props.handleSubmit}
                />
            );
        default:
            throw new Error("Unknown step");
    }
}

export default selectStepByValue;