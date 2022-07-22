---
# Documentation: https://wowchemy.com/docs/managing-content/

title: 'WhoReview: A multi-objective search-based approach for code reviewers recommendation
  in modern code review'
subtitle: ''
summary: ''
authors:
- Moataz Chouchen
- Ali Ouni
- Mohamed Wiem Mkaouer
- Raula Gaikovina Kula
- Katsuro Inoue
tags: []
categories: []
date: '2021-01-01'
lastmod: 2022-01-26T01:31:29-05:00
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
publishDate: '2022-01-26T06:31:27.585956Z'
publication_types:
- '2'
abstract: 'Contemporary software development is distributed and characterized by high dynamics with continuous and frequent changes to fix defects, add new user requirements or adapt to other environmental
  changes. To manage such changes and ensure software quality, modern code review is broadly adopted as a common and effective practice. Yet several open-source as well as commercial software projects
  have adopted peer code review as a crucial practice to ensure the quality of their software products using modern tool-based code review. Nevertheless, the selection of peer reviewers is still merely a
  manual and hard task especially with the growing size of distributed development teams. Indeed, it has been proven that inappropriate peer reviewers selection can consume more time and effort from
  both developers and reviewers and increase the development costs and time to market. To address this problem, we introduce a multi-objective search-based approach, named WhoReview, to find the
  optimal set of peer reviewers for code changes. We use the Indicator-Based Evolutionary Algorithm(IBEA) to find the best set of code reviewers that are (1) most experienced with the code change to be
  reviewed, while (2) considering their current workload, i.e., the number of open code reviews they are working on. We conduct an empirical study on 4 long-lived open source software projects to evaluate
  our approach. The obtained results show that WhoReview outperforms state-of-the-art approach by an average precision of 68% and recall of 77%. Moreover, we deployed our approach in an industrial
  context and evaluated it qualitatively from developers perspective. Results show the effectiveness of our approach with a high acceptance ratio in identifying relevant reviewers.'
publication: '*Applied Soft Computing*'
---
