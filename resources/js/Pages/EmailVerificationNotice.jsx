import React from "react";

function EmailVerificationNotice(props) {

    return (
        <div className="my-32">
            <h1 className="my-12 text-3xl font-semibold text-center">Verify your email</h1>
            {props.action === 'register' &&
                <p className="text-center text-lg">A verification link has been sent to your email. Please verify your email in order to complete the registration.</p>}
            {props.action === 'edit' &&
                <p className="text-center text-lg">A verification link has been sent to your new email.</p>}
        </div>
    );
}

export default EmailVerificationNotice;