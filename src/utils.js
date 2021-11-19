const urlBase64ToUint8Array = (base64String) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    // eslint-disable-next-line
    const base64 = (base64String + padding)
        .replace(/-/g, "+")
        .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
};

const registerServiceWorker = async () => {
    const state = {
        registered_SW: null,
        pushSubscriptionExists: false,
        convertedVapidKey: null,
    };

    if (!("serviceWorker" in navigator)) {
        alert("Service worker not present on navigator object!");
        return state;
    }

    // register SW
    state.registered_SW = await navigator.serviceWorker.register(
        "/web-push-notifications/push-notification-SW.js",
        {
            scope: "/web-push-notifications/",
        }
    );
    console.log("Successfully registered service worker.");

    if (!state.registered_SW.pushManager) {
        alert(
            "Push Manager unavailable on service worker, so unregistering servive wroker!"
        );
        state.registered_SW.unregister();
        state.registered_SW = null;
        return state;
    }

    // check for existing registered_SW
    const existingSubscription =
        await state.registered_SW.pushManager.getSubscription();
    if (existingSubscription !== null) {
        alert("Existing subscription detected.");
        state.pushSubscriptionExists = true;
    }

    state.convertedVapidKey = urlBase64ToUint8Array(
        process.env.REACT_APP_PUBLIC_VAPID_KEY
    );

    return state;
};

// sent push notification request to server (Push Notification Server)
const pushReqToServer = (subscription) => {
    return fetch(`${process.env.REACT_APP_SERVER_URL}/subscribe`, {
        method: "POST",
        body: JSON.stringify({
            subscription: subscription,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export { urlBase64ToUint8Array, registerServiceWorker, pushReqToServer };
