import { forwardRef } from "react";

export const FormField = forwardRef(({ type = "text", title, value, ...restProps }, ref) => {
    
    return (
        <div className={value?.length ? "form-field text-within" : "form-field"}>
            <input
                type={type}
                ref={ref}
                autoCapitalize="off"
                autoCorrect="off"
                className="form-field-input"
                {...restProps}
            />
            <label className="form-field-title">
                {title}
            </label>
        </div>
    );
});