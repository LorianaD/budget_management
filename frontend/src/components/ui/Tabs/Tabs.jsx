import { useId, useRef } from 'react';
import './Tabs.css';

const NEXT_KEYS = { ArrowRight: 1, ArrowLeft: -1 };

// Accessible tabs (WAI-ARIA tabs pattern, manual activation not needed:
// arrows move AND select). Controlled: the page owns the active key.
// tabs = [{ key, label }]; children = content of the active panel.
function Tabs({ label, tabs, activeKey, onChange, children }) {
    const baseId = useId();
    const tabRefs = useRef({});
    const tabId = (key) => `${baseId}-tab-${key}`;
    const panelId = `${baseId}-panel`;

    const select = (key) => {
        onChange(key);
        tabRefs.current[key]?.focus();
    };

    const handleKeyDown = (event) => {
        const index = tabs.findIndex((tab) => tab.key === activeKey);
        let nextIndex = null;

        if (event.key in NEXT_KEYS) nextIndex = (index + NEXT_KEYS[event.key] + tabs.length) % tabs.length;
        if (event.key === "Home") nextIndex = 0;
        if (event.key === "End") nextIndex = tabs.length - 1;
        if (nextIndex === null) return;

        event.preventDefault();
        select(tabs[nextIndex].key);
    };

    return (
        <div className="tabs">
            <div className="tabs__list" role="tablist" aria-label={label} onKeyDown={handleKeyDown}>
                {tabs.map((tab) => {
                    const isActive = tab.key === activeKey;

                    return (
                        <button
                            key={tab.key}
                            ref={(node) => { tabRefs.current[tab.key] = node; }}
                            id={tabId(tab.key)}
                            type="button"
                            role="tab"
                            className={`tabs__tab ${isActive ? "tabs__tab--active" : ""}`}
                            aria-selected={isActive}
                            aria-controls={panelId}
                            tabIndex={isActive ? 0 : -1}
                            onClick={() => select(tab.key)}
                        >
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            <div id={panelId} className="tabs__panel" role="tabpanel" aria-labelledby={tabId(activeKey)}>
                {children}
            </div>
        </div>
    );
}

export default Tabs;
