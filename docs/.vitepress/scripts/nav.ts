import {existsSync, writeFileSync} from 'node:fs'
import {dirname, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'
import fg from 'fast-glob'
import {NavItem} from "vitepress/types/default-theme";
import {getDirTree, dirAndFileOrder, getTitleName, getDirPathFromSrc, FileItem} from './tools'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SRC_PATH = resolve(__dirname, '../../').replace(/\\/g, '/')


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
		.sort((a, b) => {
			if (typeof a === 'string') {
				return -1
			} else if (Object.prototype.hasOwnProperty.call(a, 'children') && Object.prototype.hasOwnProperty.call(b, 'link')) {
				return 1
			} else if (Object.prototype.hasOwnProperty.call(a, 'link') && Object.prototype.hasOwnProperty.call(b, 'children')) {
				return -1
			} else {
				return 0
			}
		})
}

function nav(srcPath: string = SRC_PATH): NavItem[] {
	const srcDir = getDirTree(srcPath)
	const orderedDir = dirAndFileOrder(srcDir.children)
	writeFileSync('orderedDir.json', JSON.stringify(orderedDir, null, 2) + '\n')
	const navbar = getNavbar(orderedDir)
	console.log('Generated navbar finished :) ')
	navbar.shift()
	writeFileSync('navbar.json', JSON.stringify(navbar, null, 2) + '\n')
	return navbar
	return [
		{text: 'Guide', link: '/guide'},
		{
			text: 'Dropdown Menu',
			items: [
				{text: 'Item A', link: '/item-1'},
				{text: 'Item B', link: '/item-2'},
				{text: 'Item C', link: '/item-3'}
			]
		}
	]
}

export default nav
