# Git Action

| 网站                                                         | 备注                                                        |
| ------------------------------------------------------------ | ----------------------------------------------------------- |
| [Docs](https://docs.github.com/en/actions)，[中文Docs](https://docs.github.com/zh/actions) | [quickstart](https://docs.github.com/en/actions/quickstart) |
| [workflow marketplace](https://github.com/marketplace)       |                                                             |

## Hello World Example

entrypoint.sh

```sh
#!/bin/sh -l

sh -c "echo hello world my name is $INPUT_MY_NAME"
```

Dockerfile

```dockerfile
FROM debian:9.5-slim

ADD entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

CMD ["echo", "Hello, GitHub Actions!"]
```

action.yml

```yaml
name: 'Hello Actions'
description: 'Greet someone'
author: 'octocat@github.com'

inputs:
    MY_NAME:
        description: 'Who to greet'
        required: true
        default: 'World'

runs:
    using: 'docker'
    image: 'Dockerfile'

branding:
    icon: 'mic'
    color: 'purple'
```

main.yml

```yaml
name: A workflow for my Hello World file
on: push

jobs:
    build:
        name: hello world anction
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v2
            - uses: ./action-a
              with:
                  MY_NAME: 'Mona'
```

示例结构

```sh
.
├── README.md
└── action-a
    ├── Dockerfile
    ├── action.yml
    └── entrypoint.sh
```





