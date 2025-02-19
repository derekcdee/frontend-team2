import React, { useState } from "react";
import { FormField } from "../util/Inputs";
import { useForm } from "react-hook-form";
import { Button } from "../util/Buttons";

export default function CreateAccountPage () {
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const onSubmit = data => {
        console.log(data);
    };

    const email = watch("email");
    const password = watch("password");

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
                        {...register("email")} 
                    />

                    <FormField 
                        title="Password"
                        type="password"
                        value={password}
                        {...register("password")} 
                    />

                    {/* ACTIONS */}
                    <div className="login-actions">
                        <Button text="Create"/>
                        <div>
                            <span className="form-action-row">
                                Returning customer? <a href="/account/login">Sign in</a>
                            </span>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
}