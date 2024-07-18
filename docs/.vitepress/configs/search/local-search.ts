import type {DefaultTheme} from 'vitepress';

export const localSearchOptions:DefaultTheme.LocalSearchOptions = {
	locales: {
		root: {
			translations: {
				button: {
					buttonText: '搜索文档',
					buttonAriaLabel: '搜索文档'
				},
				modal: {
					noResultsText: '无法找到相关结果',
					resetButtonTitle: '清除查询条件',
					footer: {
						selectText: '选择',
						navigateText: '切换',
						closeText: '关闭',
					}
				}
			}
		}
	}
};
