---
# Documentation: https://wowchemy.com/docs/managing-content/

title: 'Interactive code smells detection: An initial investigation'
subtitle: ''
summary: ''
authors:
- Mohamed Wiem Mkaouer
tags: []
categories: []
date: '2016-01-01'
lastmod: 2022-01-26T01:33:26-05:00
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
publishDate: '2022-01-26T06:33:24.188427Z'
publication_types:
- '1'
abstract: 'In this paper, we introduced a novel technique to generate more user-oriented detection rules by taking into account their feedback. Our techniques initially generate a set of detection rules that will be used to detect
  candidate code smells, these reported code smells will be exposed in an interactive fashion to the developer who will give his/her feedback by either
  approving or rejecting the identified code smell in the code fragment. This feedback will be fed to the GP as constraints and additional examples in order to
  converge towards more user-preferred detection rules. We initially investigated the detection of three types of code smells in four open source systems and
  reported that the interactive code smell detection achieves a precision of 89 % and recall on average when detecting infected classes. Results show that our
  approach can best imitate the user’s decision while omitting the complexity of manual tuning the detection rules.'
publication: '*International Symposium on Search Based Software Engineering*'
---
