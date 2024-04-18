import React from 'react';
import '@testing-library/jest-dom'
import { BrowserRouter } from "react-router-dom";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import { AddSubject } from '../../src/components/AddSubject';
import { addSubject } from '../../src/services/subjects';

jest.mock('../../src/services/subjects', () => ({
    addSubject: jest.fn()
}))

describe('AddSubject component unit tests', () => {
    it('renders correctly', () => {
        render(<AddSubject/>, {wrapper: BrowserRouter})
        const gradeSelect = screen.getByLabelText('Select grade')
        expect(gradeSelect).toBeVisible()
        const subjectSelect = screen.getByLabelText('Select subject')
        expect(subjectSelect).toBeVisible() 
        
        expect(screen.getByRole('button', {name: 'Add to profile'})).toBeVisible()
    })
    it('allows user to select a grade', () => {
        render(<AddSubject/>, {wrapper: BrowserRouter})
        const gradeSelect = screen.getByLabelText('Select grade')
        fireEvent.change(gradeSelect, { target: { value: 'alevel' } });
        expect(gradeSelect.value).toBe('alevel'); 
    })
    
    it('allows user to select a subject', () => {
        render(<AddSubject/>, {wrapper: BrowserRouter})
        const subjectSelect = screen.getByLabelText('Select subject')
        fireEvent.change(subjectSelect, { target: { value: 'Maths' } }); 
        expect(subjectSelect.value).toBe('Maths'); 
    })

    it('calls addSubject after choosing subject and grade and clicking add to profile', async () => {
        addSubject.mockResolvedValueOnce({message: "subject added successfully"})
        render(<AddSubject
            firebaseId={'mockFirebaseId'}
            idToken={'mockIdToken'}
            onSubjectAdded={()=>{}}
        />, {wrapper: BrowserRouter})
        
        const gradeSelect = screen.getByLabelText('Select grade')
        const subjectSelect = screen.getByLabelText('Select subject')

        fireEvent.change(gradeSelect, { target: { value: 'alevel' } });
        fireEvent.change(subjectSelect, { target: { value: 'Maths' } }); 

        fireEvent.click(screen.getByRole('button', {name: 'Add to profile'}))

        await waitFor(() => {
            expect(screen.getByText('subject added successfully')).toBeVisible()
        })
    })
    it('displays error message if API call fails', async () => {
        addSubject.mockRejectedValueOnce({message: "failed to add subject"})
        render(<AddSubject
            firebaseId={'mockFirebaseId'}
            idToken={'mockIdToken'}
            onSubjectAdded={()=>{}}
        />, {wrapper: BrowserRouter})
        
        const gradeSelect = screen.getByLabelText('Select grade')
        const subjectSelect = screen.getByLabelText('Select subject')

        fireEvent.change(gradeSelect, { target: { value: 'alevel' } });
        fireEvent.change(subjectSelect, { target: { value: 'Maths' } }); 

        fireEvent.click(screen.getByRole('button', {name: 'Add to profile'}))

        await waitFor(() => {
            expect(screen.getByText('failed to add subject')).toBeVisible()
        })
    })
    

    it('displays prompt message when subject or grade not selected', async () => {
        render(<AddSubject/>, {wrapper: BrowserRouter})
        const gradeSelect = screen.getByLabelText('Select grade')
        const subjectSelect = screen.getByLabelText('Select subject')

        fireEvent.change(gradeSelect, { target: { value: 'alevel' } });

        fireEvent.click(screen.getByRole('button', {name: 'Add to profile'}))

        await waitFor(() => {
            expect(screen.getByText('Please select subject/grade.')).toBeVisible()
        })

       

        // expect(screen.getByRole('option', {name: 'Science'})).toBeVisible()
        // expect(screen.getByRole('option', {name: 'English'})).toBeVisible()
    })
})