import {dirname, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'
import type {SidebarConfigObject} from '@vuepress/theme-default'
import {dirAndFileOrder, getDirTree, sidebarTree} from './Generate'
import type {NewSidebarGroup, NewSidebarItem} from './Generate'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SRC_PATH = resolve(__dirname, '../../').replace(/\\/g, '/')

function SidebarTree(srcPath: string = SRC_PATH): SidebarConfigObject {
	const srcDir = getDirTree(srcPath)
	const orderedDir = dirAndFileOrder(srcDir.children)
	const sideBar = sidebarTree(orderedDir)

	const sideBarWithoutString: (NewSidebarItem | NewSidebarGroup)[] =
		sideBar.filter((v) => {
			return typeof v !== 'string'
		}) as (NewSidebarGroup | NewSidebarItem)[]

	const objTree: SidebarConfigObject = {}
	for (const v of sideBarWithoutString) {
		v.collapsible = false
		objTree[`/${v.name}/`] = [v]
	}

	return objTree
}

export default SidebarTree
