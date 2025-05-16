// PaymentPage.jsx

import React from 'react';
import './PaymentPage.css';
import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/react';


const PaymentPage = () => {
    // const handlePayment = () => {
    //     alert("Payment Successful!");
    //     localStorage.removeItem('cart');
    // };

    return (
        <div className="payment-page">
            <h1>Payment</h1>
            

            <Alert
  status='success'
  variant='subtle'
  flexDirection='column'
  alignItems='center'
  justifyContent='center'
  textAlign='center'
  height='200px'
>
  <AlertIcon boxSize='40px' mr={0} />
  <AlertTitle mt={4} mb={1} fontSize='lg'>
    Product Has Been Ordered !
  </AlertTitle>
  <AlertDescription maxWidth='sm'>
    Thanks for ordering from us we will ship as soon as possible
  </AlertDescription>
</Alert>
        </div>
    );
};

export default PaymentPage;
