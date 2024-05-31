import {resolve, dirname} from 'node:path'
import {writeFileSync, existsSync} from 'node:fs'
import {Sidebar} from "vitepress/types/default-theme";
import {
	getDirTree,
	dirAndFileOrder,
	getTitleName,
	getFileDirPathFromSrc,
	isCollapsible,
	FileItem,
	SRC_PATH
} from './tools'

export function sidebarTree(tree: FileItem[] = []): Sidebar {
	return tree.map((v: FileItem) => {
		if (v.type === 'directory') {
			const indexPath = resolve(v.path!, 'index.md')
			if (!existsSync(indexPath)) {
				writeFileSync(indexPath, `---\nbarName: ${v.name}\n---\n\n# ${v.name}`,)
			}
			return {
				text: getTitleName(indexPath, v.name),
				collapsed: isCollapsible(indexPath),
				items: sidebarTree(v.children),
			}
		} else {
			return {text: getTitleName(v.path), link: getFileDirPathFromSrc(v.path)}
		}
	})
}

function sidebarSingleDir(trees: FileItem[] = []): Sidebar {
	let sidebarObj: Sidebar = {}
	trees
		.map((v: FileItem) => {
			if (v.type === 'directory') {
				const indexPath = resolve(v.path!, 'index.md')
				const link = `${dirname(indexPath).replace(SRC_PATH, '')}/`
				if (link == '/') {
					return ''
				}
				sidebarObj[link] = sidebarObj[link] ?? []
				sidebarObj[link] = [
					...sidebarObj[link],
					{
						text: getTitleName(indexPath, v.name),
						// collapsed: isCollapsible(indexPath),
						// link,
						items: sidebarTree(v.children),
					},
				]
				sidebarObj = Object.assign(sidebarObj, sidebarSingleDir(v.children))
			}
		})

	return sidebarObj
}

function sidebar(srcPath: string = SRC_PATH): Sidebar {
	const srcDir = getDirTree(srcPath)
	const orderedDir = dirAndFileOrder(srcDir.children)
	// const sideBar = sidebarSingleDir(orderedDir)
	// writeFileSync('sideBar.json', JSON.stringify(sideBar, null, 2) + '\n')
	return sidebarSingleDir(orderedDir)
}

export default sidebar
