import React from "react";
import { FormField } from "../../util/Inputs";
import { useForm } from "react-hook-form";
import { DefaultButton } from "../../util/Buttons";
import { NavLink, useNavigate } from "react-router-dom";
import { registerUser, test } from "../../../util/requests";

export default function CreateAccountPage () {
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            email: "",
            password: "",
            firstName: "",
            lastName: ""
        }
    });

    const onSubmit = data => {
        console.log(data);
        registerUser(data.email, data.password, data.firstName, data.lastName).then(navigate("/login"));
    };

    const email = watch("email");
    const password = watch("password");
    const firstName = watch("firstName");
    const lastName = watch("lastName");

    return (
        <section className="form-content">
            <div className="login-area">
                {/* HEADER */}
                <h1 className="login-page-title">
                    Create account
                </h1>

                {/* FIELDS */}
                <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                    <FormField 
                        title="Email"
                        type="text"
                        value={email}
                        onChange={(e) => console.log(e.target.value)}
                        error={errors.email && errors.email.message}
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email address"
                            },
                            maxLength: {
                                value: 320,
                                message: "Email must be at most 320 characters long"
                            }
                        })}
                    />

                    <div className="nameFields">
                    <div className="nameField">
                        <FormField 
                            title="First Name"
                            type="firstName"
                            value={firstName}
                            {...register("firstName")}/>
                        </div>
                        <div className="nameField">
                        <FormField 
                            title="Last Name"
                            type="lastName"
                            value={lastName}
                            {...register("lastName")}/>
                        </div>
                    </div>

                    <FormField 
                        title="Password"
                        type="password"
                        value={password}
                        error={errors.password && errors.password.message}
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message: "Password must be at least 8 characters long"
                            },
                            maxLength: {
                                value: 64,
                                message: "Password must be at most 64 characters long"
                            }
                        })}
                    />

                    {/* ACTIONS */}
                    <div className="login-actions">
                        <DefaultButton text="Create"/>
                        <div>
                            <span className="form-action-row">
                                Returning customer? <NavLink to="/login">Sign in</NavLink>
                            </span>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
}