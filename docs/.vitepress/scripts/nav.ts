import {existsSync, writeFileSync} from 'node:fs'
import {dirname, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'
import {NavItem} from "vitepress/types/default-theme";
import {getDirTree} from './Generate'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SRC_PATH = resolve(__dirname, '../../').replace(/\\/g, '/')


function nav(srcPath: string = SRC_PATH): NavItem[] {
	const srcDir = getDirTree(srcPath)
	console.log(435);
	writeFileSync('tree1.json', JSON.stringify(srcDir, null, 2) + '\n')
	// const orderedDir = dirAndFileOrder(srcDir.children)
	// const navbar = getNavbar(orderedDir)
	// console.log('Generated navbar finished :) ')
	// navbar.shift()
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
