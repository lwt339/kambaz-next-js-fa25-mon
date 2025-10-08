
"use client";

import { useState, KeyboardEvent, ChangeEvent } from "react";
import { Form } from "react-bootstrap";

interface AssignToInputProps {

    value: string[];

    onChange: (newValue: string[]) => void;
    placeholder?: string;
    label?: string;
    boldLabel?: boolean;
    helperText?: string;
    hideHelperText?: boolean;
}

export default function AssignToInput({
                                          value,
                                          onChange,
                                          placeholder = "Type a name and press Enter",
                                          label,
                                          boldLabel = true,
                                          helperText = "Type a name and press Enter to add. Click X to remove.",
                                          hideHelperText = false
                                      }: AssignToInputProps) {

    const [inputValue, setInputValue] = useState<string>('');

    /**
     * Remove an assignment from the list
     */
    const removeAssignment = (nameToRemove: string) => {
        const newValue = value.filter(name => name !== nameToRemove);
        onChange(newValue);
    };

// Handle keyboard input in the text field
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            // Prevent form submission when Enter is pressed
            e.preventDefault();

            const trimmedValue = inputValue.trim();

            if (trimmedValue && !value.includes(trimmedValue)) {
                onChange([...value, trimmedValue]);
                setInputValue(''); // Clear
            }
        }
        // Optional backspace
        else if (e.key === 'Backspace' && inputValue === '' && value.length > 0) {
            const lastAssignment = value[value.length - 1];
            removeAssignment(lastAssignment);
        }
    };

    /**
     * Update the input
     */
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    /**
     * clicking in the container
     */
    const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const input = e.currentTarget.querySelector('input');
        if (input) {
            input.focus();
        }
    };


    return (
        <Form.Group className="mb-3">
            {/* Optiona */}
            {label && (
                <Form.Label className={boldLabel ? "fw-bold" : ""}>
                    {label}
                </Form.Label>
            )}

            <div
                className="border rounded p-2 d-flex flex-wrap align-items-center gap-2 bg-white"
                style={{
                    minHeight: '38px',
                    cursor: 'text'
                }}
                onClick={handleContainerClick}
            >

                {value.map((name, index) => (
                    <span
                        key={index}
                        className="badge bg-light text-dark border d-flex align-items-center gap-1"
                        style={{
                            fontSize: '14px',
                            fontWeight: 'normal',
                            padding: '4px 8px'
                        }}
                    >
                        {name}

                        {/* Remove button*/}
                        <button
                            type="button"
                            className="btn-close"
                            aria-label={`Remove ${name}`}
                            style={{
                                fontSize: '10px',
                                width: '12px',
                                height: '12px'
                            }}
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent triggering container click
                                removeAssignment(name);
                            }}
                        />
                    </span>
                ))}



                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder={value.length === 0 ? placeholder : ""}
                    style={{
                        border: 'none',
                        outline: 'none',
                        flex: '1',
                        minWidth: '120px',
                        padding: '4px',
                        fontSize: '14px',
                        backgroundColor: 'transparent'
                    }}
                />
            </div>


            {/* helper text*/}
            {!hideHelperText && (
                <Form.Text className="text-muted">
                    {helperText}
                </Form.Text>
            )}
        </Form.Group>
    );
}