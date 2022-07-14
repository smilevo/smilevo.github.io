---
# Documentation: https://wowchemy.com/docs/managing-content/

title: Model transformation using multiobjective optimization
subtitle: ''
summary: ''
authors:
- Mohamed Wiem Mkaouer
- Marouane Kessentini
tags: []
categories: []
date: '2014-01-01'
lastmod: 2022-01-26T01:39:24-05:00
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
publishDate: '2022-01-26T06:39:22.359371Z'
publication_types:
- '5'
abstract: 'The evolution of languages and software architectures provides a strong motivation to migrate/transform existing software systems.
  Thus, more attention is paid to the transformation aspects in model-driven engineering (MDE) along with the growing importance of modeling in software development.
  However, a major concern in MDE is how to ensure the quality of the model transformation mechanisms. Most of existing work in model transformation has relied on defining languages to express transformation rules.
  The main goal of existing transformation approaches is to provide rules generating target models, from source models, without errors. However, other important objective
  is how to minimize the complexity of transformation rules (e.g., the number of rules and number of matching in the same rule) while maximizing the quality of target models. In
  fact, reducing rule complexity and improving target model quality are important to (1)make rules and target models easy to understand and evolve, (2) find transformation
  errors easily, and (3) generate optimal target models. In this chapter, we consider the transformation mechanism as a multiobjective problem where the goal is to find the
  best rules maximizing target model quality and minimizing rule complexity. Our approach starts by randomly generating a set of rules, executing them to generate
  some target models. Of course, only solutions ensuring full correctness are considered during the optimization process. Then, the quality of the proposed solution (rules) is
  evaluated by (1) calculating the number of rules and matching metamodels in each rule and (2) assessing the quality of generated target models using a set of quality metrics. To
  this end, we use the nondominated sorting genetic algorithm (NSGA-II) to automatically generate the best transformation rules satisfying the two conflicting criteria. We report
  the results of our validation using three different transformation mechanisms. The best solutions provided well-designed target models with a minimal set of rules'
publication: '*Advances in Computers*'
---
