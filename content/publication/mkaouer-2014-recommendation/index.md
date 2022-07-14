---
# Documentation: https://wowchemy.com/docs/managing-content/

title: Recommendation system for software refactoring using innovization and interactive
  dynamic optimization
subtitle: ''
summary: ''
authors:
- Mohamed Wiem Mkaouer
- Marouane Kessentini
- Slim Bechikh
- Kalyanmoy Deb
- Mel Ó Cinnéide
tags: []
categories: []
date: '2014-01-01'
lastmod: 2022-01-26T01:33:17-05:00
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
publishDate: '2022-01-26T06:33:14.797506Z'
publication_types:
- '1'
abstract: 'We propose a novel recommendation tool for software refactoring that dynamically adapts and suggests refactorings to developers
  interactively based on their feedback and introduced code changes. Our approach starts by finding upfront a set of nondominated refactoring solutions using NSGA-II to improve
  software quality, reduce the number of refactorings and increase semantic coherence. The generated non-dominated refactoring
  solutions are analyzed using our innovization component to extract some interesting common features between them. Based
  on this analysis, the suggested refactorings are ranked and suggested to the developer one by one. The developer can
  approve, modify or reject each suggested refactoring, and this feedback is used to update the ranking of the suggested
  refactorings. After a number of introduced code changes, a local search is performed to update and adapt the set of refactoring
  solutions suggested by NSGA-II. We evaluated this tool on four large open source systems and one industrial project provided by
  our partner. Statistical analysis of our experiments over 31 runs shows that the dynamic refactoring approach performed
  significantly better than three other search-based refactoring techniques, manual refactorings, and one refactoring tool not
  based on heuristic search. '
publication: '*Proceedings of the 29th ACM/IEEE international conference on Automated
  software engineering*'
---
