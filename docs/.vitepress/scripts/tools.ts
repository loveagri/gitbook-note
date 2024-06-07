import {existsSync} from 'node:fs'
import {dirname, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'
import matter from 'gray-matter'
import type {DirectoryTreeOptions} from 'directory-tree'
import dirTree from 'directory-tree'
import type {GrayMatterFile} from 'gray-matter'
import markdown from 'markdown-it'

export const __dirname = dirname(fileURLToPath(import.meta.url))
export const SRC_PATH = resolve(__dirname, '../../').replace(/\\/g, '/')

export interface ItemInfo {
	path: string
	name: string
	extension?: string
	size?: number
	type: string
}

export interface FileItem {
	path: string
	name: string
	children?: ItemInfo[]
	text?: string
	size?: number
	collapsible?: boolean
	type: string
}

export function getDirTree(
	srcPath: string = SRC_PATH,
	config: DirectoryTreeOptions = {},
): dirTree.DirectoryTree {
	return dirTree(srcPath, {
		...{
			extensions: /\.md$/,
			normalizePath: true,
			attributes: ['type'],
			exclude: /.vitepress|public|single|model/,
		},
		...config,
	})
}

export function getMatter(path: string): GrayMatterFile<string> {
	if (!existsSync(path)) {
		return {
			data: {barName: '', title: '', order: 0},
			content: '',
			orig: '',
			language: '',
			matter: '',
			stringify: (lang: string) => lang,
		}
	}
	return matter.read(path)
}

function getOrder(path: string, defaultValue = 0): number {
	if (defaultValue) {
		return defaultValue
	}
	return getMatter(path).data?.order ?? 0
}

export function getReadmeMatter(path: string): GrayMatterFile<string> {
	if (!existsSync(path)) {
		return {
			data: {barName: '', title: ''},
			content: '',
			orig: '',
			language: '',
			matter: '',
			stringify: (lang: string) => lang,
		}
	}
	return matter.read(path)
}

export function getReadme(path: string): {
	barName: string
	h1: string
	collapsible: boolean
} {
	const readme = getReadmeMatter(path)
	const content = markdown().render(readme.content)
	const match = content.match(/<h1>(.*?)<\/h1>/)
	const h1 = match ? match[1] : ''
	return {
		barName: readme.data.barName,
		h1,
		collapsible: readme.data?.collapsible ?? true,
	}
}

export function getTitleName(path: string, name: string = ''): string {
	const {barName, h1} = getReadme(path)
	return barName ?? h1 ?? name
}

export function isCollapsible(path: string): boolean {
	return getReadme(path).collapsible
}

export function getFileDirPathFromSrc(way: string): string {
	return way.replace(SRC_PATH, '').replace(/(index)?\.md$/, "")
}

export function getDirPathFromSrc(way: string, end = '/'): string {
	return way.replace(SRC_PATH, '') + end
}

//文件夹和文件分类排序
export function dirAndFileOrder(
	tree: FileItem[] = [],
	reverse = true,
): FileItem[] {
	tree = tree
		.map((v: FileItem) => { //区分文件和文件夹
			if (v.type === 'directory') {
				v.children = dirAndFileOrder(v.children)
				return v
			} else {
				return v
			}
		})
		.sort((a: FileItem, b: FileItem) => {//文件夹和文件分类排序
			// return reverse
			// 	? a.type.length - b.type.length
			// 	: b.type.length - a.type.length

			return reverse
				? b.type.length - a.type.length
				: a.type.length - b.type.length
		})
		.sort((a: FileItem, b: FileItem) => {
			let an: number
			let bn: number
			if (a.type === 'directory') {//如果是文件夹则取index.md的order值
				an = getOrder(resolve(a.path, 'index.md'))
			} else {//index.md排在第一位
				an = getOrder(a.path, a.path.endsWith('index.md') ? 9999999999 : 0)
			}
			if (b.type === 'directory') {
				bn = getOrder(resolve(b.path, 'index.md'))
			} else {
				bn = getOrder(b.path, b.path.endsWith('index.md') ? 9999999999 : 0)
			}
			return reverse ? bn - an : an - bn
		})

	return tree
}
