/**
 * Returns the cart object from local storage
 *
 * @returns - { string?: number } | {}
 */
export function getCartFromLocalStorage() {

    if (typeof window == 'undefined') {
        return ""
    }

    const cartKey = 'cart';
    const cartJsonString = localStorage.getItem(cartKey);
    if (cartJsonString != null) {
        const localCart = JSON.parse(cartJsonString);
        return localCart;
    }
    else {
        return {};
    }
}


export function getLocationFromLocalStorage() {

    if (typeof window == 'undefined') {
        return ""
    }
    const locationKey = 'current_location';
    const currentLocation = localStorage.getItem(locationKey);
    if (currentLocation == null) {
        return ""
    }
    else {
        return currentLocation
    }
}
