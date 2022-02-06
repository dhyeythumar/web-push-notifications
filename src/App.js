import { Component } from "react";

import {
    registerServiceWorker,
    getExistingSubscription,
    pushReqToServer,
} from "./utils";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
    state = {
        registered_SW: null,
        subscription: null,
        convertedVapidKey: null,
    };

    async componentDidMount() {
        await this.registerSW();
    }

    registerSW = async () => {
        if (this.state.registered_SW) return;

        const state = await registerServiceWorker();
        this.setState({
            registered_SW: state.registered_SW,
            subscription: state.existingSubscription,
            convertedVapidKey: state.convertedVapidKey,
        });
    };

    unregisterSW = async () => {
        if (this.state.registered_SW) {
            await this.state.registered_SW.unregister();
            this.setState({
                registered_SW: null,
                subscription: null,
            });
            console.log(
                `Server worker successfully unregistered now you won't receive any new push notifications!`
            );
        }
    };

    subscribeUser = async () => {
        if (this.state.subscription || !this.state.registered_SW) return;

        const existingSubscription = await getExistingSubscription(
            this.state.registered_SW
        );
        if (existingSubscription)
            return this.setState({
                subscription: existingSubscription,
            });

        try {
            console.log(`No subscription found, adding new subscription!`);
            const newSubscription =
                await this.state.registered_SW.pushManager.subscribe({
                    applicationServerKey: this.state.convertedVapidKey,
                    userVisibleOnly: true,
                });

            const res = await pushReqToServer(newSubscription);
            if (res === true) this.setState({ subscription: newSubscription });
            else await newSubscription.unsubscribe();
        } catch (err) {
            if (Notification.permission !== "granted") {
                alert("Notification permission was not granted!");
            } else {
                alert(`[Error ocurred while subscribing] \n${err}`);
            }
        }
    };

    unsubscribeUser = async () => {
        if (this.state.subscription) {
            this.state.subscription.unsubscribe();
            this.setState({
                subscription: null,
            });
            console.log(
                `Successfully unsubscribed now you won't receive any new push notifications!`
            );
        }
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <div className="buttons">
                        <div className="button-container">
                            <button
                                type="button"
                                onClick={this.registerSW}
                                className="register-button"
                                disabled={
                                    this.state.registered_SW ? true : false
                                }
                            >
                                Register service worker
                            </button>
                            <button
                                type="button"
                                onClick={this.unregisterSW}
                                className="unregister-button"
                                disabled={
                                    this.state.registered_SW ? false : true
                                }
                            >
                                UnRegister service worker
                            </button>
                        </div>
                        <div className="button-container">
                            <button
                                type="button"
                                onClick={this.subscribeUser}
                                className="subscribe-button"
                                disabled={
                                    this.state.subscription ||
                                    !this.state.registered_SW
                                        ? true
                                        : false
                                }
                            >
                                Subscribe to push notifications
                            </button>
                            <button
                                type="button"
                                onClick={this.unsubscribeUser}
                                className="unsubscribe-button"
                                disabled={
                                    this.state.subscription ? false : true
                                }
                            >
                                UnSubscribe to push notifications
                            </button>
                        </div>
                    </div>
                </header>
            </div>
        );
    }
}

export default App;
