import React from 'react';
import '@testing-library/jest-dom'
import { BrowserRouter } from "react-router-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import { BookingRequestCalender } from '../../src/components/BookingRequestCalender';
import { requestBooking } from '../../src/services/bookings';
import { sendEmail } from '../../src/services/emailCommunications';

jest.mock('../../src/services/bookings', () => ({
    requestBooking: jest.fn()
}))

jest.mock('../../src/services/emailCommunications', () => ({
    sendEmail: jest.fn()
}))




jest.mock('../../src/components/authContext', () => {
    const originalModule = jest.requireActual('../../src/components/authContext');
    return {
        ...originalModule,
        useAuth: () => ({
            user: { name: 'Test User' },
            mongoUser: {},
            signUpAuth: jest.fn(),
            logInAuth: jest.fn(),
            signOutAuth: jest.fn(),
            isLoading: false,
            idToken: 'mockedIdToken', // Your mocked idToken value
        }),
    };
  });

describe('BookingRequestsComponent unit tests', () => {
    const props = {
        tutorDetails: {
          firebase_id: "mockTutorFirebaseId",
          availability: [{
            start_time: "2024-04-30T13:00:00.000Z",
            end_time: "2024-04-30T14:00:00.000Z",
            available: true
          }]
        },
        loggedInUser: { firebase_id: "mockTutorFirebaseId" },
        onRequestBooking: () => {},
        showSubmit: true
      };
    

    it('renders correctly', async() => {
       
        render(
            <BookingRequestCalender {...props}/>, {wrapper: BrowserRouter})


            expect(screen.getByRole('dialog', { name: /choose date and time/i })).toBeVisible()
            expect(screen.getByRole('option', {name: /choose tuesday, april 30th, 2024/i} )).toBeVisible()
            expect(screen.getByRole('button', {name: 'Request'})).toBeVisible()
    })
    it('allows user to select a date and time', () => {
        render(<BookingRequestCalender {...props}/>, {wrapper: BrowserRouter})
        const datePicker = screen.getByRole('dialog', { name: /choose date and time/i })
        fireEvent.change(datePicker, { target: { selected: 'Tue Apr 30 2024 13:00:00 GMT+0200 (Central European Summer Time)' } });
        expect(datePicker.selected).toBe('Tue Apr 30 2024 13:00:00 GMT+0200 (Central European Summer Time)')
        
    })
    it('displays success message when booking successfully requested', async () => {
        requestBooking.mockResolvedValueOnce({success: true, message: 'request sent'})
        sendEmail.mockResolvedValueOnce({})
        
        render(<BookingRequestCalender {...props}/>, {wrapper: BrowserRouter})

        const datePicker = screen.getByRole('dialog', { name: /choose date and time/i })
        const requestButton = screen.getByRole('button', {name: 'Request'})

        fireEvent.change(datePicker, { target: { selected: 'Tue Apr 30 2024 13:00:00 GMT+0200 (Central European Summer Time)' } });
        await userEvent.click(requestButton)
        expect(datePicker.selected).toBe('Tue Apr 30 2024 13:00:00 GMT+0200 (Central European Summer Time)')
        await waitFor(()=>{
            expect(screen.getByText('request sent')).toBeVisible()
        })
        
    })

    it('displays error message when request is unsuccessfull', async () => {
        requestBooking.mockRejectedValueOnce({success: false, error: 'error requesting'})
        
        render(<BookingRequestCalender {...props}/>, {wrapper: BrowserRouter})

        const datePicker = screen.getByRole('dialog', { name: /choose date and time/i })
        const requestButton = screen.getByRole('button', {name: 'Request'})

        fireEvent.change(datePicker, { target: { selected: 'Tue Apr 30 2024 13:00:00 GMT+0200 (Central European Summer Time)' } });
        await userEvent.click(requestButton)
        expect(datePicker.selected).toBe('Tue Apr 30 2024 13:00:00 GMT+0200 (Central European Summer Time)')
        await waitFor(()=>{
            expect(screen.getByText('error requesting')).toBeVisible()
        })
        
    })


    
        
})