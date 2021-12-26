<p align="center">
    <img alt="logo" src="./assets/web-push-notifications-server-transparent.svg" width="90"/>
</p>
<h1 align="center">
Web Push Notifications Server
</h1>

<h4 align="center">
Simple public server which provides Web Push Notifications service to frontend applications.
</h4>

> Note:
> -   Check out the project's [**changelog**](./changelog.md) to know more on how the project is progressing.

<!-- TODO setup & add status page link -->
<!-- > -   Check out the status of the services [**here**](https://github-notifier.statuspage.io/). And do subscribe to stay in the loop with new incidences such as critical system failure or scheduled maintenance as they would be reported over there. -->

## What’s In This Document

-   [Introduction](#introduction)
-   [Getting Started](#getting-started)
-   [API Documentation](#api-documentation)
-   [Frontend Codebase with Demos](#frontend-codebase-with-demos)
-   [Support the Project](#support-the-project)
-   [License](#license)

## Introduction

Want to add the **Push Notifications** feature in your frontend project and that too without managing your servers? If it's yes, then keep reading this doc.

This project started with the idea of developing a fully managed service that handles push notification servers for web applications. So that any frontend app can use this feature without implementing & managing their servers for web push notifications.

Check out the [**Getting Started**](#getting-started) section right now to set the `Push Notifications feature`.

## Getting Started

-   **Step 1: Registration**

    -   Register the [Origin](https://developer.mozilla.org/en-US/docs/Glossary/Origin) on which your website is running & you want to enable push notification service. _(for detailed info on registering owner of an origin checkout API documentation)_
    -   After successful registration, store the owner ID & secret safely _**(consider this as your password & don't share it with anyone)**_

-   **Step 2: Setup frontend with which your visitors will send subscribe request**

    > Note:
    > -   Explanation is based on frontend made with React.js, but you can easily replicate for other frameworks.
    > -   Checkout the working frontend [**demo here**](https://dhyeythumar.github.io/web-push-notifications/) & [**codebase here**](https://github.com/dhyeythumar/web-push-notifications/tree/reactjs).

    -   Add this [push-notification-SW.js](https://github.com/dhyeythumar/web-push-notifications/blob/reactjs/public/push-notification-SW.js) file to your public folder.
    -   Add these [App.js](https://github.com/dhyeythumar/web-push-notifications/blob/reactjs/src/App.js) & [utils.js](https://github.com/dhyeythumar/web-push-notifications/blob/reactjs/src/utils.js) codes to your codebase.
    -   Also, add these variables to your .env file:
        ```
        REACT_APP_PUBLIC_VAPID_KEY=BGBUgRmq_y5sm7NJdEJNQiho94QUv8VeUEJ57CXehZ7ybxKNFWAjHx2p_WgUz_sQB7XBGcEOLv2iJ5V3lMCWUtg
        REACT_APP_SERVER_URL=https://web-push-notifications-server.vercel.app/api
        REACT_APP_OWNER_ID=<your-owner-id-here>
        ```
        _**(Use the above REACT_APP_PUBLIC_VAPID_KEY only)**_

-   **Step 3: Sending push notifications to web visitors for your application**
    -   Send a post request to **`/owner/sendNotification/<your-owner-id-here>`** endpoint along with the data _(for detailed info on sending push notifications checkout API documentation)_

## API Documentation

**WIP**

## Frontend Codebase with Demos

> List of example codebase with demo showing how to use web push notification feature

-   [React.js codebase](https://github.com/dhyeythumar/web-push-notifications/tree/reactjs) - [Demo](https://dhyeythumar.github.io/web-push-notifications/)

## Support the Project

If you are using this project and happy with it or just want to encourage me to continue creating stuff, there are few ways you can do it:-

-   Starring and sharing the project
-   Become a maintainer

If you would like to see a feature implemented, don't hesitate to add it to the issues list.

Contributions are welcome! ✌

## License

Licensed under the [MIT License](./LICENSE).
