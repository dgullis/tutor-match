import React from 'react';
import '@testing-library/jest-dom'
import { BrowserRouter } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import ProfileSubjects from '../../src/components/ProfileSubjects';

describe('ProfileSubjects component unit tests', () => {

    it('displays only gcse subjects correctly', () => {
        const props = {gcse: [{name: 'Maths'}]}
        render(<ProfileSubjects {...props} />, {wrapper: BrowserRouter})
        expect(screen.getByText('Available to tutor')).toBeVisible()
        expect(screen.getByText('GCSEs:')).toBeVisible()
        expect(screen.getByText('Maths')).toBeVisible()

    })

    it('displays only a level subjects correctly', () => {
        const props = {alevel: [{name: 'Science'}]}
        render(<ProfileSubjects {...props} />, {wrapper: BrowserRouter})
        expect(screen.getByText('Available to tutor')).toBeVisible()
        expect(screen.getByText('A Levels:')).toBeVisible()
        expect(screen.getByText('Science')).toBeVisible()
        
    })

    it('displays both gcse and alevel subjects correctly', () => {
        const props = {alevel: [{name: 'Science'}], gcse: [{name: 'English'}]}
        render(<ProfileSubjects {...props} />, {wrapper: BrowserRouter})
        expect(screen.getByText('Available to tutor')).toBeVisible()
        expect(screen.getByText('A Levels:')).toBeVisible()
        expect(screen.getByText('GCSEs:')).toBeVisible()
        expect(screen.getByText('Science')).toBeVisible()
        expect(screen.getByText('English')).toBeVisible()
    })

    it('displays nothing if no gcse or a levels', () => {
        const props = {}
        render(<ProfileSubjects {...props}/>, {wrapper: BrowserRouter})
        const text = screen.queryByText('Available to tutor')
        expect(text).toBeNull()
    })
})