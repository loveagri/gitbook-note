import {existsSync, writeFileSync} from 'node:fs'
import {dirname, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'
import {NavItem} from "vitepress/types/default-theme";
import {dirAndFileOrder, getDirTree, getTitle, getTitleName} from './Generate'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SRC_PATH = resolve(__dirname, '../../').replace(/\\/g, '/')


function Navbar(srcPath: string = SRC_PATH): NavItem {
	const srcDir = getDirTree(srcPath)
	writeFileSync('tree1.json', JSON.stringify(srcDir, null, 2) + '\n')
	// const orderedDir = dirAndFileOrder(srcDir.children)
	// const navbar = getNavbar(orderedDir)
	// console.log('Generated navbar finished :) ')
	// navbar.shift()
	// return navbar
}

export default Navbar
