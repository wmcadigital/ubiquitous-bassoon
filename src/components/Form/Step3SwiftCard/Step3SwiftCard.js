import React from 'react';
import PropTypes from 'prop-types';
// Import custom hooks
import useStepLogic from 'components/Form/useStepLogic';
// Import components
import Input from 'components/shared/FormElements/Input/Input';

const Step3SwiftCard = ({ setCurrentStep, formRef }) => {
  // Custom hook for handling continue button (validation, errors etc)
  const { register, showGenericError, handleContinue } = useStepLogic(
    setCurrentStep,
    formRef
  );

  const swiftLabel = 'Swift card number';

  return (
    <>
      {/* Subsection */}
      <div>
        Section 1 of 3 <h4>About your ticket</h4>
      </div>

      {/* Show generic error message */}
      {showGenericError}

      <fieldset className="wmnds-fe-fieldset">
        <legend className="wmnds-fe-fieldset__legend">
          <h2>What is your Swift card number?</h2>
          <p>
            This is the long number on the front of the card and begins with{' '}
            <strong>633597</strong>
          </p>
          <p>Enter the number without spaces</p>
        </legend>
        <Input
          className="wmnds-col-1 wmnds-col-sm-3-4 wmnds-col-md-1-2"
          name="SwiftCardNumber"
          label={swiftLabel}
          inputmode="numeric"
          fieldRef={register({
            required: `${swiftLabel} is required`,
            validate: {
              notNX: (val) =>
                val.substr(0, 10) !== '6335970112' ||
                `${swiftLabel} is managed by National Express West Midlands and there is a <a
              href="https://nxbus.co.uk/west-midlands/news/ticket-refunds-due-to-covid19"
              title="National Express West Midlands ticket refund process"
              target="_blank"
              className="wmnds-link"
            >
              separate refund process
            </a>`,
              validSwiftNo: (val) =>
                val.substr(0, 10) === '6335970107' ||
                val.substr(0, 10) === '6335970319' ||
                `Your ${swiftLabel} is the long number on the front of the card`,
              shouldBe18Digits: (val) =>
                val.length === 18 ||
                `Your ${swiftLabel} is 18 digits long and begins with 633597`,
            },
          })}
        />
      </fieldset>

      {/* Continue button */}
      <button
        type="button"
        className="wmnds-btn wmnds-btn--disabled wmnds-col-1 wmnds-m-t-md"
        onClick={handleContinue}
      >
        Continue
      </button>
    </>
  );
};

Step3SwiftCard.propTypes = {
  setCurrentStep: PropTypes.func.isRequired,
  formRef: PropTypes.oneOfType([
    // Either a function
    PropTypes.func,
    // Or the instance of a DOM native element (see the note about SSR)
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
};

export default Step3SwiftCard;
