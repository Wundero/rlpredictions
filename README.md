# Rocket League Predictions App
Predict the rocket league esports scene like never before.

TODO domain here.

## Local setup
To run locally:
1. Setup a database on [Upstash](https://upstash.com/)
    a. Alternatively, use [SRH](https://github.com/hiett/serverless-redis-http) to run locally. If you chose this option, I recommend using [KeyDB](https://docs.keydb.dev/) alongside it, for performance reasons. Running both in docker and then connecting locally to SRH should sufficiently replace Upstash.
2. Optionally, setup [Soketi on CloudFlare](https://dash.soketi.app/register)
    a. Technically, any Pusher (v7 protocol) compatible server will work, however this is relatively inexpensive and quite scalable. Self-hosted Soketi or real Pusher instances have not been tested and as such can be used at your own risk.
3. Copy `.env.example` as `.env` and populate the variables you wish to use.
4. Run with `npm run dev`.

To host:
I recommend hosting on Vercel because their Next.js experience is top notch, but other options for hosting next do exist.
1. As with your local setup, ensure you have the appropriate services set up.
    a. To be able to ingest data properly, set up a QStash instance on Upstash, and create a cron job that targets `/api/update`. The message is ignored, but this will trigger ingestion steps and make sure any updates from requisite APIs are captured. Note: QStash is not free, and costs ~$0.44 USD / month. If you wish to have another cron job handler use this endpoint, or just wish to manually trigger it, you must modify the endpoint and introduce additional logic.
2. Fork this repository (and also make sure your local points to your fork so that you can make code changes)
3. Create a project on Vercel which uses your fork as its repository
4. Once set up, populate the associated environment variables as you have done with your local environment.
5. Visit the website.