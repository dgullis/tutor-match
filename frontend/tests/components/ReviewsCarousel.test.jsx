import React from 'react';
import '@testing-library/jest-dom'
import { BrowserRouter } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import { ReviewsCarousel } from '../../src/components/ReviewsCarousel';
import { Browser } from '@syncfusion/ej2-base';

describe('ReviewsCarousel component unit tests', () => {
    
    // this passes with any review, needs to only be first review visible
    it('renders correctly', () => {
        render(<ReviewsCarousel/>, {wrapper: BrowserRouter})
        expect(screen.getByText(/Without TutorMatch I could not afford tutoring./i)).toBeVisible()
        expect(screen.getByRole('button', {name: 'Next'})).toBeInTheDocument()
    })

    it('displays second review when next button clicked', async () => {
        render(<ReviewsCarousel/>, {wrapper: BrowserRouter})
        await userEvent.click(screen.getByRole('button', {name: 'Next'}))
    })
})