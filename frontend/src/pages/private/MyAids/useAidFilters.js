import { useCallback, useState } from "react";
import { DEFAULT_AID_FILTERS } from "./myAidsSelectors";

// UI state of the aids page: catalog filters and the aid shown in the detail
// panel. focusRequest grows each time the user asks to see an aid, so the
// detail panel moves the focus to itself (but not on the first render).
function useAidFilters(defaultAidKey) {
    const [filters, setFilters] = useState(DEFAULT_AID_FILTERS);
    const [selectedAidKey, setSelectedAidKey] = useState(defaultAidKey);
    const [focusRequest, setFocusRequest] = useState(0);

    const setFilter = useCallback((name, value) => {
        setFilters((current) => ({ ...current, [name]: value }));
    }, []);

    const resetFilters = useCallback(() => setFilters(DEFAULT_AID_FILTERS), []);

    const showAid = useCallback((aidKey) => {
        setSelectedAidKey(aidKey);
        setFocusRequest((count) => count + 1);
    }, []);

    return { filters, setFilter, resetFilters, selectedAidKey, focusRequest, showAid };
}

export default useAidFilters;
