import React, { forwardRef, useState } from 'react';

export const FormField = forwardRef(({ type = "text", title, value, onChange, error, ...restProps }, ref) => {
    const classes = ["form-field"];
    if (value?.length) classes.push("text-within")
    if (error) classes.push("input-error")

    return (
        <div>     
            <div className={classes.join(" ")}>
                <input
                    type={type}
                    ref={ref}
                    autoCapitalize="off"
                    autoCorrect="off"
                    className="form-field-input"
                    onChange={onChange}
                    {...restProps}
                />
                <label className="form-field-title">
                    {title}
                </label>
            </div>
            <p className="form-error-text">{error}</p>
        </div>
    );
});

export const FormTextArea = forwardRef(({ title, value, onChange, error, ...restProps }, ref) => {
    const classes = ["form-field"];
    if (error) classes.push("input-error");
    if (value?.length) classes.push("text-within");

    return (
        <div>
            <div className={classes.join(" ")}>
                <textarea
                    ref={ref}
                    autoCapitalize="off"
                    autoCorrect="off"
                    className="form-field-textarea"
                    onChange={onChange}
                    {...restProps}
                />
                <label className="form-field-textarea-title">
                    {title}
                </label>
            </div>
            <p className="form-error-text">{error}</p>
        </div>
    );
});

export const FormSelect = forwardRef(({ title, value, onChange, error, options, displayKey, ...restProps }, ref) => {
    const classes = ["form-field"];
    if (value?.length) classes.push("text-within");
    if (error) classes.push("input-error");

    return (
        <div>
            <div className={classes.join(" ")}>
                <select
                    ref={ref}
                    className="form-field-input"
                    onChange={onChange}
                    value={value}
                    {...restProps}
                >
                    <option value={""}/>
                    {options?.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option[displayKey]}
                        </option>
                    ))}
                </select>
                <label className="form-field-title">
                    {title}
                </label>
            </div>
            <p className="form-error-text">{error}</p>
        </div>
    );
});

export const FormMultiSelect = forwardRef(({ title, value = [], onChange, error, options, displayKey, ...restProps }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const classes = ["form-field"];
    if (value?.length || isOpen) classes.push("text-within");
    if (error) classes.push("error");

    const handleChange = (e) => {
        const selectedValue = e.target.value;
        const newValue = value.includes(selectedValue) 
            ? value.filter(v => v !== selectedValue)
            : [...value, selectedValue];
        
        if (onChange) {
            const event = {
                target: {
                    value: newValue
                }
            };
            onChange(event);
        }
    };

    return (
        <div>
            <div className={classes.join(" ")}>
                <div 
                    className="form-field-input multi-select-input"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="selected-options">
                        {value.map((selectedValue, index) => {
                            const option = options?.find(opt => opt.value === selectedValue);
                            return (
                                <div key={index} className="selected-option">
                                    {option?.[displayKey]}
                                </div>
                            );
                        })}
                    </div>
                    <div className="multi-select-dropdown" style={{ display: isOpen ? 'block' : 'none' }}>
                        {options?.map((option, index) => (
                            <div 
                                key={index} 
                                className={`multi-select-option ${value.includes(option.value) ? 'selected' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleChange({ target: { value: option.value } });
                                }}
                            >
                                {option[displayKey]}
                            </div>
                        ))}
                    </div>
                </div>
                <label className="form-field-title">
                    {title}
                </label>
            </div>
            <p className="form-error-text">{error}</p>
        </div>
    );
});

export function DefaultToggle({ titleOn, titleOff, onChange }) {
    const [isOn, setIsOn] = useState(false);

    const handleToggle = () => {
        const newIsOn = !isOn;
        setIsOn(newIsOn);
        if (onChange) {
            onChange(newIsOn);
        }
    };

    return (
        <div className="toggle-container" onClick={handleToggle}>
            <div className={`toggle-switch ${isOn ? 'on' : 'off'}`}>
                <div className="toggle-circle"></div>
            </div>
            <div className="toggle-title">
                {isOn ? titleOn : titleOff}
            </div>
        </div>
    );
};