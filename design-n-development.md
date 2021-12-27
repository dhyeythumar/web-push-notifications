<h2 align="center">
Tradeoffs I faced & decisions made while designing & developing this project
</h2>

#### Important decisions to be made before developing any web applications

-   What type of application architectural design to choose? (for example, serverless architecture, microservices, etc)
-   What type of database to select & which one DB to pick from that type?

<p align="center">&bull; &bull; &bull;</p>

## What type & which database to use?

> This is the most common question that every developer faces while developing an application. Here I will explain my thought process to select the DB for this serverless application.

-   It was clear I wanted to store data in the form of nested structure so, **NoSQL DBs** is the way to go. Because getting nested behavior in SQL DB will require a joint operation, which is slower & which might timeout my serverless functions.
-   Now the challenge is to select a specific DB in NoSQL space. There are tones of options such as **DynamoDB, MongoDB Atlas, FaunaDB, Upstash, Firestore**, etc. I will explain why I rejected these DBs & selected one out of them.

### <p align="center">DBs for serverless applications</p>

> Requirement are multiple connect creation & dropping at scale, eventual consistency & minimal latency

-   **DynamoDB:** No doubt it is one of the market-leading DBs out there. But for now, I won't use it for my simple open-source projects (if my project scales then, will jump ship to this DB).
    -   `Pros:` Scalability & Lowest latency
    -   `Cons:` Not being a platform-agnostic
-   **MongoDB Atlas:** Can define a schema in the code itself making, it easier for other devs to follow structured data. ✅
    -   `Pros:` Provides average latency
    -   `Cons:` No free tier for serverless connections (recently they released this feature). So might face out-of-connection errors if the serverless function scales at a massive rate.
-   **Upstash:** I will use it as caching layer.
    -   `Pros:` Provides Redis with REST APIs, Minimal latency of all
    -   `Cons:` Might not be suitable to store complex structured data
-   **FaunaDB:**
    -   `Pros:` Provides REST & GraphQL based APIs
    -   `Cons:` Very high latency to maintain high consistency
-   **Firestore:** It doesn't require any introduction.
    -   `Pros:` Don't know any as compared to other DB mentioned in this section
    -   `Cons:` Highest latency as compared to other DB

> The latency-related details are taken from an article published by **Upstash** & for more details checkout [that article here](https://blog.upstash.com/serverless-database-benchmark).

<!--  **Finally, selected MongoDB's free tier for now but, as the project scales, I will switch to DynamoDB as it will provide scalability & low latency to my application. And I am also planning to use Upstash as a caching layer.** -->

### <p align="center">Use-case specific details</p>

> This discussion is based on my use-case

**DB essential behavior/task required**

-   Child docs are tightly coupled with parent doc
-   Bulk creation of child doc not required (single child doc will be created & linked to parent's doc)
-   Fetching all the child docs at once (fetching single child doc is not required)
-   No update operation required for child docs
-   Selective delete of child docs is required
-   If parent doc is deleted then no linked child doc should cease to exist

**Document embedding vs Document referencing vs Foreign key method in MongoDB**

-   **Document embedding:** Parent doc embedding list child docs ✅
    -   `Pros:`
        -   Can easily fetch & delete all the data (parent & child docs) in one go
        -   MongoDB provides easy removal of child doc without traversing the list of child docs (based on the child's primary key)
    -   `Cons:`
        -   Parent doc size can grow very large
        -   Requires 2 network calls to store a child doc (fetching parent doc, storing the new child doc to this parent doc)
-   **Document referencing:** Parent doc referencing list of child docs
    -   `Pros:`
        -   Can fetch all the docs by using populate method by MongoDB to fetch referenced docs
    -   `Cons:`
        -   Deleting parent doc also means it will require deleting child doc one by one
        -   Requires 3 network calls to store a child doc (storing child doc, fetching parent doc, & adding child doc's id to parent doc)
        -   Same for deleting a child doc
-   **Foreign key method:** Adding parent's primary key to child's doc as foreign key
    -   `Pros:`
        -   Can easily fetch in one go if parent doc's primary key is already know
        -   Requires 1 network calls to store a child doc if parent doc's primary key is already know
        -   Save for deleting a child doc
    -   `Cons:`
        -   Deleting parent doc also means it will require deleting child doc one by one

<p align="center">&bull; &bull; &bull;</p>

## Application architectural design

It's obvious to choose serverless architecture (with microservices if the app is huge) for the high scalability of an application. And my project is APIs-based services, so it made a lot more sense to use this pattern which helps me cater to a huge number of requests at a time & also with low latency.

### <p align="center">Various serverless hosting providers</p>

-   **AWS Lambda:** Won't use it for an open-source project (if my project scales then, will jump ship to this DB).
    -   `Pros:`
        -   Scalability & Lowest latency
    -   Cons:
        -   Cold start ([checkout this article which explains how various parameters affects cold start](https://mikhail.io/serverless/coldstarts/aws/))
-   **Vercel:** Great platform for beginners & small open-source projects ✅
    -   `Pros:`
        -   Easy to get started with your functional application
        -   10s of execution timeout for each function request (free tier)
    -   `Cons:`
        -   Network latency for free tier as functions are not globally available
        -   Vercel is a wrapper around AWS so, it also inherits cold starts issues from AWS
-   **Cloudflare Workers:**
    -   `Pros:`
        -   Globally available for all types of pricing tiers
        -   Zero cold start
        -   Provides great API to control cache
        -   Provides key-value datastore which is also globally available
    -   `Cons:`
        -   Only 10ms of CPU time per request (free tier) 😥
