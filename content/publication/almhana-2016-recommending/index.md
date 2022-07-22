---
# Documentation: https://wowchemy.com/docs/managing-content/

title: Recommending relevant classes for bug reports using multi-objective search
subtitle: ''
summary: ''
authors:
- Rafi Almhana
- Wiem Mkaouer
- Marouane Kessentini
- Ali Ouni
tags: []
categories: []
date: '2016-01-01'
lastmod: 2022-01-26T01:33:43-05:00
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
publishDate: '2022-01-26T06:33:40.753781Z'
publication_types:
- '1'
abstract: 'Developers may follow a tedious process to find the cause of a bug based on code reviews and reproducing the abnormal
  behavior. In this paper, we propose an automated approach to finding and ranking potential classes with the respect to the
  probability of containing a bug based on a bug report description.
  Our approach finds a good balance between minimizing the number of recommended classes and maximizing the relevance
  of the proposed solution using a multi-objective optimization algorithm. The relevance of the recommended classes (solution)
  is estimated based on the use of the history of changes and bugfixing, and the lexical similarity between the bug report
  description and the API documentation. We evaluated our system on 6 open source Java projects, using the version of the project
  before fixing the bug of many bug reports. The experimental results show that the search-based approach significantly
  outperforms three state-of-the-art methods in recommending relevant files for bug reports. In particular, our multi-objective
  approach is able to successfully locate the true buggy methods within the top 10 recommendations for over 87% of the bug reports.'
publication: '*2016 31st IEEE/ACM International Conference on Automated Software Engineering
  (ASE)*'
---
