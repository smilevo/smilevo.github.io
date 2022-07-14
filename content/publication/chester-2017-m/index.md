---
# Documentation: https://wowchemy.com/docs/managing-content/

title: 'M-perm: A lightweight detector for android permission gaps'
subtitle: ''
summary: ''
authors:
- Piper Chester
- Chris Jones
- Mohamed Wiem Mkaouer
- Daniel E Krutz
tags: []
categories: []
date: '2017-01-01'
lastmod: 2022-01-26T01:33:36-05:00
featured: false
draft: false

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder.
# Focal points: Smart, Center, TopLeft, Top, TopRight, Left, Right, BottomLeft, Bottom, BottomRight.
image:
  caption: ''
  focal_point: ''
  preview_only: false

# Projects (optional).
#   Associate this post with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `projects = ["internal-project"]` references `content/project/deep-learning/index.md`.
#   Otherwise, set `projects = []`.
projects: []
publishDate: '2022-01-26T06:33:33.670309Z'
publication_types:
- '1'
abstract: 'Android apps operate under a permissions-based system where access to specific APIs are restricted through the use of permissions. Unfortunately, there is no built-in verification system to ensure that apps do not request too many or too few
permissions, which could lead to serious quality and/or privacy concerns. Apps requesting too many permissions create unnecessary vulnerabilities, leaving the potential for abuse by SDKs within the app or other malicious apps installed on the device.
In order to assist with the discovery of misused permissions, we created a new detection tool, M-Perm, which combines static and dynamic analysis in a computationally efficient manner compared to existing tools. M-Perm also identifies permission
usage in apps including requested normal, dangerous, and 3rd party permissions. The tool, complete usage instructions, and screencast are available online: http://www.m-perm.com'
publication: '*2017 IEEE/ACM 4th International Conference on Mobile Software Engineering
  and Systems (MOBILESoft)*'
---
