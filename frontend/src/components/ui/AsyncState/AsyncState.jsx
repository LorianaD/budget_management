import { Button } from '../Button';
import './AsyncState.css';

// Shows the state of an asynchronous resource: loading, error (with retry)
// or empty; otherwise renders children(). children is a function so the
// content is only evaluated once the data exists.
// messages = { loading, error, retry, empty } (French texts from the page Data.js)
function AsyncState({ isLoading, error, isEmpty, onRetry, messages, children }) {
    if (isLoading) {
        return (
            <div className="async-state async-state--loading" role="status">
                <span className="async-state__spinner" aria-hidden="true" />
                {messages.loading}
            </div>
        );
    }

    if (error) {
        return (
            <div className="async-state async-state--error" role="alert">
                <p>{messages.error}</p>
                {onRetry && <Button variant="outline" size="small" label={messages.retry} onClick={onRetry} />}
            </div>
        );
    }

    if (isEmpty) {
        return <p className="async-state async-state--empty">{messages.empty}</p>;
    }

    return children();
}

export default AsyncState;
