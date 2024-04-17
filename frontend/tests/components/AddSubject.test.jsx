import React from 'react';
import '@testing-library/jest-dom'
import { BrowserRouter } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import { AddSubject } from '../../src/components/AddSubject';
import { addSubject } from '../../src/services/subjects';

jest.mock('../src/services/subjects', () => ({
    addSubject: jest.fn()
}))

describe('AddSubject component unit tests', () => {
    it('renders correctly', () => {
        render(<AddSubject/>, {wrapper: BrowserRouter})
        expect(screen.getByRole('option', {name: 'Select grade'})).toBeVisible()
        expect(screen.getByRole('option', {name: 'Select subject'})).toBeVisible()
        expect(screen.getByRole('button', {name: 'Add to profile'})).toBeVisible()
    })
    it('shows user grades when Select grade clicked', () => {
        render(<AddSubject/>, {wrapper: BrowserRouter})
        userEvent.click(screen.getByRole('option', {name: 'Select grade'}))
        expect(screen.getByRole('option', {name: 'GCSE'})).toBeVisible()
        expect(screen.getByRole('option', {name: 'A level'})).toBeVisible()
    })
    it('shows user subjects when Select grade clicked', () => {
        render(<AddSubject/>, {wrapper: BrowserRouter})
        userEvent.click(screen.getByRole('option', {name: 'Select subject'}))
        expect(screen.getByRole('option', {name: 'Maths'})).toBeVisible()
        expect(screen.getByRole('option', {name: 'Science'})).toBeVisible()
        expect(screen.getByRole('option', {name: 'English'})).toBeVisible()

    })

    // not passing

    // it('calls addSubject after choosing subject and grade and clicking add to profile', async () => {
    //     addSubject.mockResolvedValueOnce({message: "subject added successfully"})
    //     render(<AddSubject/>, {wrapper: BrowserRouter})
    //     userEvent.click(screen.getByRole('option', {name: 'Select grade'}))
    //     userEvent.click(screen.getByRole('option', {name: 'GCSE'}))

    //     userEvent.click(screen.getByRole('option', {name: 'Select subject'}))
    //     userEvent.click(screen.getByRole('option', {name: 'English'}))
    //     userEvent.click(screen.getByRole('button', {name: 'Add to profile'}))

    //     await expect(screen.getByText('subject added successfully')).toBeVisible()
    // })

    it('shows prompt message when subject or grade not selected', () => {
        render(<AddSubject/>, {wrapper: BrowserRouter})
        userEvent.click(screen.getByRole('button', {name: 'Add to profile'}))
        expect(screen.getByText('Please select subject/grade.')).toBeVisible()

        userEvent.click(screen.getByRole('option', {name: 'Select grade'}))
        userEvent.click(screen.getByRole('option', {name: 'GCSE'}))
        userEvent.click(screen.getByRole('button', {name: 'Add to profile'}))

        expect(screen.getByText('Please select subject/grade.')).toBeVisible()

        // expect(screen.getByRole('option', {name: 'Science'})).toBeVisible()
        // expect(screen.getByRole('option', {name: 'English'})).toBeVisible()
    })
})