# adisepo-xml-generator

## Use case and Motivation

In Czech republic being a contractor requires you to submit 3 forms every month/quarter. It's a lot of manual chores, so I wanted to automate this boring task with a crude CLI tool hacked together in one day.

Note that this only makes sense to use if you have a very simple invoicing-just a few invoices per month to an EU country with reverse charge to a single company. For more complex scenarios you might be able to modify the scripts to fit your usecase, but don't expect it to work out of the box.

I am using fakturoid for my invoices, so the script that get's the total for the last X invoices hit's their API with one request.

## How to use

Obviously clone and install node modules. Then there are two commands you can run:

- `quarterly` - this invokes fakturoid API with values in input.yaml and gets you a total for the last X invoices. Then it generated XML files same as if you would invoke it yourself

- `generate` - creates XML files that you need to submit to your tax office

So if you want to use this, you want to start by duplicating `sample-input.yaml` as `input.yaml` and filling out a few values for your last quarter.
Then just use `generate` and submit the resulting XMLs on [adis](https://adisepo.mfcr.cz/adistc/adis/idpr_epo/epo2/uvod/vstup_expert.faces). Just make sure to recheck the values. This software is untested, provided as-is.

## FAQ

### Why not just use fakturoid or idoklad to get your XMLs?

These only offer exporting XMLs when you pay for them. I only have one or two invoices per month and it feels weird paying for a service that I barely use when a simple script like this provides almost the same kind of convenience with a free fakturoid account.

### Future plans

I am tempted to add `submit` command which would use puppeteer to submit the xml files for you on adisepo that the whole submission happens without leaving the terminal.