# skwrd

> Automates the daily school "Wellness Screening Attestation" form as per WA state COVID guidelines

## Prerequisites

- This uses Chrome, so you need Chrome. Sorry, I don't like it either.
- Tested with Node.js v16.x but probably works on v12.x

## Setup

1. `git clone` this and run `npm install` in your working copy.  No, I am not going to publish it.
1. Create a `.env` file with the following (you can copy `.env.example` to `.env`):

   - `SKWRD_LOGIN_URL` - URL to login page
   - `SKWRD_USERNAME` - Your Skyward login
   - `SKWRD_PASSWORD` - Your Skyward password

1. Run `node skwrd.js`

    Along with some status text, you'll see the following upon success:

    > `Attested successfully`

    If you have filled out the form, you'll see:

    > `Form already submitted`

    If something bad happened, you'll see:

    > `Failed to submit form!`

    ...and the process will exit with code 1.

## You might consider...

...running this as a `cron` job.  In fact, that's the next thing I'm going to do.

## Troubleshooting

- Go ahead and remove the `logLevel` line from the config section in `skwrd.js`, which will output more info from [WebdriverIO](https://webdriver.io).

## Also

I don't plan to maintain this project.  YMMV.

## License

Copyright 2021 Christopher Hiller. Licensed Apache-2.0
