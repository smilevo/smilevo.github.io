---
# Documentation: https://wowchemy.com/docs/managing-content/

title: SATDBailiff-mining and tracking self-admitted technical debt
subtitle: ''
summary: ''
authors:
- Eman Abdullah AlOmar
- Ben Christians
- Mihal Busho
- Ahmed Hamad AlKhalid
- Ali Ouni
- Christian Newman
- Mohamed Wiem Mkaouer
tags: []
categories: []
date: '2022-01-01'
lastmod: 2022-01-26T01:31:46-05:00
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
publishDate: '2022-01-26T06:31:43.955730Z'
publication_types:
- '2'
abstract: 'Self-Admitted Technical Debt (SATD) is a metaphorical concept to describe the self-documented addition of technical debt to a software project in the form of source code comments. SATD can linger in projects and
degrade source-code quality, but it can also be more visible than unintentionally added or undocumented technical debt. Understanding the implications of adding SATD to a software project is important because
developers can benefit from a better understanding of the quality trade-offs they are making. However, empirical studies, analyzing the survivability and removal of SATD comments, are challenged by potential code changes or SATD comment updates that may interfere with properly tracking their appearance, existence,
and removal. In this paper, we propose SATDBailiff, a tool that uses an existing state-of-the-art SATD detection tool, to identify SATD in method comments, then properly track their lifespan. SATDBailiff is given as input links to open source projects, and its output is a list of all identified SATDs, and for each
detected SATD, SATDBailiff reports all its associated changes, including any updates to its text, all the way to reporting its removal. The goal of SATDBailiff is to aid researchers and practitioners in better tracking
SATDs instances, and providing them with a reliable tool that can be easily extended. SATDBailiff was validated using a dataset of previously detected and manually validated SATD instances. SATDBailiff is
publicly available as an open source, along with the manual analysis of SATD instances associated with its validation, on the project website1.'
publication: '*Science of Computer Programming*'
---
