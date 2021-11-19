import { Component } from "react";

import { registerServiceWorker, pushReqToServer } from "./utils";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
    state = {
        registered_SW: null,
        pushSubscriptionExists: false,
        convertedVapidKey: null,
    };

    async componentDidMount() {
        const state = await registerServiceWorker();
        this.setState({
            registered_SW: state.registered_SW,
            pushSubscriptionExists: state.pushSubscriptionExists,
            convertedVapidKey: state.convertedVapidKey,
        });
    }

    subscribeUser = async () => {
        if (this.state.pushSubscriptionExists || !this.state.registered_SW)
            return;

        try {
            console.log("No subscription found, adding new subscription!");
            const newSubscription =
                await this.state.registered_SW.pushManager.subscribe({
                    applicationServerKey: this.state.convertedVapidKey,
                    userVisibleOnly: true,
                });
            pushReqToServer(newSubscription);
            this.setState({ pushSubscriptionExists: true });
        } catch (err) {
            if (Notification.permission !== "granted") {
                alert("Notification permission was not granted!");
            } else {
                alert("Error ocurred while subscribing :: ", err);
            }
        }
    };

    unRegisterSW = async () => {
        if (this.state.registered_SW) {
            this.state.registered_SW.unregister();
            console.log(
                "Server worker successfully unregistered now you won't receive any new push notifications!"
            );
            // this.setState({
            //     registered_SW: null,
            //     pushSubscriptionExists: false,
            // });
            window.location.reload();
        }
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <div className="buttons">
                        <button
                            type="button"
                            onClick={this.subscribeUser}
                            className="subscribe-button"
                            disabled={
                                this.state.pushSubscriptionExists ||
                                !this.state.registered_SW
                                    ? true
                                    : false
                            }
                        >
                            Subscribe to push notifications
                        </button>
                        <button
                            type="button"
                            onClick={this.unRegisterSW}
                            className="unregister-button"
                            disabled={this.state.registered_SW ? false : true}
                        >
                            Unregister service worker
                        </button>
                    </div>
                </header>
            </div>
        );
    }
}

export default App;
