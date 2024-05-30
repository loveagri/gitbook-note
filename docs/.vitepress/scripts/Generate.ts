import { existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import type { DirectoryTreeOptions } from 'directory-tree'
import dirTree from 'directory-tree'

const __dirname = dirname(fileURLToPath(import.meta.url))

const SRC_PATH = resolve(__dirname, '../../').replace(/\\/g, '/')


export function getDirTree(
  srcPath: string,
  config: DirectoryTreeOptions = {},
): dirTree.DirectoryTree {
  return dirTree(srcPath, {
    ...{
      extensions: /\.md$/,
      normalizePath: true,
      attributes: ['type'],
      exclude: /.vitepress|public/,
    },
    ...config,
  })
}

