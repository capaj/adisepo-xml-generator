import mustache from 'mustache'
import fs from 'fs'

export const generateXMLs = async (values) => {
  const templates = ['DPHSHV', 'DP', 'KH']

  const timestamp = new Date().toISOString()
  await fs.promises.mkdir(`./output/${timestamp}`, { recursive: true })
  await Promise.all(
    templates.map(async (template) => {
      const tpl = await fs.promises.readFile(`./templates/${template}.xml`, {
        encoding: 'utf8'
      })
      const renderedXml = mustache.render(tpl, values)

      await fs.promises.writeFile(
        `./output/${timestamp}/${template}.xml`,
        renderedXml
      )
      console.log(`template ${template} rendered`)
    })
  )
}
