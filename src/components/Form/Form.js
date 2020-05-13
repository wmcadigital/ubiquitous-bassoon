import React, { useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { useForm, FormContext } from 'react-hook-form'; // https://react-hook-form.com/
// Import contexts
import { FormDataContext } from 'globalState/FormDataContext';
// Import components
import Step1TicketHolder from 'components/Form/Step1TicketHolder/Step1TicketHolder';
import Step2DDRef from 'components/Form/Step2DDRef/Step2DDRef';
import Step3SwiftCard from 'components/Form/Step3SwiftCard/Step3SwiftCard';
import Step4TravelAgain from 'components/Form/Step4TravelAgain/Step4TravelAgain';
import Step5TravelDate from 'components/Form/Step5TravelDate/Step5TravelDate';
import Step6Name from 'components/Form/Step6Name/Step6Name';
import Step7DOB from './Step7DOB/Step7DOB';
import Step8Contact from './Step8Contact/Step8Contact';
import Step9DDPayMessage from './Step9DDPayMessage/Step9DDPayMessage';
import Step10DDBankDetails from './Step10DDBankDetails/Step10DDBankDetails';
import Step11CheckAnswers from './Step11CheckAnswers/Step11CheckAnswers';
// Import custom hooks
import useSubmitForm from './useSubmitForm';
import useTrackFormAbandonment from './useTrackFormAbandonment';
// Import styling
import s from './Form.module.scss';

const Form = ({ formSubmitStatus, setFormSubmitStatus }) => {
  const [formDataState, formDataDispatch] = useContext(FormDataContext); // Get the state/dispatch of form data from FormDataContext
  const formRef = useRef(null); // Ref for tracking the dom of the form (used in Google tracking)
  // Trigger validation onBlur events (config for react hook form lib)
  const methods = useForm({
    mode: 'onBlur',
  });
  // Get handleSubmit fn and isFetching from custom hook which handles submitting data to API
  const { handleSubmit, isFetching, errorMessage } = useSubmitForm(
    setFormSubmitStatus
  );

  useTrackFormAbandonment(formRef, formDataState.currentStep, formSubmitStatus); // Used to track user abandonment via Google Analytics/Tag Manager

  // Show debug options for below (this should be deleted on release)
  const debugStepOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  return (
    <>
      {/* pass all methods into the context */}
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <FormContext {...methods}>
        <div className="wmnds-col-1 wmnds-col-md-3-4 ">
          <div className={`wmnds-p-lg ${s.formWrapper}`}>
            {/* Start of form */}
            <form onSubmit={handleSubmit} autoComplete="on" ref={formRef}>
              {formDataState.currentStep === 1 && (
                <Step1TicketHolder formRef={formRef} />
              )}

              {/* Section 1 - About your ticket */}
              {formDataState.currentStep === 2 && (
                <Step2DDRef formRef={formRef} />
              )}
              {formDataState.currentStep === 3 && (
                <Step3SwiftCard formRef={formRef} />
              )}
              {formDataState.currentStep === 4 && (
                <Step4TravelAgain formRef={formRef} />
              )}
              {formDataState.currentStep === 5 && (
                <Step5TravelDate formRef={formRef} />
              )}

              {/* Section 2 - About you */}
              {formDataState.currentStep === 6 && (
                <Step6Name formRef={formRef} />
              )}
              {formDataState.currentStep === 7 && (
                <Step7DOB formRef={formRef} />
              )}
              {formDataState.currentStep === 8 && (
                <Step8Contact formRef={formRef} />
              )}

              {/* Section 3 - Direct Debit */}
              {formDataState.currentStep === 9 && (
                <Step9DDPayMessage formRef={formRef} />
              )}
              {formDataState.currentStep === 10 && (
                <Step10DDBankDetails formRef={formRef} />
              )}

              {/* Check answers */}
              {formDataState.currentStep === 11 && (
                <Step11CheckAnswers
                  formRef={formRef}
                  isFetching={isFetching}
                  errorMessage={errorMessage}
                />
              )}
            </form>
          </div>
        </div>
        {/* If in development based on envs then show form debugging */}
        {/* {process.env.NODE_ENV !== 'production' && ( */}
        <div
          className="wmnds-col-1 wmnds-col-md-1-4 wmnds-p-md"
          style={{
            overflowX: 'auto',
            position: 'fixed',
            right: 0,
          }}
        >
          <pre>{JSON.stringify(formDataState, null, 2)}</pre>
          <br />
          <div className="wmnds-col-1">
            Select step: {}
            <select
              onChange={(e) =>
                formDataDispatch({
                  type: 'UPDATE_STEP',
                  payload: +e.target.value,
                })
              }
              onBlur={(e) =>
                formDataDispatch({
                  type: 'UPDATE_STEP',
                  payload: +e.target.value,
                })
              }
              value={formDataState.currentStep}
            >
              {debugStepOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* )} */}
      </FormContext>
    </>
  );
};

Form.propTypes = {
  formSubmitStatus: PropTypes.bool,
  setFormSubmitStatus: PropTypes.func.isRequired,
};

Form.defaultProps = {
  formSubmitStatus: null,
};
export default Form;
