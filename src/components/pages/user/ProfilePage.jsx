import React from "react";
import AccountSection from "../../sections/AccountSection";

export default function ProfilePage() {
    return (
        <div className="user-content">
            <AccountSection title="Profile">
                <p>name</p>
                <p>email</p>
            </AccountSection>
        </div>
    );
}