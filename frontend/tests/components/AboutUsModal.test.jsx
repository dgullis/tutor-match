import React from 'react';
import '@testing-library/jest-dom'
import { BrowserRouter } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import { AboutUsModal } from '../../src/components/AboutUsModal'
import { LandingPage } from "../../src/pages/LandingPage";



describe('AboutUsModal component tests', () => {

    it('Renders correctly', () => {
        render(<AboutUsModal />)
        expect(screen.getByRole('button', {name: 'About Us'})).toBeInTheDocument()
    })

    it('Displays content when button is pressed', async () => {

        render(<AboutUsModal />, {wrapper: BrowserRouter})

        await userEvent.click(screen.getByRole('button', {name: 'About Us'}))

        await expect(screen.getByText(/Completed during the Makers Academy software development Bootcamp./i)).toBeVisible()        
        
    })

    it('Hides content when button is pressed', async () => {

        render(<AboutUsModal />, {wrapper: BrowserRouter})

        await userEvent.click(screen.getByRole('button', {name: 'About Us'}))

        await expect(screen.getByText(/Completed during the Makers Academy software development Bootcamp./i)).toBeVisible()        
        
        expect(screen.getByLabelText('Close')).toBeInTheDocument()
        await userEvent.click(screen.getByLabelText('Close'))

        await waitFor(() => 
            expect(screen.queryByText(/Completed during the Makers Academy software development Bootcamp./i)).not.toBeInTheDocument() 
        )
    })

    it('Displays correct link to github profile URL of contributor', async () => {

        render(<AboutUsModal />, {wrapper: BrowserRouter})

        await userEvent.click(screen.getByRole('button', {name: 'About Us'}))

        const githubLink = screen.getByText('@dgullis')
        expect(githubLink).toBeInTheDocument();
        expect(githubLink).toHaveAttribute('href', 'https://github.com/dgullis');

        })
})

