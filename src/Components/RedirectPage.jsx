import React from "react";

import { Navigate, useParams } from "react-router-dom";

function RedirectPage() {
    const { code } = useParams();

    return (
        <>
            <Navigate to={"/registration/" + code} />
        </>
    );
}

export default RedirectPage;
