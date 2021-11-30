import NewTable from './src/index.vue'
import type { App } from 'vue'

NewTable.install = (app: App): void => {
  app.component(NewTable.name, NewTable)
}

export default NewTable
