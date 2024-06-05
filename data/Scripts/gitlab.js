import {promises} from 'node:fs'
import {basename} from 'node:path'
import axios from 'axios'

const accessTokenGitlab = 'glpat-x8kVLasNzGk2wVU3iath'
const id = '42381804'
const branch = 'main'
const gitlabRaw = 'https://gitlab.com/loveagri/pic/-/raw/'
const baseUrl = 'https://gitlab.com/api/v4/'

function formUrl(arr, delimiter = '/') {
	return arr.map((item) => item.replaceAll(/^\/|\/$/g, '')).join(delimiter)
}

function generateUrl(filename) {
	filename = basename(filename)
	const currentDate = new Date()
	const currentYear = String(currentDate.getFullYear()).padStart(4, '0')
	const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0')
	const currentDay = String(currentDate.getDate()).padStart(2, '0')
	const hours = String(currentDate.getHours()).padStart(2, '0')

	const url = formUrl([`${currentYear}-${currentMonth}-${currentDay}`, hours, parseInt((Math.random() * 100000).toString()) + '_' + filename,], '%2f')
	return formUrl([baseUrl, 'projects', id, 'repository/files', url])
}

async function uploadImageToGitLab(filePath) {
	try {
		// 读取文件内容
		const fileContent = await promises.readFile(filePath)
		// 构建 FormData 对象并添加文件字段
		const formData = new FormData()
		formData.set('branch', 'main')
		formData.set('commit_message', 'image')
		formData.set('encoding', 'base64')
		formData.set('content', fileContent.toString('base64'))

		const response = await axios({
			method: 'post',
			url: generateUrl(filePath),
			headers: {Authorization: `Bearer ${accessTokenGitlab}`},
			data: formData,
			timeout: 20000,
		})
		return response.data
	} catch (error) {
		console.error('上传图片失败: ', error)
	}
}

const args = process.argv
const userArgs = args.slice(2)

const picArr = []
for (const picPath of userArgs) {
	const res = await uploadImageToGitLab(picPath)
	picArr.push(formUrl([gitlabRaw, branch, res.file_path]))
}

console.log('Upload Success:')
for (const url of picArr) {
	console.log(url)
}
