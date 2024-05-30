import {existsSync, writeFileSync} from 'node:fs'
import {resolve} from 'node:path'
import {NavItem} from "vitepress/types/default-theme";
import {
	getDirTree, dirAndFileOrder, getTitleName, getDirPathFromSrc, FileItem,
	SRC_PATH
} from './tools'


function getNavbar(tree: FileItem[] = []): NavItem[] {
	return tree
		.map((v: FileItem) => {

			if (v.type === 'directory') {
				const indexPath = resolve(v.path, 'index.md')
				if (!existsSync(indexPath)) {
					writeFileSync(indexPath, `---\nbarName: ${v.name}\n---\n\n# ${v.name}`,)
				}
				const isExists = v.children!.some((obj) => obj.type === 'directory')
				const item = {text: getTitleName(indexPath, v.name)}

				if (isExists) {
					return {...item, items: getNavbar(v.children)}
				} else {
					return {...item, link: getDirPathFromSrc(v.path)}
				}
			} else {
				if (v.name.toLowerCase() === 'index.md') {
					return {
						text: getTitleName(v.path, v.name),
						link: getDirPathFromSrc(v.path, '').replace('index.md', '')
					}
				}
				return ''
			}
		})
		.filter((v) => {
			return v
		})
}

function nav(srcPath: string = SRC_PATH): NavItem[] {
	const srcDir = getDirTree(srcPath)
	const orderedDir = dirAndFileOrder(srcDir.children)
	writeFileSync('orderedDir.json', JSON.stringify(orderedDir, null, 2) + '\n')
	const navbar = getNavbar(orderedDir)
	navbar.shift()
	console.log('Generated navbar finished :) ')
	return navbar
}

export default nav
