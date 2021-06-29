import unirest from 'unirest'
import yaml from 'js-yaml'
import fs from 'fs'

export const getTotalForLastXInvoices = async (numberOfInvoices: number) => {
  const input = yaml.load(fs.readFileSync('./input.yaml', 'utf8')) as any

  const { fakturoid } = input
  return unirest
    .get(
      `https://app.fakturoid.cz/api/v2/accounts/${fakturoid.accountName}/invoices.json`
    )
    .auth({
      user: fakturoid.email,
      pass: fakturoid.apiToken
    })
    .headers({
      'cache-control': 'no-cache',
      Connection: 'keep-alive',
      'Accept-Encoding': 'gzip, deflate',
      Host: 'app.fakturoid.cz',
      'Cache-Control': 'no-cache',
      Accept: '*/*',
      'User-Agent': 'Test (capajj@gmail.com)'
    })
    .send()
    .then(
      (res) => {
        const { body } = res

        const lastThree = body.slice(0, numberOfInvoices)
        console.log(
          lastThree.map(({ total }) => {
            return total
          })
        )
        const sum = lastThree.reduce((sum, invoice) => {
          return sum + Number(invoice.total)
        }, 0)
        console.log(`sum of last ${numberOfInvoices} is ${sum}`)
        return sum
      },
      (err) => {
        throw err
      }
    )
}
