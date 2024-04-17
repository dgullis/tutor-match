import React from 'react';
import '@testing-library/jest-dom'
import { BrowserRouter } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import { AddAvailability } from '../../src/components/AddAvailability';

describe('AddAvailability component tests', () => {
    it('renders correctly', () => {
        render(<AddAvailability/>, {wrapper: BrowserRouter})

        const dateTimePickers = screen.getAllByRole('combobox')
        expect(dateTimePickers).toHaveLength(2)
        expect(screen.getByRole('button', {name: 'Add to profile'})).toBeVisible()
    })
// find out how to select date / date from date / time picker
    // it('allows user to enter start date and time', async () => {
    //     render(<AddAvailability/>, {wrapper: BrowserRouter})
    //     const selectButtons = screen.getAllByRole('button', {name:'select'})
    //     expect(selectButtons).toHaveLength(2)
    //     await userEvent.click(selectButtons[0])
    //     await userEvent.click(screen.getByRole('button', {name: '1'}))
    //     expect(screen.getByRole('button', {name: 'hello'})).toBeVisible()

    // })
})