---
# Documentation: https://wowchemy.com/docs/managing-content/

title: Who added that permission to my app? an analysis of developer permission changes
  in open source android apps
subtitle: ''
summary: ''
authors:
- Daniel E Krutz
- Nuthan Munaiah
- Anthony Peruma
- Mohamed Wiem Mkaouer
tags: []
categories: []
date: '2017-01-01'
lastmod: 2022-01-26T01:33:33-05:00
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
publishDate: '2022-01-26T06:33:31.306068Z'
publication_types:
- '1'
abstract: 'Android applications rely on a permission-based model to carry out core functionality. Appropriate permission
usage is imperative for ensuring device security and protecting the user’s desired privacy levels. But who is making the important
decisions of which permissions the app should request? Are they experienced developers with the appropriate project knowledge to make such important decisions, or are these crucial choices being
made by those with relatively minor amounts of contributions to the project? When are these permission-related decisions being
made in the app’s development life cycle? We examined 1,402 Android version control repositories containing over 331,318
commits including 18,751 AndroidManifest.xml versions to better understand when, why, and who is adding permissions to apps.
We found that (I) developers with more experience are more likely to make permission-based changes (II) permissions are
typically added earlier in apps’ commit lifetime, but their removal is more sustained throughout the commit lifetime (III)
developers reverting permission-based changes are typically more experienced than developers who initially made the change being reverted'
publication: '*2017 IEEE/ACM 4th International Conference on Mobile Software Engineering
  and Systems (MOBILESoft)*'
---
