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
        existingSubscription: null,
        convertedVapidKey: urlBase64ToUint8Array(
            process.env.REACT_APP_PUBLIC_VAPID_KEY
        ),
    };

    if (!("serviceWorker" in navigator)) {
        alert("ServiceWorker not present on navigator object!");
        return state;
    }

    //* register SW
    state.registered_SW = await navigator.serviceWorker.register(
        "/web-push-notifications/push-notification-SW.js",
        {
            scope: "/web-push-notifications/",
        }
    );
    console.log(`Successfully registered service worker.`);

    if (!state.registered_SW.pushManager) {
        alert(
            "Push Manager unavailable on service worker, so unregistering servive wroker!"
        );
        state.registered_SW.unregister();
        state.registered_SW = null;
        return state;
    }

    state.existingSubscription = await getExistingSubscription(
        state.registered_SW
    );
    return state;
};

//* get for existing Subscription
const getExistingSubscription = async (registered_SW) => {
    const existingSubscription =
        await registered_SW.pushManager.getSubscription();
    if (existingSubscription !== null) alert("Existing subscription detected.");
    return existingSubscription;
};

//* sent push notification request to server (Push Notification Server)
const pushReqToServer = async (subscription) => {
    try {
        const res = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/subscribe`,
            {
                method: "POST",
                // mode: "no-cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    subscription: subscription,
                    ownerId: process.env.REACT_APP_OWNER_ID,
                }),
            }
        );
        const parsedData = await res.json();
        console.log(parsedData);
        //! 202 status code is received when request is sent from local host..
        //!     this means that request is accepted but not acted upon
        if (res.status === 200 || res.status === 202) return true;
        return false;
    } catch (err) {
        console.log(err);
        return false;
    }
};

export {
    urlBase64ToUint8Array,
    registerServiceWorker,
    getExistingSubscription,
    pushReqToServer,
};
