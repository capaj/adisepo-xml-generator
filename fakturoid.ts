import unirest from 'unirest'
import yaml from 'js-yaml'
import fs from 'fs'
import moment from 'moment'

export const getTotalForLastXInvoices = async (numberOfInvoices: number) => {
  const input = yaml.load(fs.readFileSync('./input.yaml', 'utf8')) as any

  const { fakturoid } = input
  return unirest
    .get(
      `https://app.fakturoid.cz/api/v2/accounts/${fakturoid.accountName}/invoices.json`
    )
    .auth({
      user: fakturoid.email,
      pass: fakturoid.apiToken,
    })
    .headers({
      'cache-control': 'no-cache',
      Connection: 'keep-alive',
      'Accept-Encoding': 'gzip, deflate',
      Host: 'app.fakturoid.cz',
      'Cache-Control': 'no-cache',
      Accept: '*/*',
      'User-Agent': 'adisepo generator (capajj@gmail.com)',
    })
    .send()
    .then(
      (res) => {
        const body: any[] = res.body

        const quarterInvoices = body.filter((invoice) => {
          const fulfillmentDate = moment(invoice.taxable_fulfillment_due)
          return (
            fulfillmentDate.quarter() === input.tax.quarter &&
            fulfillmentDate.year() === input.tax.year
          )
        })
        console.log(
          'quarter Invoices: ',
          quarterInvoices.map((invoice) => invoice.number)
        )

        console.log(
          quarterInvoices.map(({ native_total, paid_at, number }) => {
            if (!paid_at) {
              console.warn(`seems like invoice ${number} is not yet paid`)
            }
            return native_total
          })
        )
        const sum = quarterInvoices.reduce((sum, invoice) => {
          return sum + Number(invoice.native_total)
        }, 0)
        console.log(`sum of last ${numberOfInvoices} is ${sum} CZK`)
        return sum
      },
      (err) => {
        throw err
      }
    )
}
