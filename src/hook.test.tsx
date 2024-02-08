import { describe, expect, it, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import React from 'react';
import useLocalStorage from './hook';

describe('useLocalStorage', () => {

    const exampleKey = 'example';
    const initialValue = { hi: 'Hello' };
    const newValue = { hi: 'newValue' };

    const ExampleComponent = () => {
        const [value, setValue] = useLocalStorage(exampleKey, initialValue);
        return (
            <main>
                <p>{value.hi}</p>
                <button type="button" onClick={() => setValue(newValue)}></button>
            </main>
        );
    }

    afterEach(() => {
        cleanup();
        localStorage.clear();
    })

    it('should display the initial value', () => {
        render(<ExampleComponent />);
        expect(screen.getByText(initialValue.hi)).toBeDefined();
    });

    it('should display the stored value', () => {
        const newValue = { hi: 'newValue' };
        localStorage.setItem(exampleKey, JSON.stringify(newValue));

        render(<ExampleComponent />);
        expect(screen.getByText(newValue.hi)).toBeDefined();
    });

    it('should update the value', () => {
        const { container } = render(<ExampleComponent />);
        expect(screen.getByText(initialValue.hi)).toBeDefined();

        fireEvent.click(container.getElementsByTagName('button').item(0) as HTMLElement);
        expect(screen.getByText(newValue.hi)).toBeDefined();
        expect(localStorage.getItem(exampleKey)).toBe(JSON.stringify(newValue));
    });
});
