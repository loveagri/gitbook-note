import {transformerTwoslash} from "@shikijs/vitepress-twoslash";
import type {MarkdownOptions} from 'vitepress';
import footnote from 'markdown-it-footnote'; // 脚注 https://blog.csdn.net/gitblog_00080/article/details/139368750

export const markdown: MarkdownOptions = {
	// Shiki主题, 所有主题参见: https://github.com/shikijs/shiki/blob/main/docs/themes.md
	// theme: {
	// 	light: 'one-dark-pro',
	// 	dark: 'github-dark-dimmed'
	// },
	theme: 'one-dark-pro',// ayu-dark one-dark-pro
	container: {
		tipLabel: '提示',
		warningLabel: '警告',
		dangerLabel: '危险',
		infoLabel: '信息',
		detailsLabel: '详细信息'
	},

	lineNumbers: true,
	math: true,
	image: {
		lazyLoading: true
	},
	codeTransformers: [transformerTwoslash()],

	config: (md) => {
		md.use(footnote);

		// 在所有文档的<h1>标签后添加<ArticleMetadata/>组件
		md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
			let htmlResult = slf.renderToken(tokens, idx, options);
			if (tokens[idx].tag === 'h1') htmlResult += `\n<ClientOnly><ArticleMetadata v-if="($frontmatter?.aside ?? true) && ($frontmatter?.showArticleMetadata ?? true)" :article="$frontmatter" /></ClientOnly>`;
			return htmlResult;
		}
	},
};
