import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import AboutMe from '../../src/components/AboutMe'
import { useAuth, AuthProvider } from "../../src/components/authContext";
import { updateBio } from "../../src/services/users";


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

  jest.mock('../../src/services/users', () => ({
    updateBio: jest.fn()
}))


describe('AboutMe Component tests', () => {
 
    it('renders correctly', async () => {
        const mockUserDetails = {
            firebase_id: 'mockFirebaseId', 
            bio: 'Mock Bio'
        }

        render (<AboutMe userDetails={mockUserDetails} /> )
            
        const textarea = screen.getByRole('textbox')
        expect(textarea).toBeInTheDocument()
        expect(textarea).toHaveTextContent('Mock Bio')
        expect(screen.getByRole('button', {name: 'Edit'})).toBeInTheDocument()

    })

    it('Allows user to edit and save their bio', async () => {
        const mockUserDetails = {
            firebase_id: 'mockFirebaseId', 
            bio: 'Mock Bio'
        }

        render (<AboutMe userDetails={mockUserDetails} /> )

        const textarea = screen.getByRole('textbox')
        await userEvent.click(screen.getByRole('button', {name: 'Edit'}))
        await userEvent.clear(textarea)
        await userEvent.type(textarea, 'new mock bio')
        expect(textarea).toHaveTextContent('new mock bio')
        expect(screen.getByRole('button', {name: 'Save'})).toBeInTheDocument()
        await userEvent.click(screen.getByRole('button', {name: 'Save'}))
        expect(updateBio).toHaveBeenCalledWith('mockFirebaseId', 'new mock bio','mockedIdToken')

    })
})
