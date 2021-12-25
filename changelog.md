# Version 1.0.0

This project started with the idea of developing a fully managed service that handles push notification servers for web applications. So that any frontend app can use this feature without implementing & managing their servers for web push notifications.

API endpoints available in this version: 

-   `GET /index` : General info on wpn server
-   `POST /subscribe` : Subscribe web clients
-   `POST /owner` : Create new owner
-   `GET /owner/<owner-id>` : Fetch owner's data
-   `DELETE owner/<owner-id>` : Remove owner from the system
-   `POST owner/sendNotification/<owner-id>` : Send notifications to subscribed web clients

(\*Only basic info is mentioned here for, more details check the API documentation)
