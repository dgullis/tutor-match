import React from 'react';
import '@testing-library/jest-dom'
import { BrowserRouter } from "react-router-dom";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import { AddAvailability } from '../../src/components/AddAvailability';
import { addAvailability } from '../../src/services/users';
import '../../src/App.css'


jest.mock('../../src/services/users', () => ({
    addAvailability: jest.fn(),
}));


describe('AddAvailability component tests', () => {
    
    it('renders correctly', () => {
        render(<AddAvailability/>, {wrapper: BrowserRouter})

        const dateTimePickers = screen.getAllByRole('combobox')
        expect(dateTimePickers).toHaveLength(2)
        expect(screen.getByRole('button', {name: 'Add to profile'})).toBeVisible()
    })

    it('Displays error message if both start / end times are not filled', async () => {
        render(<AddAvailability/>, {wrapper: BrowserRouter})

        const startDateInput = screen.getByPlaceholderText('Choose start date and time');
        const addToProfileButton = screen.getByRole('button', {name: 'Add to profile'});
        
        startDateInput.value = "17-04-24 19:00";
        await userEvent.click(addToProfileButton)
        expect(screen.getByText(/End date and time must be at least one hour after start date/i)).toBeInTheDocument()
       
    })

    it('hides error message when user click close button', async () => {
        render(<AddAvailability/>, {wrapper: BrowserRouter})

        const startDateInput = screen.getByPlaceholderText('Choose start date and time');
        const addToProfileButton = screen.getByRole('button', {name: 'Add to profile'});
        
        startDateInput.value = "17-04-24 19:00";
        await userEvent.click(addToProfileButton)
        expect(screen.getByText(/End date and time must be at least one hour after start date/i)).toBeInTheDocument()
        const closeAlertButton = screen.getByLabelText('Close alert');
        expect(closeAlertButton).toBeVisible()
        await userEvent.click(closeAlertButton)
        expect(closeAlertButton).not.toBeVisible()
    })

    it('displays success message when availability succussfully added', async () => {
       
        addAvailability.mockResolvedValue({message: "Custom success message"})

        render(<AddAvailability/>, {wrapper: BrowserRouter})

        const startDateInput = screen.getByPlaceholderText('Choose start date and time');
        const endDateInput = screen.getByPlaceholderText('Choose end date and time');
        const addToProfileButton = screen.getByRole('button', {name: 'Add to profile'});

        fireEvent.change(startDateInput, { target: { value: new Date() } })
        fireEvent.change(endDateInput, { target: { value: new Date() } })

        screen.logTestingPlaygroundURL()
  
        // needs completing
        

    })



})