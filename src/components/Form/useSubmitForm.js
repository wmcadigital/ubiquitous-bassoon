import { useState, useContext } from 'react';
// Import contexts
import { FormDataContext } from 'globalState/FormDataContext';

const useSubmitForm = (setFormSubmitStatus) => {
  const [formDataState, formDataDispatch] = useContext(FormDataContext); // Get the state/dispatch of form data from FormDataContext
  const [isFetching, setIsFetching] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // Destructure values from our formDataState (get all users values)
  const {
    BankAccountName,
    BankAccountNumber,
    BankAccountSortCode,
    DirectDebitNumber,
    SwiftCardNumber,
    TravelResumptionDate,
    Firstname,
    Lastname,
    DateOfBirth,
    Email,
    PhoneNumber,
    OneOffPaymentConsent,
    DDReinsatementConsent,
  } = formDataState.formData;

  // Map all destructured vals above to an object we will send to API
  // const dataToSend = {
  //   BankAccountName,
  //   BankAccountNumber,
  //   BankAccountSortCode,
  //   DirectDebitNumber,
  //   SwiftCardNumber,
  //   TravelResumptionDate,
  //   Firstname,
  //   Lastname,
  //   DateOfBirth,
  //   Email,
  //   PhoneNumber,
  //   OneOffPaymentConsent,
  //   DDReinsatementConsent,
  // };

  const dataToSend = {
    BankAccountName: 'Dayle',
    BankAccountNumber: '00000001',
    BankAccountSortCode: '00-00-01',
    DirectDebitNumber: '60000001',
    SwiftCardNumber: '633597010700000000',
    TravelResumptionDate: '2020-05-10',
    Firstname: 'Dayle',
    Lastname: 'Salmon',
    DateOfBirth: '2000-01-01',
    Email: 'test@test.com',
    PhoneNumber: '01213334444',
    OneOffPaymentConsent: 'true',
    DDReinsatementConsent: 'true',
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission method
    setIsFetching(true); // Set this so we can put loading state on button
    // Go hit the API with the data
    fetch(process.env.REACT_APP_API_HOST, {
      method: 'post',
      body: JSON.stringify(dataToSend),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        // If the response is successful(200: OK) or error with validation message(400)
        if (response.status === 200 || response.status === 400) {
          return response.json(); // Return response as json
        }
        throw new Error(response.statusText, response.Message); // Else throw error and go to our catch below
      })
      // If formsubmission is successful
      .then((payload) => {
        console.log({ payload });
        // formDispatch({ type: 'ADD_FORM_REF', payload }); // Update form state with the form ref received from server
        // Log event to analytics/tag manager
        // window.dataLayer.push({
        //   event: 'formAbandonment',
        //   eventCategory: 'Refund form submission: success',
        //   eventAction: `CustomerType:${formState.CustomerType}`,
        // });
        setIsFetching(false); // set to false as we are done fetching now
        if (payload.Message) {
          setErrorMessage(payload.Message);
        } else {
          setFormSubmitStatus(true); // Set form status to success
          window.scrollTo(0, 0); // Scroll to top of page
        }
      })
      // If formsubmission errors
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error({ error });
        let errMsg;

        if (error.text) {
          error.text().then((errorMessage) => {
            errMsg = errorMessage;
          });
        } else {
          errMsg = error;
        }

        // Log event to analytics/tag manager
        // window.dataLayer.push({
        //   event: 'formAbandonment',
        //   eventCategory: 'Refund form submission: error',
        //   eventAction: errMsg,
        // });
        setIsFetching(false); // set to false as we are done fetching now
        setFormSubmitStatus(false); // Set form status to error
        window.scrollTo(0, 0); // Scroll to top of page
      });
  };

  // Return handleSubmit and isFetching so it can be used by form
  return {
    handleSubmit,
    isFetching,
    errorMessage,
  };
};

export default useSubmitForm;
