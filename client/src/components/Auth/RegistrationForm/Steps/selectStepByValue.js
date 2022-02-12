import IdentificationStepContainer from "../../../../containers/Steps/IdentificationStepContainer";
import EmailConfirmationStepContainer from "../../../../containers/Steps/EmailConfirmationStepContainer";
import PasswordStepContainer from "../../../../containers/Steps/PasswordStepContainer";

function selectStepByValue(step, props) {
    switch(step) {
        case 1:
            return (
                <IdentificationStepContainer
                    nextStep={props.nextStep}
                    setUser={props.setUser}
                />
            );
        case 2:
            return (
                <PasswordStepContainer
                    nextStep={props.nextStep}
                    prevStep={props.prevStep}
                    setUser={props.setUser}
                />
            );
        case 3:
            return (
                <EmailConfirmationStepContainer
                    
                />
            );
        default:
            throw new Error("Unknown step");
    }
}

export default selectStepByValue;