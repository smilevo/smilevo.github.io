---
# Documentation: https://wowchemy.com/docs/managing-content/

title: A robust multi-objective approach to balance severity and importance of refactoring
  opportunities
subtitle: ''
summary: ''
authors:
- Mohamed Wiem Mkaouer
- Marouane Kessentini
- Mel Ó Cinnéide
- Shinpei Hayashi
- Kalyanmoy Deb
tags: []
categories: []
date: '2017-01-01'
lastmod: 2022-01-26T01:30:52-05:00
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
publishDate: '2022-01-26T06:30:49.835379Z'
publication_types:
- '2'
abstract: 'Refactoring large systems involves several sources of uncertainty related to the severity levels of code smells to be corrected and the importance of the classes in which the
  smells are located. Both severity and importance of identified refactoring opportunities (e.g. code smells) are difficult to estimate. In fact, due to the dynamic nature of software development,
  these values cannot be accurately determined in practice, leading to refactoring sequences that lack robustness. In addition, some code fragments can contain severe quality
  issues but they are not playing an important role in the system. To address this problem, we introduced a multi-objective robust model, based on NSGA-II, for the software refactoring
  problem that tries to find the best trade-off between three objectives to maximize: 
  quality improvements, severity and importance of refactoring opportunities to be fixed. We evaluated our approach using 8 open source systems and one industrial project, and demonstrated that it
  is significantly better than state-of-the-art refactoring approaches in terms of robustness in all the experiments based on a variety of real-world scenarios. Our suggested refactoring solutions
  were found to be comparable in terms of quality to those suggested by existing approaches, better prioritization of refactoring opportunities and to carry an acceptable robustness price.'
publication: '*Empirical Software Engineering*'
---
