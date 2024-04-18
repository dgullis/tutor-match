import React from 'react';
import '@testing-library/jest-dom'
import { BrowserRouter } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { ReviewsCarousel } from '../../src/components/ReviewsCarousel';
import {Carousel} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../src/components/ReviewsCarousel.css'

describe('ReviewsCarousel component unit tests', () => {
    
    it('renders correctly', () => {
        render(<ReviewsCarousel/>, {wrapper: BrowserRouter})
        expect(screen.getByText(/Without TutorMatch I could not afford tutoring./i)).toBeVisible()
        expect(screen.getByRole('button', {name: 'Next'})).toBeInTheDocument()
    })

    it.skip('correctly renders carousel slides', async () => {
        render(<ReviewsCarousel/>, {wrapper: BrowserRouter})
        expect(screen.getByLabelText('Slide 1')).toBeInTheDocument();
        expect(screen.getByLabelText('Slide 2')).toBeInTheDocument();
        expect(screen.getByLabelText('Slide 3')).toBeInTheDocument();
        expect(screen.getByLabelText('Slide 4')).toBeInTheDocument();
        expect(screen.getByLabelText('Slide 5')).toBeInTheDocument();
      
        // Assert that only the first slide button has aria-current="true" initially
        expect(screen.getByLabelText('Slide 1')).toHaveAttribute('aria-current', 'true');
        await fireEvent.click(screen.getByRole('button', {name: /next/i}))
    
        expect(screen.getByLabelText('Slide 2')).toHaveAttribute('aria-current', 'true');
        await fireEvent.click(screen.getByRole('button', {name: /next/i}))
        console.log(screen.debug())
        expect(screen.getByRole('button', {name: /slide 2/i})).toHaveAttribute('aria-current', 'true');
        expect(screen.getByLabelText('Slide 3')).toHaveAttribute('aria-current', 'true');
        await fireEvent.click(screen.getByRole('button', {name: /next/i}))
        expect(screen.getByLabelText('Slide 4')).toHaveAttribute('aria-current', 'true');
        await fireEvent.click(screen.getByRole('button', {name: /next/i}))
        expect(screen.getByLabelText('Slide 5')).toHaveAttribute('aria-current', 'true');
        await fireEvent.click(screen.getByRole('button', {name: /next/i}))
        expect(screen.getByLabelText('Slide 1')).toHaveAttribute('aria-current', 'true');
    })
})