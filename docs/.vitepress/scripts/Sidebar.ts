import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { SidebarConfigObject } from '@vuepress/theme-default'
import type { FileItem } from './Generate'
import {
  dirAndFileOrder,
  getDirTree,
  getFilePath,
  getTitle,
  getTitleName,
  isCollapsible,
  sidebarTree,
} from './Generate'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SRC_PATH = resolve(__dirname, '../../').replace(/\\/g, '/')

function sidebarSingleDir(trees: FileItem[] = []): SidebarConfigObject {
  let sidebarObj: SidebarConfigObject = {}

  trees.map((v: FileItem) => {
    const readmePath = resolve(v.path!, 'README.md')
    if (v.type === 'directory') {
      const link = getFilePath(v.path)
      sidebarObj[link] = sidebarObj[link] ?? []
      sidebarObj[link] = [
        ...sidebarObj[link],
        {
          text: getTitleName(readmePath, v.name),
          collapsible: isCollapsible(readmePath),
          children: sidebarTree(v.children),
        },
      ]
      sidebarObj = Object.assign(sidebarObj, sidebarSingleDir(v.children))
      return ''
    } else {
      const link = getFilePath(v.path)
      sidebarObj[link] = sidebarObj[link] ?? []
      sidebarObj[link] = [...sidebarObj[link], getTitle(v.path)]
      return getTitle(v.path)
    }
  })

  return sidebarObj
}

function GenerateSidebar(srcPath: string = SRC_PATH): SidebarConfigObject {
  const srcDir = getDirTree(srcPath)
  const orderedDir = dirAndFileOrder(srcDir.children)
  return sidebarSingleDir(orderedDir)
}

export default GenerateSidebar
