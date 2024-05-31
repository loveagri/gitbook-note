// function getNavbar(tree: FileItem[] = []): NavItem[] {
// 	return tree
// 		.map((v: FileItem) => {
// 			if (v.type === 'directory') {
// 				const indexPath = resolve(v.path, 'index.md')
// 				if (!existsSync(indexPath)) {
// 					writeFileSync(indexPath, `---\nbarName: ${v.name}\n---\n\n# ${v.name}`,)
// 				}
// 				const item = {text: getTitleName(indexPath, v.name)}
// 				return {...item, link: getDirPathFromSrc(v.path)}
// 			} else {
// 				if (v.name.toLowerCase() === 'index.md') {
// 					return {
// 						text: getTitleName(v.path, v.name),
// 						link: getDirPathFromSrc(v.path, '').replace('index.md', '')
// 					}
// 				}
// 				return ''
// 			}
// 		})
// 		.filter((v) => {
// 			return v
// 		})
// }
//
