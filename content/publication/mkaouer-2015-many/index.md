---
# Documentation: https://wowchemy.com/docs/managing-content/

title: Many-objective software remodularization using NSGA-III
subtitle: ''
summary: ''
authors:
- Wiem Mkaouer
- Marouane Kessentini
- Adnan Shaout
- Patrice Koligheu
- Slim Bechikh
- Kalyanmoy Deb
- Ali Ouni
tags: []
categories: []
date: '2015-01-01'
lastmod: 2022-01-26T01:30:59-05:00
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
publishDate: '2022-01-26T06:30:56.912272Z'
publication_types:
- '2'
abstract: 'Software systems nowadays are complex and difficult to maintain due to continuous changes and bad design choices. To handle the
  complexity of systems, software products are, in general, decomposed in terms of packages/modules containing classes that are dependent. However,
  it is challenging to automatically remodularize systems to improve their maintainability. The majority of existing remodularization work mainly
  satisfy one objective which is improving the structure of packages by optimizing coupling and cohesion. In addition, most of existing studies are
  limited to only few operation types such as move class and split packages. Many other objectives, such as the design semantics, reducing the number
  of changes and maximizing the consistency with development change history, are important to improve the quality of the software by
  remodularizing it. In this paper, we propose a novel many-objective search-based approach using NSGA-III. The process aims at finding the optimal
  remodularization solutions that improve the structure of packages, minimize the number of changes, preserve semantics coherence, and re-use the
  history of changes. We evaluate the efficiency of our approach using four different open-source systems and one automotive industry project,
  provided by our industrial partner, through a quantitative and qualitative study conducted with software engineers.'
publication: '*ACM Transactions on Software Engineering and Methodology (TOSEM)*'
---
