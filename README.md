# metalsmith-remove-indexes

A Metalsmith plugin to convert all all {path}/index.html files to {path}.html.

## Installation

```
$ npm install metalsmith-remove-indexes
```

## Usage

```
const metalsmith = require('metalsmith')
const removeIndexes = require('metalsmith-remove-indexes')

metalsmith(__dirname)
	.use(removeIndexes())
```

You can configure the plugin by passing an object containing options:

```
metalsmith(__dirname)
	.use(removeIndexes({
		redirect: true,
		trimHtmlPath: true,
		ignore: [
			'index.html',
			'ignore/directory/**/*'
		]
	}))
```

## Options

- `redirect` **Boolean** Creates redirect links from old index files to new paths. *(Default: false)*
- `trimHtmlPath` **Boolean** Removes file extensions from the `path` gray matter variable. *(Default: false)*
- `ignore` **Array/String** Uses [minimatch](https://github.com/isaacs/minimatch) to find index files to ignore. *(Default: index.html)*