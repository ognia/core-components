import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Confirmation, ConfirmationProps } from './index';

/**
 * TODO: сделать тесты на весь объект texts
 * TODO: сделать тесты на все callbacks
 * TODO: сделать тесты на все остальные пропсы
 * TODO: сделать тесты на все таймеры
 */
describe('Confirmation', () => {
    const baseProps: ConfirmationProps = {
        screen: 'INITIAL',
        state: 'INITIAL',
        onChangeScreen: jest.fn(),
        onChangeState: jest.fn(),
        onInputFinished: jest.fn(),
        onSmsRetryClick: jest.fn(),
    };

    describe('Snapshot tests', () => {
        it('should match snapshot', () => {
            const { container } = render(<Confirmation {...baseProps} />);

            expect(container).toMatchSnapshot();
        });

        it('should match snapshot with CODE_CHECKING state', () => {
            const { container } = render(<Confirmation {...baseProps} state='CODE_CHECKING' />);

            expect(container).toMatchSnapshot();
        });

        it('should match snapshot with CODE_SENDING state', () => {
            const { container } = render(<Confirmation {...baseProps} state='CODE_SENDING' />);

            expect(container).toMatchSnapshot();
        });

        it('should match snapshot with CODE_ERROR state', () => {
            const { container } = render(<Confirmation {...baseProps} state='CODE_ERROR' />);

            expect(container).toMatchSnapshot();
        });

        it('should match snapshot with FATAL_ERROR screen', () => {
            const { container } = render(<Confirmation {...baseProps} screen='FATAL_ERROR' />);

            expect(container).toMatchSnapshot();
        });

        it('should match snapshot with HINT screen', () => {
            const { container } = render(<Confirmation {...baseProps} screen='TEMP_BLOCK' />);

            expect(container).toMatchSnapshot();
        });

        it('should match snapshot with HINT screen', () => {
            const { container } = render(<Confirmation {...baseProps} screen='HINT' />);

            expect(container).toMatchSnapshot();
        });
    });

    it('should set `data-test-id` attribute', () => {
        const testId = 'test-id';
        const { getByTestId } = render(<Confirmation {...baseProps} dataTestId={testId} />);

        expect(getByTestId(testId)).toBeInTheDocument();
    });

    it('should set custom class', () => {
        const className = 'custom-class';
        const { container } = render(<Confirmation {...baseProps} className={className} />);

        expect(container.firstElementChild).toHaveClass(className);
    });

    describe('Input tests', () => {
        const getActiveElement = () => document.activeElement as Element;

        it('should focus input on first render', () => {
            const { container } = render(<Confirmation {...baseProps} />);

            expect(getActiveElement()).toBe(container.querySelector('input'));
        });

        it('should call onInputFinished when input is finished', () => {
            const onInputFinished = jest.fn();

            const { container } = render(
                <Confirmation
                    {...baseProps}
                    onInputFinished={onInputFinished}
                    requiredCharAmount={2}
                />,
            );

            const inputs = container.querySelectorAll('input');

            fireEvent.change(inputs[0], { target: { value: '1' } });
            fireEvent.change(inputs[1], { target: { value: '2' } });

            expect(onInputFinished).toBeCalledTimes(1);
        });
    });
});
