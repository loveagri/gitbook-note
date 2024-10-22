import {existsSync, writeFileSync} from 'node:fs'
import {resolve} from 'node:path'
import {DefaultTheme} from "vitepress";
import {
	getDirTree, dirAndFileOrder, getTitleName, getDirPathFromSrc, FileItem,
	SRC_PATH
} from './tools'

function getNavbar(tree: FileItem[] = []): DefaultTheme.NavItem[] {
	return tree
		.map((v: FileItem) => {
			if (v.type === 'directory') {
				const indexPath = resolve(v.path, 'index.md')
				if (!existsSync(indexPath)) {
					writeFileSync(indexPath, `---\nbarName: ${v.name}\n---\n\n# ${v.name}`,)
				}
				return {text: getTitleName(indexPath, v.name), link: getDirPathFromSrc(v.path)}
			} else {
				if (v.name.toLowerCase() === 'index.md') {
					return {
						text: getTitleName(v.path, v.name),
						link: getDirPathFromSrc(v.path, '').replace('index.md', '')
					}
				}
			}
		})
		.filter((v) => {
			return v
		})
}

function nav(srcPath: string = SRC_PATH): DefaultTheme.NavItem[] {
	const srcDir = getDirTree(srcPath)
	const orderedDir = dirAndFileOrder(srcDir.children)
	writeFileSync('orderedDir.json', JSON.stringify(orderedDir, null, 2) + '\n')
	const navbar = getNavbar(orderedDir)
	writeFileSync('navbar.json', JSON.stringify(navbar, null, 2) + '\n')
	console.log('Generated navbar finished :) ')
	return navbar
}

export default nav
