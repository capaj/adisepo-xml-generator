import { generateXMLs } from './generateXMLs'
import moment from 'moment'
import yaml from 'js-yaml'
import fs from 'fs'
import { getTotalForLastXInvoices } from './fakturoid'

moment.locale('cs')
;(async () => {
  const input = yaml.load(fs.readFileSync('./input.yaml', 'utf8')) as any

  const sum = await getTotalForLastXInvoices(input.vies.quantityOfInvoices)

  await generateXMLs({
    totalPerQuarter: Math.round(sum),
    currentDayInCzechFormat: moment().format('L'),
    ...input
  })
})()
