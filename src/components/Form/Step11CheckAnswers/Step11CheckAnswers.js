import Button from 'components/shared/Button/Button';
import {format} from 'fecha';
// Import contexts
import {FormDataContext} from 'globalState/FormDataContext';
import PropTypes from 'prop-types';
import React, {useContext} from 'react';

import DataRow from './DataRow/DataRow';

const Step11CheckAnswers = ({isFetching}) => {
  const [formDataState] =
      useContext(FormDataContext); // Get the state/dispatch of form data from
                                   // FormDataContext
  const {formData} = formDataState;

  return (
    <>
      <h2>Check your answers before reinstating their Direct Debit</h2>
      {/* Ticket details */}
      <h3>Ticket details</h3>
      <div className="wmnds-grid">
        <DataRow
  label = "I am the ticket holder"
  value = {formData.TicketHolder} goToStep =
  {
    1
  } />
        <DataRow
          label="Swift card details"
          value={formData.SwiftCardNumber}
          goToStep={3}
        / >
      < DataRow
  label = "Started travelling again"
  value = {formData.TravelAgain} goToStep =
  {
    4
  } />
        <DataRow
          label="Resuming Travel"
          value={format(new Date(formData.TravelResumptionDate), 'D MMMM YYYY')}
          goToStep={5}
        / >
      </div>

      {/*Personal details * /}
      <h3>Personal details</h3>
      <div className = "wmnds-grid">< DataRow
  label = "Name"
  value = {`${formData.Firstname} ${formData.Lastname}`} goToStep =
  {
    6
  } />
        <DataRow
          label="Date of birth"
          value={format(new Date(formData.DateOfBirth), 'D MMMM YYYY')}
          goToStep={7}
        / >
      < DataRow
  label = "Contact details"
  value = {`${formData.PhoneNumber}<br/> ${formData.Email}`} goToStep =
  { 8 } />
      </div >

      {/* Direct Debit */}<h3>Direct Debit<
          /h3>
      <div className="wmnds-grid">
        <DataRow
          label="Direct Debit reference"
          value={formData.DirectDebitNumber}
          goToStep={2}
        /><
      DataRow
  label = "Account holder"
  value = {formData.BankAccountName} goToStep =
  {
    10
  } />
        <DataRow
          label="Bank or building society account number"
          value={formData.BankAccountNumber}
          goToStep={10}
        / >
      < DataRow
  label = "Branch sort code"
  value = {formData.BankAccountSortCode} goToStep =
  { 10 } />
      </div >

      <h3>Now send your request<
          /h3>
      <div className="wmnds-col-md-3-4">
        <p>
          By submitting this request you are confirming that, to the best of
          your knowledge, the details you are providing are correct.
        </p>
      <p>You consent to West Midlands Combined Authority possibly changing your
          Direct Debit date if it usually would occur in the next 10 days.
        </p>
        <p>
          You also consent to West Midlands Combined Authority reinstating your
          Direct Debit instruction.
        </p>
      </div>

      <div className="wmnds-col-1">
        {/* If API is fetching */}
        {isFetching && (
          <div
            className="wmnds-loader wmnds-loader--btn wmnds-btn__icon wmnds-btn__icon--right"
            role="alert"
            aria-live="assertive"
          >
            <p className="wmnds-loader__content">Content is loading...</p>
          </div>
        )}

        <Button
          disabled={isFetching}
          iconRight="general-chevron-right"
          isFetching={isFetching}
          type="submit"
          text="Accept and send"
        />
      </div>
    </>
  );
};

Step11CheckAnswers.propTypes = {
  isFetching : PropTypes.bool.isRequired,
};

export default Step11CheckAnswers;
