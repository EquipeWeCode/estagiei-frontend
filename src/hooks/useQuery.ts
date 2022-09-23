import React from "react";
import { useLocation } from "react-router-dom";

export const useQuery = (): URLSearchParams | null => {
    const { search } = useLocation();

    return React.useMemo<URLSearchParams>(() => new URLSearchParams(search), [search])
}