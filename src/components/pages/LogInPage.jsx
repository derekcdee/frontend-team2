import React, { useState } from "react";
import { FormField } from "../util/Inputs";
import { useForm } from "react-hook-form";
import { Button } from "../util/Buttons";

export default function LoginPage () {
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
        <section className="login-page">
            {/* HEADER */}
            <h1 className="login-page-title">
                Login
            </h1>

            {/* FIELDS */}
            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                <FormField 
                    title="Email"
                    type="text"
                    value={email}
                    {...register("email")} 
                />
                {errors.email && <p>{errors.email.message}</p>}

                <FormField 
                    title="Password"
                    type="password"
                    value={password}
                    {...register("password")} 
                />
                {errors.password && <p>{errors.password.message}</p>}

                {/* ACTIONS */}
                <div>
                    <Button text="Sign in"/>
                </div>
            </form>
        </section>
    );
}