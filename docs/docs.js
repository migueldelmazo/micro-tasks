const jsdoc2md = require('jsdoc-to-markdown'),
  fs = require('fs'),
  path = require('path'),

  renderDir = (dir) => {
    fs.readdirSync(path.join(__dirname, dir)).forEach((file, index) => {
      if (file.endsWith('.js')) {
        const templateData = getTemplateData(dir, file),
          modules = getTemplateModule(templateData)
        renderTemplate(modules, templateData)
      }
    })
  },

  getTemplateData = (dir, file) => {
    return jsdoc2md.getTemplateDataSync({
      files: path.join(__dirname, dir, file)
    })
  },

  getTemplateModule = (templateData) => {
    return templateData.reduce((mods, identifier) => {
      if (identifier.kind === 'module') {
        mods.push(identifier.name)
      }
      return mods
    }, [])
  },

  renderTemplate = (modules, templateData) => {
    for (const mod of modules) {
      const template = `{{#module name="${mod}"}}{{>docs}}{{/module}}`,
        output = jsdoc2md.renderSync({
          data: templateData,
          partial: path.join(__dirname, '*.hbs'),
          template: template
        })
      fs.writeFileSync(path.resolve(__dirname, `${mod}.md`), output)
    }
  }

renderDir('../libs')
renderDir('../src')
