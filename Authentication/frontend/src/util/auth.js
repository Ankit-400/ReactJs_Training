import { redirect } from "react-router-dom";

export function getTokenDuration() {
    const storedExpirationDate = localStorage.getItem('expiration');
    const expirationDate = new Date(storedExpirationDate)
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();
    return duration;
}

export function getAuthToken() {
    const token = localStorage.getItem('token');

    if (!token) return null;

    const tokenDuration = getTokenDuration();

    if (tokenDuration < 0) {
        return 'EXPIRED'
    }

    return token;
}

export function tokenLoader() {
    return getAuthToken();
}

// Add this loader to all the route which you want to protect or restrict from unauthorized access.
export function checkAuthLoader() {
    const token = getAuthToken();

    if (!token) {
        return redirect('/auth');
    }
    return null;
}