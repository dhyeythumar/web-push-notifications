<p align="center">
    <img alt="logo" src="./assets/web-push-notifications-server.svg" width="90"/>
</p>
<h1 align="center">
Web Push Notifications Server
</h1>

<h4 align="center">
    Simple server which provides Web Push Notifications service to frontend applications.
</h4>

<p align="center">
    <a href="https://rapidapi.com/dhyeythumar/api/web-push-notifications-server/"><img alt="rapidapi-logo" src="https://img.shields.io/badge/Rapid%20API-WPN%20Server-%231D4371?style=for-the-badge&logo=" /></a>
    <a href="https://documenter.getpostman.com/view/8974666/UVRHi3PB"><img alt="postman-logo" src="https://img.shields.io/badge/Postman-WPN%20Server%20API%20Doc-%23ff6c37?style=for-the-badge&logo=postman" /></a>
</p>

> Note:
>
> -   Check the project's [**design & development**](./design-n-development.md) doc to know more on how I designed & developed the project.
> -   Also check the project's [**changelog**](./changelog.md) to know more on how the project is progressing.

<!-- TODO setup & add status page link -->
<!-- > -   Check out the status of the services [**here**](https://github-notifier.statuspage.io/). And do subscribe to stay in the loop with new incidences such as critical system failure or scheduled maintenance as they would be reported over there. -->

## What’s In This Document

-   [Introduction](#introduction)
-   [Getting Started](#getting-started)
-   [Frontend Codebase with Demos](#frontend-codebase-with-demos)
-   [Browser Support](#browser-support)
-   [Support the Project](#support-the-project)
-   [License](#license)

## Introduction

Want to add the **Push Notifications** feature in your frontend project and that too without managing your servers? If it's yes, then keep reading this doc.

This project started with the idea of developing a fully managed service that handles push notification servers for web applications. So that any frontend app can use this feature without implementing & managing their servers for web push notifications.

Check out the [**Getting Started**](#getting-started) section right now to set the `Push Notifications feature`.

## Getting Started

-   **Step 1: Registration**

    -   Register the [Origin](https://developer.mozilla.org/en-US/docs/Glossary/Origin) on which your website is running & you want to enable push notification service. _(for detailed info on registering owner of an origin checkout [API documentation](https://documenter.getpostman.com/view/8974666/UVRHi3PB#6fe2dd36-a43c-4e0b-85ad-490d0303b68c))_
    -   After successful registration, store the owner ID & secret safely _**(consider this as your password & don't share it with anyone)**_

-   **Step 2: Setup frontend web apps too which your visitors will subscribe**

    > Note:
    >
    > -   Explanation is based on frontend made with React.js, but you can easily replicate for other frameworks.
    > -   Check out the working frontend [**demo here**](https://dhyeythumar.github.io/web-push-notifications/) & [**codebase here**](https://github.com/dhyeythumar/web-push-notifications/tree/reactjs).

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
    -   Send a post request to **`/owner/sendNotification/<your-owner-id-here>`** endpoint along with the data _(for detailed info on sending push notifications checkout [API documentation](https://documenter.getpostman.com/view/8974666/UVRHi3PB#18d49ecb-a19a-4581-a3c6-19c8d1881f00))_

## Frontend Codebase with Demos

> List of example codebase with demo showing how to use web push notification feature

-   [React.js codebase](https://github.com/dhyeythumar/web-push-notifications/tree/reactjs) - [Demo](https://dhyeythumar.github.io/web-push-notifications/)

## Browser Support

|           Browser           | Web Push Notifications (WPN) Server Support | VAPID Support |
| :-------------------------: | :-----------------------------------------: | :-----------: |
|           Chrome            |                  ✓ (v50 +)                  |       ✓       |
|            Edge             |                  ✓ (v17 +)                  |       ✓       |
|           Firefox           |                  ✓ (v44 +)                  |       ✓       |
|   Safari & Safari on iOS    |                      ✗                      |       ✗       |
|          Opera \*           |                      ✗                      |       ✗       |
| Samsung Internet Browser \* |                      ✗                      |       ✗       |
|          Brave \*           |                      ✗                      |       ✗       |

\* Browser is using [GCM/FCM](https://upload.wikimedia.org/wikipedia/commons/1/10/GCM_Architecture.svg) based push notification service which requires a WPN server to set up Firebase cloud messaging service, so this will be only done if there are enough users requesting this feature from the WPN server.

## Support the Project

If you are using this project and happy with it or just want to encourage me to continue creating stuff, there are few ways you can do

-   Starring and sharing the project
-   Become a maintainer

If you would like to see a feature implemented, don't hesitate to add it to the issues list.

Contributions are welcome! ✌

## License

Licensed under the [MIT License](./LICENSE).
